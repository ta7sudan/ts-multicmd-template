import { getCmds } from '../lib/utils';
import { Argv, Arguments } from 'yargs';

const create = {
	command: 'todo <required> [options]',
	desc: 'TODO',
	builder(yargs: Argv): Argv {
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
			);
	},
	handler(argv: Arguments): void {
		console.log('TODO', argv);
	}
};

module.exports = create;
