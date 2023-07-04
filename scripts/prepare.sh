#!/usr/bin/env bash
set -o errexit

yarn run --silent mustache mustache/config.json mustache/subgraph.template.yaml > subgraph.yaml

exit 0