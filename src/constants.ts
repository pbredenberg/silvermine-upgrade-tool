import { ReplaceInFileConfig } from 'replace-in-file';

/**
 * The version of Node.js we are currently targeting.
*/
export const CURRENT_NPM_VERSION = '10.5.0';

/**
 * The version of NPM we are currently targeting.
 */
export const CURRENT_NODE_VERSION = '20.12.2';

/**
 * Previous standard versions of Node.js.
 */
export const PREVIOUS_NODE_VERSIONS = [ '12.14.0', '12.22.1', '16.15.0' ];

/**
 * Previous standard versions of NPM.
 */
export const PREVIOUS_NPM_VERSIONS = [ '6.13.4', '6.14.12', '8.5.5' ];

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
   {
      files: [ '.travis.yml' ],
      from: new RegExp(`${NPM_VERSION_REGEX_MATCH_STRING}`, 'g'),
      to: CURRENT_NPM_VERSION,
   },
   {
      files: [ '.github/workflows/ci.yml' ],
      from: new RegExp(`${NPM_VERSION_REGEX_MATCH_STRING}`, 'g'),
      to: CURRENT_NPM_VERSION,
   },
   {
      files: [ '.travis.yml' ],
      from: /grunt standards/g,
      to: 'npm run standards',
   },
   {
      files: [ '.gitlab-ci.yml' ],
      from: /grunt standards/g,
      to: 'npm run standards',
   },
];

export const NPM_PACKAGES_TO_REMOVE = [
   '@commitlint/cli',
   '@commitlint/travis-cli',
   '@silvermine/sass-lint-config',
   'check-node-version',
   'grunt-markdownlint',
   'grunt-sass-lint',
   'grunt-eslint',
   'markdownlint',
];
