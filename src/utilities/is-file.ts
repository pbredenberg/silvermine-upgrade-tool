import { promisify } from 'util';
import fs from 'fs';


const isFile = async (filePath: string): Promise<fs.Stats | undefined> => {
   const stat = promisify(fs.stat);

   // Check for the existence of the file.
   try {
      return await stat(filePath);
   } catch(error) {
      console.log(`${filePath} not present.`);
   }
};

export default isFile;
