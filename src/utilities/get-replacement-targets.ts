import isFile from "./is-file";

export const getReplacementTargets = async (files: string[]): Promise<string[]> => {
   const cwd = process.cwd();

   // ensure files are present before attempting processing.
   return (
      await Promise.all(files
            .filter(async file => {
               const filePath = `${cwd}/${file}`;

               return await isFile(filePath);
            })
      )
   );
}
