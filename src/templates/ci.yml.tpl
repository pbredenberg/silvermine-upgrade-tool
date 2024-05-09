name: CI

on: [ push, pull_request ]

jobs:
   build:
      runs-on: ubuntu-latest
      steps:
         -
            uses: actions/checkout@v4
            with:
               fetch-depth: 0 # Fetch all history
         -
            uses: actions/setup-node@v4
            with:
               node-version-file: '.nvmrc'
         - run: npm i -g npm@10.5.0
         - run: npm ci
         - run: npm run standards
   test:
      needs: [ build ]
      runs-on: ubuntu-latest
      strategy:
         fail-fast: false
         matrix:
            node-version: [ 16, 20, 'lts/*', 'latest' ]
      steps:
         - uses: actions/checkout@v4
         -
            name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v4
            with:
               node-version: ${{ matrix.node-version }}
         - run: npm i -g npm@10.5.0
         - run: npm ci # Reinstall the dependencies to ensure they install with the current version of node
         - run: npm test{[ if (isInjectingCoveralls) { ]}
         - name: Coveralls
           uses: coverallsapp/github-action@v1
   finish:
      needs: [ test ]
      runs-on: ubuntu-latest
      steps:
         - name: Close parallel build
           uses: coverallsapp/github-action@v1
           with:
               parallel-finished: true{[ } ]}
