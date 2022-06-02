import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';
import { REPLACEMENT_TARGET_FILE_CONFIGS } from '../constants';
import { executeCommand } from '../utilities/execute-command';

const upgrade = async (): Promise<void> => {
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

   console.log('Running `npm ci`...');

   try {
      await executeCommand('npm ci');
   } catch(e) {
      console.error(e);
      throw new Error('Error running `npm ci`');
   }
};

export default upgrade;
