#!/usr/bin/env bash
# Todo: Extract to a script.'


ENDPOINT=ws://127.0.0.1:8844

function generate:defs(){
  esno --tsconfig ./tsconfig.lib.json ../../node_modules/.bin/polkadot-types-from-defs --package @choc-js/types --input ./src/interfaces --endpoint $ENDPOINT,
  cd .././../
  nx format:write --projects types --verbose
}

function generate:meta(){
  esno --tsconfig ./tsconfig.lib.json ../../node_modules/.bin/polkadot-types-from-chain --package @choc-js/types --endpoint $ENDPOINT --output ./src/interfaces
  cd .././../
  nx format:write --projects types --verbose
}
  
"$@"