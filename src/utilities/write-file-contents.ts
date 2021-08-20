import { promisify } from 'util';
import fs from 'fs';

/**
 * Writes the the provided contents to the file at the provided path.
 * @param filePath - An _absolute_ path to the file
 * @param fileContents - A string representation of the content of the file
 */
const writeFile = async (filePath: string, fileContents: string): Promise<void> => {
   const stat = promisify(fs.stat),
         writeStream = fs.createWriteStream;

   let isFileExisting = false;

   // Check for the existence of the file.
   try {
      await stat(filePath);
      isFileExisting = true;
   } catch(error) {
      console.log(`${filePath} not present, creating...`);
   }

   if (!isFileExisting) {
      const stream = writeStream(filePath, { encoding: 'utf8' });

      stream.write(fileContents);

      return;
   }

   console.log(`${filePath} already exists.`);
};

export default writeFile;
