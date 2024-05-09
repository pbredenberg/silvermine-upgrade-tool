import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';
import { REPLACEMENT_TARGET_FILE_CONFIGS } from '../constants';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { getFilesAtPaths } from '../utilities/get-files-at-paths';

const upgrade = async (): Promise<void> => {
   const rm = promisify(fs.unlink);

   await Promise.all(REPLACEMENT_TARGET_FILE_CONFIGS.map(async (config) => {
      try {
         const filePaths = (config.files as string[]).map((file) => {
            return `${process.cwd()}/${file}`;
         });

         const filesAtPaths = await getFilesAtPaths(filePaths);

         if (filesAtPaths.length <= 0) {
            console.log(`Files not found: ${config.files}`);
            return;
         }

         let options: ReplaceInFileConfig;

         options = {
            files: filesAtPaths,
            from: config.from,
            to: config.to,
         };

         console.log(`Running replacement(s) for: ${filesAtPaths}`);

         console.log(`Replacing: '${options.from}' => ${options.to}`);
         await replaceInFile(options);
         console.log(`Replaced: '${options.from}' => ${options.to}`);
      } catch(e) {
         console.error(e);
         throw new Error('Error running file replacements');
      }
   }));

   console.log('Removing package-lock.json in preparation for upgrade...');

   try {
      await rm(path.resolve(process.cwd(), 'package-lock.json'));
      console.log('package-lock.json removed.');
      console.log('Please run `nvm use && npm install`.');
   } catch(e) {
      console.error('Could not remove package-lock.json:', e);
   }
};

export default upgrade;
