#!/bin/bash

SCRIPT_PATH=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

sudo ln -s $SCRIPT_DIR/run.sh /usr/local/bin/jarvis