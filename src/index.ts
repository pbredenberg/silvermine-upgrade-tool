#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { OptionDefinitionWithDescription } from './interfaces';
import commit from './options/commit';
import help from './options/help';
import upgrade from './options/upgrade';
import installStandardization from './options/install-standardization';
import configureMarkdownlint from './options/configure-markdownlint';
import configureCommitlint from './options/configure-commitlint';
import { ADD_STANDARDIZATION_COMMIT_MESSAGE, NODE_NPM_UPGRADE_COMMIT_MESSAGE } from './constants';

const runCli = async (): Promise<void> => {
   const optionDefinitions: OptionDefinitionWithDescription[] = [
      {
         name: 'help',
         alias: 'h',
         type: Boolean,
         description: 'Oh, you need help?',
      },
      {
         name: 'upgrade',
         alias: 'u',
         type: Boolean,
         description: 'Runs configured file replacements and `npm ci`',
      },
      {
         name: 'standardize',
         alias: 's',
         type: Boolean,
         description: 'Installs @silvermine/standardization, and removes packages included with the library',
      },
      {
         name: 'markdownlint',
         type: Boolean,
         description: 'Installs a markdownlint configuration file',
         defaultValue: true,
      },
      {
         name: 'commitlint',
         type: Boolean,
         description: 'Installs a commitlint configuration file',
         defaultValue: true,
      },
      {
         name: 'commit',
         alias: 'c',
         type: Boolean,
         description: 'Stages and commits modified files with a default commit message. For use with `--standardize` and `--upgrade`',
         defaultValue: true,
      },
      {
         name: 'message',
         alias: 'm',
         type: String,
         description: 'Optional message for use with `--commit` to override the default commit message. For use with `--commit`',
      },
      {
         name: 'issueNumber',
         alias: 'i',
         type: Number,
         description: 'Optional issue tracker number to pass to the commit message. For use with `--commit`',
      },
   ];

   const options = commandLineArgs(optionDefinitions);

   if (options.upgrade) {
      await upgrade();
      if (options.commit) {
         await commit(NODE_NPM_UPGRADE_COMMIT_MESSAGE, options.issueNumber || null);
      }
   } else if (options.standardize) {
      await installStandardization();

      if (options.markdownlint) {
         await configureMarkdownlint();
      }

      if (options.commitlint) {
         await configureCommitlint();
      }

      if (options.commit) {
         await commit(ADD_STANDARDIZATION_COMMIT_MESSAGE, options.issueNumber || null);
      }
   } else if (options.help || Object.keys(options).length <= 0) {
      help(optionDefinitions);
   }
};

runCli();
