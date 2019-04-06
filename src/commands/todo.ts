import { getCmds } from '../lib/utils';
import yargs = require('yargs');

const create = {
	command: 'todo <required> [options]',
	desc: 'TODO',
	builder(yargs: yargs.Argv) {
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
	handler(argv: yargs.Arguments) {
		console.log('TODO', argv);
	}
};

module.exports = create;
