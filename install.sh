#!/bin/bash

SCRIPT_PATH=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

cd $SCRIPT_DIR
npm install
sudo ln -sf $SCRIPT_DIR/run.sh /usr/local/bin/jarvis
