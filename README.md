# ERC20 Holder Subgraph

Fetch all transfer/approval logs, user balances and token holder for your ERC20 using TheGraph. It may take weeks to
sync the subgraph, better deploy it once you deployed your scam token.

## Setup

1. Fork this repo

2. Install dependencies

```
$ yarn
$ chmod u+x scripts/*
```

3. Update `.env`

```
$ cp .env.template .env
```

Remember to create the subgraph first.

4. Update [`config.json`](./mustache/config.json)

5. Generate `subgraph.yaml` file and deploy.

```
$ yarn prepare:yaml
$ yarn deploy
```

## Time travel queries

To get snapshot on a specific block height:

```
{
  infos(block: {number: <BLOCK_NUMBER>}) {
    id
    lastUpdateBlock
    lastUpdateTimestamp
    transactionCount
    tokenHolder
  }
}
```
