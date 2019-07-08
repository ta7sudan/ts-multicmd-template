#!/usr/bin/env node
import * as semver from 'semver';
import { logger, getCmds } from '../src/lib/utils';
// 这东西用require直接引入, 防止被tsc直接copy到dist导致一些问题, 并且以
// 打包后的相对路径来引入
const { engines: { node: nodeVersion } } = require('../../package.json');

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
