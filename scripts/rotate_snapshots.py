#!/usr/bin/env python3
# Copyright (c) Mysten Labs, Inc.
# SPDX-License-Identifier: Apache-2.0

"""
Script to be used for deleteing old snapshots on a host. Given a root dir,
for example, /opt/sui, it assumes snapshots are staged in /opt/sui/snapshots,
and all symlinks to said snapshots are contained under /opt/sui/instances. It will delete all snapshots that are not
referenced, except for the newest. If there is only onle snaopshot on the host,
it does nothing.
"""

import json
import os
import sys
import subprocess
import getopt
from enum import Enum
import time
from datetime import datetime


def usage():
    print(
        'Usage: rotate_snapshots.py --dir=<snapshots-dir>')
    print(
        f'   --dir=<sui-base-dir>   Base directory for sui. Must contain /snapshots and /instances dirs')
    print('  --help                 Print this help message')
    

def is_referenced(root_dir, filepath):
    instances_dir = os.path.join(root_dir, 'instances')
    try:
        result = subprocess.check_output(
            ['find', '-L', instances_dir, '-samefile', filepath], stdout=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        print(f'find command failed with error {e.returncode}: {e.output}')
        exit(1)
    references = result.decode(sys.stdout.encoding).split('\n')
    # The first reference is the original path, any other are symlinks
    return references > 1


def main(argv):
    if len(argv) != 1:
        usage()
        exit(1)

    try:
        opts, args = getopt.getopt(argv, '', ["dir="])
    except getopt.GetoptError as err:
        print(err)
        usage()

    root_dir = None
    for opt, arg in opts:
        if opt == '--help':
            usage()
            exit(0)
        elif opt == '--dir':
            root_dir = arg
            env = arg
    
    os.chdir(root_dir)
    snapshots_dir = os.path.join(root_dir, 'snapshots')
    contents = os.listdir(snapshots_dir)
    epoch_dirs = [path for path in contents if contents.contains('epoch_')]
    epochs = [int(epoch_dir.split('epoch_')[1]) for epoch_dir in epoch_dirs]
    latest_epoch = None
    with open(os.path.join(snapshots_dir, 'latest'), 'r') as f:
        latest_epoch = str(f.read())
    paths_to_rotate = [epoch_dir for epoch_dir in epoch_dirs if not epoch_dir.contains(latest_epoch)]
    for path in paths_to_rotate:
        if not is_referenced(root_dir):
            print(f'Old snapshot at {path} is not referenced by any running processes. Deleting...')
            os.delete(path)
    print('Finished rotating snapshots on host')
    exit(0)

if __name__ == "__main__":
    main(sys.argv[1:])
