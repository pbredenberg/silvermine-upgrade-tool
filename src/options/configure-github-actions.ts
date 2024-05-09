import path from 'path';
import writeFile from '../utilities/write-file-contents';
import { getFileContents } from '../utilities/get-file-contents';
import fs from 'fs';
import commandLineArgs from 'command-line-args';
import { executeCommand } from '../utilities/execute-command';
import isFile from '../utilities/is-file';
import _ from 'underscore';

const configureGithubActions = async (options: commandLineArgs.CommandLineOptions): Promise<void> => {
   const cwd = process.cwd(),
         targetDirectory = '.github/workflows',
         targetFileName = 'ci.yml',
         targetFilePath = `${targetDirectory}/${targetFileName}`,
         targetDirectoryPath = path.resolve(cwd, targetDirectory),
         isInjectingCoveralls = options['with-coveralls'];

   let templateFile: string,
       compiledTemplate: _.CompiledTemplate;

   templateFile = await getFileContents(path.resolve(__dirname, '..', '..', `templates/${targetFileName}.tpl`));

   compiledTemplate = _.template(templateFile, {
      evaluate: /\{\[([\s\S]+?)\]\}/g,
   });

   console.log(`configuring ${targetDirectoryPath}...`);

   if (await isFile(targetFilePath)) {
      console.log(`${targetFilePath} already exists. So I guess that means I can knock off early!`);
      return;
   }

   try {
      await fs.promises.mkdir(targetDirectoryPath, { recursive: true });
   } catch(e) {
      console.error(`Could not create directory tree ${targetDirectoryPath}`, e);
   }

   console.log(`with coveralls: ${isInjectingCoveralls}`);

   await writeFile(
      targetFilePath,
      // Path is relative to `dist` folder compiled file location.
      compiledTemplate({ isInjectingCoveralls: isInjectingCoveralls })
   );

   if (options.commit) {
      try {
         const result = await executeCommand(`git add ./${targetFilePath}`);

         console.log(result);
      } catch(_e) {
         //
      }

      try {
         const result = await executeCommand('git commit -m "ci: add GitHub Actions configuration"');

         console.log(result);
      } catch(_e) {
         //
      }
   }
};

export default configureGithubActions;
