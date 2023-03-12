#!/usr/bin/env bash

ENDPOINT=ws://127.0.0.1:8844
OUT_DIR=./src/interfaces
TYPES_FROM_DEFS=../../node_modules/.bin/polkadot-types-from-defs
TYPES_FROM_CHAIN=../../node_modules/.bin/polkadot-types-from-chain
PACKAGE=@choc-js/types


function generate:defs(){
  if [[ -n "${GITHUB_ENV}" ]]; then
    echo 'EXITING GENERATE:DEFS IN CI BECAUSE WE DO NOT HAVE A CHAIN SETUP NOW'
    exit 0
  fi

  esno --tsconfig ./tsconfig.lib.json $TYPES_FROM_DEFS --package $PACKAGE --input $OUT_DIR --endpoint $ENDPOINT \
  && cd .././../  \
  && nx format:write --projects types --verbose
}

function generate:meta(){
  if [[ -n "${GITHUB_ENV}" ]]; then
    echo 'EXITING GENERATE:META IN CI BECAUSE WE DO NOT HAVE A CHAIN SETUP NOW'
    exit 0
  fi

  esno --tsconfig ./tsconfig.lib.json $TYPES_FROM_CHAIN --package $PACKAGE --endpoint $ENDPOINT --output $OUT_DIR \
  && cd .././../ \
  && nx format:write --projects types --verbose
}
  
"$@"