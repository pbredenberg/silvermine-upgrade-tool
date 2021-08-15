import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';
import util from 'util';
import childProcess from 'child_process';

const upgrade = async (shouldCommit = false): Promise<void> => {
   const exec = util.promisify(childProcess.exec),
         cwd = process.cwd(),
         currentNodeVersion = '12.14.0',
         currentNPMVersion = '6.13.4',
         targetNodeVersion = '12.22.1',
         targetNPMVersion = '6.14.12';

   let configs: ReplaceInFileConfig[];

   configs = [
      {
         files: [ 'package.json' ],
         from: new RegExp(`--npm ${currentNPMVersion}`, 'g'),
         to: `--npm ${targetNPMVersion}`,
      },
      {
         files: [ 'package.json' ],
         from: new RegExp(`--node ${currentNodeVersion}`, 'g'),
         to: `--node ${targetNodeVersion}`,
      },
      {
         files: [ '.nvmrc' ],
         from: new RegExp(`${currentNodeVersion}`, 'g'),
         to: targetNodeVersion,
      },
   ];

   await Promise.all(configs.map(async (config) => {
      const filesToSearch = config.files as string[];

      let options: ReplaceInFileConfig;

      options = {
         files: (filesToSearch).map((file: string) => {
            return `${cwd}/${file}`;
         }),
         from: config.from,
         to: config.to,
      };

      await replaceInFile(options);

      try {
         await exec('npm ci');
      } catch(e) {
         console.error('Error running `npm ci`:', e);
      }

      if (shouldCommit) {

         try {
            await exec(`git add ${filesToSearch.join(' ')}`);
         } catch(e) {
            console.error('Error staging files:', e);
         }

         try {
            await exec(
               `git commit -m "chore: upgrade Node to ${targetNodeVersion} and NPM to ${targetNPMVersion}"`
            );
         } catch(e) {
            console.error('Error creating commit:', e);
         }
      }
   }));
};

export default upgrade;
