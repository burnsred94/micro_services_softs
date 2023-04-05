#!/bin/sh
echo "-= Image Builder =-"

load_dev_env () {
    PWD_ENV=$PWD/dev
    . $PWD_ENV/sru-env.development.env
     echo "Using 🟢🟢🟢 $INFRA_STACK_NAME"
}

run_build_stack () {
    echo "> Build stack"
    . dev/build-stack.sh
    . scripts/restart-stack.sh
}

_PARAM_TARGET=$1

case $_PARAM_TARGET in
  "build:stack") load_dev_env && run_build_stack;
esac
