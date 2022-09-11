#!/bin/bash

COLLATOR_BIN=./tmp/substrate/bins/parachain-collator
ROCOCO_LOCAL_RAW=./tmp/substrate/ch_spec/rococo-local-raw.json
ROCOCO_LOCAL_PARACHAIN_RAW=./tmp/substrate/ch_spec/rococo-local-parachain-2000-raw.json
DB_PATH=./tmp/substrate/parachain/alice
# Run node1
$COLLATOR_BIN \
--alice \
--collator \
--force-authoring \
--chain $ROCOCO_LOCAL_PARACHAIN_RAW \
--base-path $DB_PATH \
--port 40333 \
--rpc-cors all \
--ws-port 8844 \
-- \
--execution wasm \
--chain $ROCOCO_LOCAL_RAW \
--port 30343 \
--ws-port 9977
