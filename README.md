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

## Development Notes

This tool is most useful when install globally, as it is designed to perform operations across
multiples projects. When working on this tool, you can install the local development version
globally as follows:

`npm i -g .`

When changes are made to the package, you may at times want to clean the globally installed
development copy. Do so with:

`npm unlink -g @silvermine/upgrade-tool`

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
