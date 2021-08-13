import commandLineUsage from 'command-line-usage';

const help = (optionDefinitions: commandLineUsage.OptionDefinition[]): void => {
   const usage = commandLineUsage([
      {
         header: '@Silvermine Upgrade Tool',
         content: 'A tool to help upgrade dependencies in our projects.',
      },
      {
         header: 'Options',
         optionList: optionDefinitions,
      },
      {
         content: 'Project home: {underline https://github.com/pbredenberg/silvermine-upgrade-tool}',
      },
   ]);

   console.log(usage);
};

export default help;
