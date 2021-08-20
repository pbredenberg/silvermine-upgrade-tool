import path from 'path';
import { getFileContents } from '../utilities/get-file-contents';
import writeFile from '../utilities/write-file-contents';

const configureMarkdownlint = async (): Promise<void> => {
   const cwd = process.cwd(),
         targetFilePath = path.resolve(cwd, '.markdownlint.json');


   await writeFile(
      targetFilePath,
      // Path is relative to `dist` folder compiled file location.
      await getFileContents(path.resolve(__dirname, '..', '..', 'templates/markdownlint.json.tpl'))
   );

   console.log('.markdownlint.json added, you may need to manually configure your build tools.');
};

export default configureMarkdownlint;
