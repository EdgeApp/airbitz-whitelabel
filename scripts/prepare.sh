#!/bin/sh

yarn patch-package

if [ ! -f env.json ]; then
    echo '{ "EDGE_API_KEY": "", "EDGE_API_SECRET": "" }' > env.json
fi
