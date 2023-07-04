#!/usr/bin/env bash
set -o errexit

while getopts a:o: flag
do
    case "${flag}" in
        a) address=${OPTARG};;
        o) file_name=${OPTARG};;
    esac
done

if [[ -z $file_name || -z $address ]]; then
  echo 'Invalid argument.'
  echo 'Input -a <CONTRACT_ADDRESS> -o <OUTPUT_FILE>'
  exit 1
fi

curl -s https://api.etherscan.io/api\?module\=contract\&action\=getabi\&address\=$address  -H "Accept: application/json" | 
python3 -c "import sys, json; print(json.load(sys.stdin)['result'])" > $file_name
echo "Fetched abi for $address";
exit 0