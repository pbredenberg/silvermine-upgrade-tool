# upgrade-tool

[![NPM Version](https://img.shields.io/npm/v/@silvermine/upgrade-tool.svg)](https://www.npmjs.com/package/@silvermine/upgrade-tool)
[![License](https://img.shields.io/github/license/silvermine/upgrade-tool.svg)](./LICENSE)
[![Build Status](https://travis-ci.com/silvermine/upgrade-tool.svg?branch=master)](https://travis-ci.com/silvermine/upgrade-tool)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/upgrade-tool/badge.svg?branch=master)](https://coveralls.io/github/silvermine/upgrade-tool?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/upgrade-tool.svg)](https://david-dm.org/silvermine/upgrade-tool)
[![Dev Dependency Status](https://david-dm.org/silvermine/upgrade-tool/dev-status.svg)](https://david-dm.org/silvermine/upgrade-tool#info=devDependencies&view=table)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## What?

File templates and utilities to help maintain projects for Silvermine.

## Why?

Since most of our projects contain configuration that is virtually identical, we can standardize upgrades
of these projects by providing utility scripts and file templates that make it less manual and cumbersome
to upgrade common software versions.

## How?

Inspect all options available with: `silvermine-upgrade --help`

This tool is most useful when install globally, as it is designed to perform operations across
multiple projects. When working on this tool, you can install the local development version
globally as follows:

`npm i -g .`

NOTE: this tool needs to be installed in *both* the target version of Node.js we are
moving to, *and* the *previous* version of Node.js we are moving away from.

From the root of a project you wish to upgrade, using the version of Node.js you are
upgrading *from*, run `silvermine-upgrade --upgrade`.

When the process completes, run `nvm use` and `npm install` so that the project
lockfile will be updated correctly.

NOTE: Modification of GitHub Actions CI configuration is handled through straight
file replacement. For this, run: `silvermine-upgrade --github-actions --force`

## Development Notes

When changes are made to the package, you may at times want to clean the globally installed
development copy. Do so with:

`npm unlink -g @silvermine/upgrade-tool`

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
