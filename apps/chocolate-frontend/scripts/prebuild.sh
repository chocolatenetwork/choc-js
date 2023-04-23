#!/usr/bin/env bash

CONTRACT_PATH=apps/chocolate-frontend/src/assets/contract/chocolate.json

function fetch:contract(){
  if [ -s $CONTRACT_PATH ]; then
    echo "File $CONTRACT_PATH is not empty"
  else
    echo "CREATING AN EMPTY JSON AS CI STUB"
    echo "{}" > $CONTRACT_PATH
    touch $CONTRACT_PATH
  fi
}

"$@"