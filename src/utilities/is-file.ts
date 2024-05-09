import { promisify } from 'util';
import fs from 'fs';


const isFile = async (filePath: string): Promise<boolean> => {
   const stat = promisify(fs.stat);

   let result: fs.Stats | undefined;

   // Check for the existence of the file.
   try {
      result = await stat(filePath);
   } catch(_) {
      //
   }

   return !!result;
};

export default isFile;
