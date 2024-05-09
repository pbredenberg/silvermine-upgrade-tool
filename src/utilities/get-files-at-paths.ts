import isFile from './is-file';

/**
 * Gets the paths of a list of files, filtering out any that don't exist.
 * @param files - string[]
 */
export const getFilesAtPaths = async (files: string[]): Promise<string[]> => {
   // ensure files are present before attempting processing.
   return (
      await Promise.all(files.filter(async (file) => {
         return await isFile(file);
      }))
   );
};
