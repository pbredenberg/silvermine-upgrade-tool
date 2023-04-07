name: CI

on: [ push, pull_request ]

jobs:
   build:
      runs-on: ubuntu-latest
      steps:
         -
            uses: actions/checkout@v3
            with:
               fetch-depth: 0 # Fetch all history
         -
            uses: actions/setup-node@v3
            with:
               node-version-file: '.nvmrc'
         - run: npm i -g npm@8.5.5
         - run: npm ci
         - run: npm run standards
   test:
      needs: [ build ]
      runs-on: ubuntu-latest
      strategy:
         fail-fast: false
         matrix:
            node-version: [ 14, 16, 'lts/*', 'latest' ]
      steps:
         - uses: actions/checkout@v3
         -
            name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v3
            with:
               node-version: ${{ matrix.node-version }}
         - run: npm i -g npm@8.5.5
         - run: npm ci # Reinstall the dependencies to ensure they install with the current version of node
         - run: npm test{[ if (isInjectingCoveralls) { ]}
         - name: Coveralls
           uses: coverallsapp/github-action@v1{[ } ]}
