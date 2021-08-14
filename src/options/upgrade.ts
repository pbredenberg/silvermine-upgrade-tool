import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

const upgrade = async (): Promise<void> => {
   const cwd = process.cwd(),
         nodeVersion = '12.14.0',
         npmVersion = '6.13.4';

   let configs: ReplaceInFileConfig[];

   configs = [
      {
         files: [ 'package.json' ],
         from: new RegExp(`--npm ${npmVersion}`, 'g'),
         to: '--npm 6.14.12',
      },
      {
         files: [ 'package.json' ],
         from: new RegExp(`--node ${nodeVersion}`, 'g'),
         to: '--node 12.22.1',
      },
      {
         files: [ '.nvmrc' ],
         from: new RegExp(`${nodeVersion}`, 'g'),
         to: '12.22.1',
      },
   ];

   await Promise.all(configs.map(async (config) => {
      let options: ReplaceInFileConfig;

      options = {
         files: (config.files as string[]).map((file: string) => {
            return `${cwd}/${file}`;
         }),
         from: config.from,
         to: config.to,
      };

      await replaceInFile(options);
   }));
};

export default upgrade;
