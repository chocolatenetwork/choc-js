#!/bin/bash

# echo start alice command, 
echo "Start Alice command"
echo "bash ./scripts/start-relay.sh alice"
echo ""

RELAY_BIN=./tmp/substrate/bins/parachain-collator
ROCOCO_LOCAL=./tmp/substrate/ch_spec/rococo-local.json
ROCOCO_LOCAL_RAW=./tmp/substrate/ch_spec/rococo-local-raw.json
DB_ALICE=./tmp/relay/alice
DB_BOB=./tmp/relay/bob

function alice {
    $RELAY_BIN --alice --validator --base-path $DB_ALICE --chain $ROCOCO_LOCAL_RAW --port 30333 --ws-port 9944
}
echo "Start Bob command"
echo "bash ./scripts/start-relay.sh bob"
echo ""

function bob {

    $RELAY_BIN \
    --bob \
    --validator \
    --base-path $DB_BOB \
    --chain $ROCOCO_LOCAL_RAW \
    --port 30334 \
    --ws-port 9945 \
}

"$@"