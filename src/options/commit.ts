import _ from 'underscore';
import {
   REPLACEMENT_TARGET_FILE_CONFIGS,
   GENERATED_PROJECT_FILES,
} from '../constants';
import { executeCommand } from '../utilities/execute-command';
import {getFilesAtPaths} from "../utilities/get-files-at-paths";

const commit = async (
   commitMessage: string,
   issueNumber: number | null = null
): Promise<void> => {
   const cwd = process.cwd();

   const verifiedFilePaths = await getFilesAtPaths(
      _.flatten(REPLACEMENT_TARGET_FILE_CONFIGS.map(config => config.files))
         .map(filePath => `${cwd}/${filePath}`)
   );

   const filePaths = verifiedFilePaths
      .concat(GENERATED_PROJECT_FILES);

   let commitMessageParts: string[];

   // Some files may have multiple replacement tasks configured for them,
   // so this ensures that the `add` command does not have the same file name
   // twice. Because that would be wrong, as opposed to being right.
   const fileNamesUnique = _.uniq(filePaths)
      .join(' ');

   console.log('Staging files:', fileNamesUnique);

   try {
      await executeCommand(`git add ${fileNamesUnique}`);
   } catch(e) {
      console.error(e);
      throw new Error('Error staging files');
   }

   try {
      const stagedFilesCommand = await executeCommand('git diff --cached --numstat | wc -l'),
            stagedFileCount = parseInt(stagedFilesCommand.stdout, 10);

      if (!stagedFileCount && stagedFileCount <= 0) {
         console.error('No staged files to commit! Exiting.');
         return;
      }
   } catch(e) {
      console.error(e);
      throw new Error('Could not get count of staged files.');
   }

   console.log('Committing files:', fileNamesUnique);

   commitMessageParts = [
      commitMessage,
      issueNumber,
   ]
      .map((messagePart) => {
         return messagePart === null
            ? ''
            : `${typeof messagePart === 'number'
               ? `(#${messagePart})`
               : messagePart}`;
      });

   try {
      await executeCommand(`git commit -m "${commitMessageParts.join(' ')}"`);
   } catch(e) {
      console.error('Error creating commit:', e);
   }
};

export default commit;
