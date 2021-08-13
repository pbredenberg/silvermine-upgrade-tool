#!/usr/bin/env node
import commandLineArgs, { OptionDefinition } from 'command-line-args';
import help from './options/help';

const runCli = (): void => {
   const optionDefinitions: OptionDefinition[] = [
      {
         name: 'help',
         alias: 'h',
         type: Boolean,
      },
   ];

   const options = commandLineArgs(optionDefinitions);

   if (options.help) {
      help(optionDefinitions);
   }
};

runCli();
