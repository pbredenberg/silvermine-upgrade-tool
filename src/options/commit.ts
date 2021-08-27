import _ from 'underscore';
import {
   REPLACEMENT_TARGET_FILE_CONFIGS,
   REPLACEMENT_TARGET_FILE_ADDITIONAL_FILES,
} from '../constants';
import { executeCommand } from '../utilities/execute-command';

const commit = async (
   commitMessage: string,
   issueNumber: number | null = null
): Promise<void> => {
   const fileNames = REPLACEMENT_TARGET_FILE_CONFIGS
      .map((file) => {
         return _.uniq((file.files as string[])).join('');
      })
      .concat(REPLACEMENT_TARGET_FILE_ADDITIONAL_FILES);

   let commitMessageParts: string[];

   // Some files may have multiple replacement tasks configured for them,
   // so this ensures that the `add` command does not have the same file name
   // twice. Because that would be wrong, even though it doesn't really matter.
   const fileNamesUnique = _.uniq(fileNames)
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
