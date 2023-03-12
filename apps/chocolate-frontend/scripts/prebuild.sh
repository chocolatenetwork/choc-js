#!/usr/bin/env bash

CONTRACT_PATH=apps/chocolate-frontend/src/assets/contract/chocolate.json

function fetch:contract(){
  echo "CREATING AN EMPTY JSON AS CI STUB"
  echo "{}" > $CONTRACT_PATH
}

"$@"