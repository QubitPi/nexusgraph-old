#!/bin/bash
set -x
set -e

query=`cat removeGraph.graphql`

curl -X POST "http://localhost:5000" --data-urlencode "query=$query"
