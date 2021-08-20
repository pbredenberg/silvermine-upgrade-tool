import { NPM_PACKAGES_TO_REMOVE } from '../constants';
import { executeCommand } from '../utilities/execute-command';

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
      await executeCommand('npm i -DE @silvermine/standardization');
   } catch(error) {
      console.error(error);
      throw new Error('Error installing standarization');
   }

   console.log('Symlinking .editorconfig...');

   try {
      await executeCommand('ln -s ./node_modules/@silvermine/standardization/.editorconfig .editorconfig');
   } catch(error) {
      console.error(error);
      throw new Error('Error symlinking .editorconfig');
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
