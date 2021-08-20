#!/usr/bin/env node
import commandLineArgs, { OptionDefinition } from 'command-line-args';
import commit from './options/commit';
import help from './options/help';
import upgrade from './options/upgrade';

const runCli = async (): Promise<void> => {
   const optionDefinitions: OptionDefinition[] = [
      {
         name: 'help',
         alias: 'h',
         type: Boolean,
      },
      {
         name: 'upgrade',
         alias: 'u',
         type: Boolean,
      },
      {
         name: 'commit',
         alias: 'c',
         type: Boolean,
      },
      {
         name: 'message',
         alias: 'm',
         type: String,
      },
   ];

   const options = commandLineArgs(optionDefinitions);

   if (options.upgrade) {
      await upgrade();
   } else if (options.commit) {
      await commit(options.message || null);
   } else if (options.help || !options) {
      help(optionDefinitions);
   }
};

runCli();
