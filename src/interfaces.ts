import { OptionDefinition } from 'command-line-args';

// The typings for 'command-line-args' does not have support for the `description` field.
export interface OptionDefinitionWithDescription extends OptionDefinition {
   description?: string;
}
