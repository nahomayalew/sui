window.BENCHMARK_DATA = {
  "lastUpdate": 1682385445658,
  "repoUrl": "https://github.com/MystenLabs/sui",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "zlnju@outlook.com",
            "name": "wiggins-dev",
            "username": "zhoulu-dev"
          },
          "committer": {
            "email": "sam@mystenlabs.com",
            "name": "Sam Blackshear",
            "username": "sblackshear"
          },
          "distinct": true,
          "id": "c99b446f311f48e5d0c957a6fa02273835196e3f",
          "message": "    [Deepbook] Minor fix and always use quote for commission (#11229)\n\n    ## Description\n\n    - emit_order_canceled when match_bid_with_quote_quantity\n    - add asserts to get_order_status to avoid crash\n    - remove duplicate withdraw function from custodian\n    - reject place market order with qty 0\n    - fix place limit order with qty 0 in N_RESTRICTIONS case\n    - add expire_timestamp in OrderPlaced event\n    - always use quote for commission\n    - avoid crash when batch cancel\n\n    ## Test Plan\n\n    - Improved typescript tests\n\n    cd to deepbook dir and run \"sui move test\"\n\n    ### Type of Change (Check all that apply)\n\n    - [ ] user-visible impact\n    - [ ] breaking change for a client SDKs\n    - [ ] breaking change for FNs (FN binary must upgrade)\n    - [ ] breaking change for validators or node operators (must upgrade\n    binaries)\n    - [ ] breaking change for on-chain data layout\n    - [ ] necessitate either a data wipe or data migration",
          "timestamp": "2023-04-24T18:04:29-07:00",
          "tree_id": "57688e8a5fb9ca37f09e6c3d84f6870a2613c52d",
          "url": "https://github.com/MystenLabs/sui/commit/c99b446f311f48e5d0c957a6fa02273835196e3f"
        },
        "date": 1682385442160,
        "tool": "cargo",
        "benches": [
          {
            "name": "persist_checkpoint",
            "value": 145804173,
            "range": "± 4576503",
            "unit": "ns/iter"
          },
          {
            "name": "get_checkpoint",
            "value": 438364,
            "range": "± 27933",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}