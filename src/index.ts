#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { OptionDefinitionWithDescription } from './interfaces';
import commit from './options/commit';
import help from './options/help';
import upgrade from './options/upgrade';
import installStandardization from './options/install-standardization';
import configureMarkdownlint from './options/configure-markdownlint';
import configureCommitlint from './options/configure-commitlint';

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
         name: 'commit',
         alias: 'c',
         type: Boolean,
         description: 'Stages and commits modified files with a default commit message',
      },
      {
         name: 'message',
         alias: 'm',
         type: String,
         description: 'Optional message for use with `--commit` to override the default commit message',
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
      },
      {
         name: 'commitlint',
         type: Boolean,
         description: 'Installs a commitlint configuration file',
      },
   ];

   const options = commandLineArgs(optionDefinitions);

   if (options.upgrade) {
      await upgrade();
   } else if (options.commit) {
      await commit(options.message || null);
   } else if (options.standardize) {
      await installStandardization();
   } else if (options.markdownlint) {
      await configureMarkdownlint();
   } else if (options.commitlint) {
      await configureCommitlint();
   } else if (options.help || Object.keys(options).length <= 0) {
      help(optionDefinitions);
   }
};

runCli();
