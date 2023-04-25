window.BENCHMARK_DATA = {
  "lastUpdate": 1682386672579,
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
      },
      {
        "commit": {
          "author": {
            "email": "tmn@mystenlabs.com",
            "name": "Todd Nowacki",
            "username": "tnowacki"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5ae26986425e1a55fa116fcee066285deb766137",
          "message": "[sui verifier] Ban entry on init (#11287)\n\n## Description \r\n\r\n- No longer allow entry modifier on init\r\n- `entry` on `init` while not harmful, is a bit confusing as `init`\r\nfunctions are otherwise not callable. For cleanliness, we think it is\r\nimportant to keep it separated as one might expect `init` is only called\r\nonce\r\n- Thanks @otter-sec (https://osec.io/) for the report! \r\n\r\n## Test Plan \r\n\r\n- New tests\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-04-25T01:27:50Z",
          "tree_id": "e0d74132bea954f8f2e5d4fcea3d4daa61e9d7ce",
          "url": "https://github.com/MystenLabs/sui/commit/5ae26986425e1a55fa116fcee066285deb766137"
        },
        "date": 1682386668984,
        "tool": "cargo",
        "benches": [
          {
            "name": "persist_checkpoint",
            "value": 153416867,
            "range": "± 4964212",
            "unit": "ns/iter"
          },
          {
            "name": "get_checkpoint",
            "value": 311504,
            "range": "± 7640",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}