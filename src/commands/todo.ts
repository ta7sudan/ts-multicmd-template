import { getCmds } from '../lib/utils';
import { Argv, Arguments, CommandModule } from 'yargs';

interface MArguments {}
interface MAlias {}

const todo: CommandModule<MArguments & MAlias, MArguments & MAlias> = {
	command: 'todo <required> [options]',
	desc: 'TODO',
	builder(yargs: Argv<MArguments & MAlias>): Argv<MArguments & MAlias> {
		return yargs
			.option('t', {
				alias: 'TODO',
				describe: 'TODO',
				string: true,
				default: ''
			})
			.example(
				`${getCmds()[0]} todo -t`,
				'TODO'
			)
			.check((argv: Arguments<MArguments>, alias: MAlias): boolean => {
				return true
			});
			;
	},
	handler(argv: Arguments<MArguments & MAlias>): void {
		console.log('TODO', argv);
	}
};

module.exports = todo;
