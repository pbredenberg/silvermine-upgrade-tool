import path from 'path';
import { getFileContents } from '../utilities/get-file-contents';
import writeFile from '../utilities/write-file-contents';

const configureCommitlint = async (): Promise<void> => {
   const cwd = process.cwd(),
         targetFilePath = path.resolve(cwd, 'commitlint.config.js');

   console.log('configuring commitlint.config.js...');

   await writeFile(
      targetFilePath,
      // Path is relative to `dist` folder compiled file location.
      await getFileContents(path.resolve(__dirname, '..', '..', 'templates/commitlint.config.js.tpl'))
   );
};

export default configureCommitlint;
