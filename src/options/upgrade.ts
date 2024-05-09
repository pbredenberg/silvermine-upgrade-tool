import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';
import { REPLACEMENT_TARGET_FILE_CONFIGS } from '../constants';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { getFilesAtPaths } from '../utilities/get-files-at-paths';

const upgrade = async (): Promise<void> => {
   const rm = promisify(fs.unlink);

   await Promise.all(REPLACEMENT_TARGET_FILE_CONFIGS.map(async (config) => {
      const filePaths = (config.files as string[]).map((file) => {
         return `${process.cwd()}/${file}`;
      });

      let filesAtPaths: string[] = [];

      try {
         filesAtPaths = await getFilesAtPaths(filePaths);

         console.log(`filesAtPaths: ${filesAtPaths}`);

         if (filesAtPaths.length <= 0) {
            console.log(`Files not found: ${config.files}`);
            return;
         }
      } catch(e) {
         console.error(e);
      }

      try {
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
      } catch(_e) {
         //
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
