#!/bin/sh

yarn patch-package

if [ ! -f env.json ]; then
    echo '{ "AIRBITZ_API_KEY": "" }' > env.json
fi
