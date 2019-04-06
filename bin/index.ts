#!/usr/bin/env node
import * as semver from 'semver';
import { logger, getCmds } from '../src/lib/utils';
import { engines } from '../package.json';

const { node: nodeVersion } = engines;

function checkNodeVersion(wanted: string, cliName: string): void {
	const curNodeVersion = process.version;
	if (!semver.satisfies(curNodeVersion, wanted)) {
		logger.error(
			`You are using Node ${curNodeVersion}, but this version of ${cliName} requires Node ${wanted}. Please upgrade your Node version.`
		);
		process.exit(1);
	}
}

checkNodeVersion(nodeVersion, getCmds()[0]);

require('../src');
