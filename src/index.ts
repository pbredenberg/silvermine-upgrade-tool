#!/usr/bin/env node
import commandLineArgs, { OptionDefinition } from 'command-line-args';
import help from './options/help';
import upgrade from './options/upgrade';

const runCli = (): void => {
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
   ];

   const options = commandLineArgs(optionDefinitions);

   if (options.help) {
      help(optionDefinitions);
   } else if (options.upgrade) {
      upgrade(options.commit);
   }
};

runCli();
