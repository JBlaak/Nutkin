#!/bin/sh

yarn --cwd "./samples/vanilla/0. Proof" install 
yarn --cwd "./samples/vanilla/0. Proof" start

yarn --cwd "./samples/react/1. Basic" install 
yarn --cwd "./samples/react/1. Basic" start

yarn --cwd "./samples/react/2. Hooks" install 
yarn --cwd "./samples/react/2. Hooks" start

yarn --cwd "./samples/react/3. Stack" install 
yarn --cwd "./samples/react/3. Stack" start

yarn --cwd "./samples/react/4. Multi scene" install 
yarn --cwd "./samples/react/4. Multi scene" start

yarn --cwd "./samples/react/5. Routing" install 
yarn --cwd "./samples/react/5. Routing" start 

yarn --cwd "./samples/react/TodoMVC" install 
yarn --cwd "./samples/react/TodoMVC" start 
yarn --cwd "./samples/react/TodoMVC" test 

