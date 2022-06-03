import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';
import { REPLACEMENT_TARGET_FILE_CONFIGS } from '../constants';
import { executeCommand } from '../utilities/execute-command';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const upgrade = async (): Promise<void> => {
   const rm = promisify(fs.unlink);
   const cwd = process.cwd();

   await Promise.all(REPLACEMENT_TARGET_FILE_CONFIGS.map(async (config) => {
      const filesToSearch = config.files as string[];

      let options: ReplaceInFileConfig;

      options = {
         files: (filesToSearch).map((file: string) => {
            return `${cwd}/${file}`;
         }),
         from: config.from,
         to: config.to,
      };

      (options.files as string[])
         .forEach((file) => {
            console.log(`Processing ${file}`);
            console.log(`Replacing: '${options.from}' => ${options.to}`);
         });

      try {
         await replaceInFile(options);
      } catch(e) {
         console.error(e);
         throw new Error('Error running file replacements');
      }
   }));

   console.log('Removing package-lock.json in preparation for upgrade...');

   try{
      await rm(path.resolve(process.cwd(), 'package-lock.json'));
      console.log('package-lock.json removed')
   } catch (e) {
      console.error('Could not remove package-lock.json:', e);
   }

   console.log('Running `npm i`...');

   try {
      await executeCommand('npm i');
   } catch(e) {
      console.error(e);
      throw new Error('Error running `npm i`');
   }
};

export default upgrade;
