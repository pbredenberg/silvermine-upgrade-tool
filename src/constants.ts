import { ReplaceInFileConfig } from 'replace-in-file';

/**
 * The version of Node.js we are currently targeting.
*/
export const CURRENT_NPM_VERSION = '6.14.12';

/**
 * The version of NPM we are currently targeting.
 */
export const CURRENT_NODE_VERSION = '12.22.1';

/**
 * Previous standard versions of Node.js.
 */
export const PREVIOUS_NODE_VERSIONS = [ '12.14.0' ];

/**
 * Previous standard versions of NPM.
 */
export const PREVIOUS_NPM_VERSIONS = [ '6.13.4' ];

/**
 * The commit message to use when committing Node & NPM upgrades to
 * version control.
 */
export const NODE_NPM_UPGRADE_COMMIT_MESSAGE = [
   'chore: upgrade Node to',
   `${CURRENT_NODE_VERSION}`,
   'and NPM to',
   `${CURRENT_NPM_VERSION}`,
]
   .join(' ');

/**
 * The commit message to use when adding @silvermine/standardization.
 */
export const ADD_STANDARDIZATION_COMMIT_MESSAGE =
   'chore: add @silvermine/standardization and configuration';

export const NODE_VERSION_REGEX_MATCH_STRING = `(${PREVIOUS_NODE_VERSIONS.join('|')})`;

export const NPM_VERSION_REGEX_MATCH_STRING = `(${PREVIOUS_NPM_VERSIONS.join('|')})`;

export const REPLACEMENT_TARGET_FILE_CONFIGS: ReplaceInFileConfig[] = [
   {
      files: [ 'package.json' ],
      from: new RegExp(`--npm ${NPM_VERSION_REGEX_MATCH_STRING}`, 'g'),
      to: `--npm ${CURRENT_NPM_VERSION}`,
   },
   {
      files: [ 'package.json' ],
      from: new RegExp(`--node ${NODE_VERSION_REGEX_MATCH_STRING}`, 'g'),
      to: '--node $(cat .nvmrc)',
   },
   {
      files: [ '.nvmrc' ],
      from: new RegExp(`${NODE_VERSION_REGEX_MATCH_STRING}`, 'g'),
      to: CURRENT_NODE_VERSION,
   },
];

export const REPLACEMENT_TARGET_FILE_ADDITIONAL_FILES = [ 'package-lock.json' ];

export const NPM_PACKAGES_TO_REMOVE = [
   '@commitlint/cli',
   '@commitlint/travis-cli',
   '@silvermine/sass-lint-config',
   'check-node-version',
   'grunt-markdownlint',
   'grunt-sass-lint',
   'markdownlint',
];
