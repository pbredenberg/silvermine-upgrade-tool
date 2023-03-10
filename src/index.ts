#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { OptionDefinitionWithDescription } from './interfaces';
import help from './options/help';
import upgrade from './options/upgrade';
import installStandardization from './options/install-standardization';
import configureMarkdownlint from './options/configure-markdownlint';
import configureCommitlint from './options/configure-commitlint';
import configureGithubActions from "./options/configure-github-actions";

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
         name: 'github-actions',
         type: Boolean,
         description: 'Installs our base github workflows config',
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
         name: 'message',
         alias: 'm',
         type: String,
         description: 'Optional message for use with `--commit` to override the default commit message. For use with `--commit`',
      },
   ];

   const options = commandLineArgs(optionDefinitions);

   if (options.upgrade) {
      await upgrade();
   }

   if (options.standardize) {
      await installStandardization();
   }

   if (options.markdownlint) {
      await configureMarkdownlint();
   }

   if (options['github-actions']) {
      await configureGithubActions();
   }

   if (options.commitlint) {
      await configureCommitlint();
   }

   if (options.help || Object.keys(options).length <= 0) {
      help(optionDefinitions);
   }
};

(async () => {
   await runCli();
})()

