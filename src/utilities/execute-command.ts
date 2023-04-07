import util from 'util';
import childProcess from 'child_process';

export const executeCommand = async (command: string): Promise<{
   stdout: string;
   stderr: string;
}> => {
   const exec = util.promisify(childProcess.exec);

   return await exec(command, { cwd: process.cwd() });
};
