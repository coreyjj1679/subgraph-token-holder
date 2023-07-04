#!/usr/bin/env bash

set -a; source .env; set +a

if [[ -z "${THEGRAPH_TOKEN}" || -z "${SUBGRAPH_NAME}" ]]; then
  echo "Please update 1. Your TheGraph access token 2. subgraph name in .env"
  exit 1
fi

graph auth --product hosted-service $THEGRAPH_TOKEN;

graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ $SUBGRAPH_NAME subgraph.yaml