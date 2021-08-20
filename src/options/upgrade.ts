import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';
import util from 'util';
import childProcess from 'child_process';
import { REPLACEMENT_TARGET_FILE_CONFIGS } from '../constants';

const upgrade = async (): Promise<void> => {
   const exec = util.promisify(childProcess.exec),
         cwd = process.cwd();

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

   console.log('Running `npm ci`...');

   try {
      await exec('npm ci');
   } catch(e) {
      console.error(e);
      throw new Error('Error running `npm ci`');
   }
};

export default upgrade;
