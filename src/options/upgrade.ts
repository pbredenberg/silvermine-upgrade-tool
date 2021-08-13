import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

interface FileStringReplacementSet {
   fileName: string;
   stringPattern: RegExp;
}

const upgrade = async (): Promise<void> => {
   const cwd = process.cwd(),
         nodeVersion = '12.14.0',
         npmVersion = '6.13.4';

   let files: string[];

   files = [ 'package.json', '.nvmrc' ];

   await Promise.all(files.map(async (file) => {
      let options: ReplaceInFileConfig;

      options = {
         files: `${cwd}/${file}`,
         from: new RegExp(`check-node-version --npm ${npmVersion}`, 'g'),
         to: 'check-node-version --npm foo',
      };

      await replaceInFile(options);
   }));
};

export default upgrade;
