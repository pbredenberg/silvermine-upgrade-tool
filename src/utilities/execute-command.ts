import util from 'util';
import childProcess from 'child_process';

export const executeCommand = async (command: string): Promise<{
   stdout: string;
   stderr: string;
}> => {
   const exec = util.promisify(childProcess.exec);

   try {
      return await exec(command);
   } catch(e) {
      console.error(e);
      throw new Error(`Error executing ${command}`);
   }
};
