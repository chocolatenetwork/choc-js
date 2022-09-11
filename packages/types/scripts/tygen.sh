#!/usr/bin/env bash
# Todo: Extract to a script.'


ENDPOINT=wss://8844-chocolatene-chocolatepa-gjbddvcpgea.ws-eu63.gitpod.io/

function generate:defs(){
  esno --tsconfig ./tsconfig.lib.json ../../node_modules/.bin/polkadot-types-from-defs --package @choc-js/interfaces --input ./src/interfaces --endpoint $ENDPOINT,
}

function generate:meta(){
  esno --tsconfig ./tsconfig.lib.json ../../node_modules/.bin/polkadot-types-from-chain --package @choc-js/interfaces --endpoint $ENDPOINT --output ./src/interfaces
}
  
"$@"