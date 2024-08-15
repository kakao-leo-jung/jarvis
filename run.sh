#!/bin/bash


SCRIPT_PATH=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

#node $SCRIPT_DIR/shell/shell-main.js

npx tsx $SCRIPT_DIR/shell/shell-main.ts
