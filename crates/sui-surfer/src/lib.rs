// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use futures::future::join_all;
use rand::rngs::StdRng;
use rand::seq::SliceRandom;
use rand::{Rng, SeedableRng};
use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use sui_config::genesis_config::{AccountConfig, DEFAULT_GAS_AMOUNT};
use surf_strategy::SurfStrategy;
use test_utils::network::TestClusterBuilder;
use tokio::sync::{watch, RwLock};
use tracing::info;

use crate::surfer_state::SurfStatistics;
use crate::surfer_task::SurferTask;

pub mod default_surf_strategy;
mod surf_strategy;
mod surfer_state;
mod surfer_task;

const VALIDATOR_COUNT: usize = 4;
const EPOCH_DURATION_MS: u64 = 120000;

const ACCOUNT_NUM: usize = 20;
const GAS_OBJECT_COUNT: usize = 3;

pub async fn run<S: SurfStrategy + Default>(run_duration: Duration, package_paths: Vec<PathBuf>) {
    let cluster = Arc::new(
        TestClusterBuilder::new()
            .with_num_validators(VALIDATOR_COUNT)
            .with_epoch_duration_ms(EPOCH_DURATION_MS)
            .with_accounts(vec![
                AccountConfig {
                    address: None,
                    gas_amounts: vec![DEFAULT_GAS_AMOUNT; GAS_OBJECT_COUNT],
                };
                ACCOUNT_NUM
            ])
            .build()
            .await
            .unwrap(),
    );
    info!(
        "Started cluster with {} validators and epoch duration of {:?}ms",
        VALIDATOR_COUNT, EPOCH_DURATION_MS
    );

    let mut rng = rand::thread_rng();
    let seed = rng.gen::<u64>();
    info!("Initial Seed: {:?}", seed);
    let mut rng = StdRng::seed_from_u64(seed);
    let (exit_sender, exit_rcv) = watch::channel(());

    let immutable_objects = Arc::new(RwLock::new(HashMap::new()));
    let shared_objects = Arc::new(RwLock::new(HashMap::new()));

    let mut tasks = SurferTask::create_surfer_tasks::<S>(
        cluster.clone(),
        &mut rng,
        exit_rcv,
        immutable_objects,
        shared_objects,
    )
    .await;
    info!("Created {} surfer tasks", tasks.len());

    for path in package_paths {
        tasks
            .choose_mut(&mut rng)
            .unwrap()
            .state
            .publish_package(path)
            .await;
    }

    let mut handles = vec![];
    for task in tasks {
        handles.push(tokio::task::spawn(task.surf()));
    }
    tokio::time::sleep(run_duration).await;
    exit_sender.send(()).unwrap();
    let all_stats: Result<Vec<_>, _> = join_all(handles).await.into_iter().collect();
    let final_stats = SurfStatistics::aggregate(all_stats.unwrap());
    final_stats.print_stats();
    info!("Finished surfing");
    // TODO: Right now it will panic here complaining about dropping a tokio runtime
    // inside of another tokio runtime. Reason unclear.
}
