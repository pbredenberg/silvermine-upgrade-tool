import path from 'path';
import { NPM_PACKAGES_TO_REMOVE } from '../constants';
import { executeCommand } from '../utilities/execute-command';
import isFile from '../utilities/is-file';

const installStandardization = async (): Promise<void> => {
   console.log('Removing unneeded packages...');

   try {
      await executeCommand(`npm uninstall ${NPM_PACKAGES_TO_REMOVE.join(' ')}`);
   } catch(error) {
      console.error(error);
      throw new Error('Error removing outdated packages');
   }

   console.log('Installing @silvermine/standardization...');

   try {
      await executeCommand('npm i -DE @silvermine/standardization@latest');
   } catch(error) {
      console.error(error);
      throw new Error('Error installing standarization');
   }

   console.log('Symlinking .editorconfig...');

   try {
      const editorConfigFileName = '.editorconfig',
            cwd = process.cwd(),
            targetFilePath = path.resolve(cwd, editorConfigFileName);

      if (!isFile(targetFilePath)) {
         await executeCommand(
            `ln -s ./node_modules/@silvermine/standardization/${editorConfigFileName} ${targetFilePath}`
         );
      }
   } catch(error) {
      console.error('Error symlinking .editorconfig', error);
   }

   console.log('Removing old lockfile...');

   try {
      await executeCommand('rm package-lock.json');
   } catch(error) {
      console.error(error);
      throw new Error('Error removing lockfile');
   }

   console.log('Reinstalling NPM packages...');

   try {
      await executeCommand('npm i');
   } catch(error) {
      console.error(error);
      throw new Error('Error running npm install');
   }
};

export default installStandardization;
