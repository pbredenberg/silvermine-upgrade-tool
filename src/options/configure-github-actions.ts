import path from "path";
import writeFile from "../utilities/write-file-contents";
import {getFileContents} from "../utilities/get-file-contents";
import fs from "fs";

const configureGithubActions = async (): Promise<void> => {
   const cwd = process.cwd(),
      targetDirectoryPath = path.resolve(cwd, '.github/workflows'),
      targetFileName = 'ci.yml';

   console.log(`configuring ${targetDirectoryPath}...`);

   try {
      await fs.promises.mkdir(targetDirectoryPath, { recursive: true })
   } catch (e) {
     console.error(`Could not create directory tree ${targetDirectoryPath}`, e);
   }

   await writeFile(
      `${targetDirectoryPath}/${targetFileName}`,
      // Path is relative to `dist` folder compiled file location.
      await getFileContents(path.resolve(__dirname, '..', '..', `templates/${targetFileName}.tpl`))
   );
}

export default configureGithubActions;
