'use strict';
const {getCmds} = require('../lib/utils');

const create = {
	command: 'todo <required> [options]',
	desc: 'TODO',
	builder(yargs) {
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
	handler(argv) {
		console.log('TODO', argv);
	}
};

module.exports = create;
