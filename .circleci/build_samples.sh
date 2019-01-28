#!/bin/sh

yarn --cwd "./samples/react/1. Basic" install 
yarn --cwd "./samples/react/1. Basic" start
yarn --cwd "./samples/react/1. Basic" test

yarn --cwd "./samples/react/2. Mvvm" install 
yarn --cwd "./samples/react/2. Mvvm" start
yarn --cwd "./samples/react/2. Mvvm" test

yarn --cwd "./samples/react/3. Stack" install 
yarn --cwd "./samples/react/3. Stack" start
yarn --cwd "./samples/react/3. Stack" test
