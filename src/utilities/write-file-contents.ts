import fs from 'fs';
import isFile from './is-file';

/**
 * Writes the the provided contents to the file at the provided path.
 * @param filePath - An _absolute_ path to the file
 * @param fileContents - A string representation of the content of the file
 */
const writeFile = async (filePath: string, fileContents: string): Promise<void> => {
   const writeStream = fs.createWriteStream,
         isFilePresent = await isFile(filePath);

   if (isFilePresent) {
      console.log(`${filePath} already exists.`);
      return;
   }

   const stream = writeStream(filePath, { encoding: 'utf8' });

   stream.write(fileContents);
};

export default writeFile;
