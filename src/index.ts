import './lib/utils/safe-promise';

import yargs, { Argv } from 'yargs';
import yargonaut from 'yargonaut';
import chalk from 'chalk';
import { version, author } from '../package.json';
import { handleError, handleSignal } from './lib/utils/error-handler';
import { getCmds,  getFiglet } from './lib/utils';


const authorName = typeof author === 'string' ? author : (author as any).name as string;

process.addListener('SIGHUP', handleSignal);
process.addListener('SIGQUIT', handleSignal);
process.addListener('SIGINT', handleSignal);
process.addListener('SIGTERM', handleSignal);
process.addListener('uncaughtException', handleError);

(async (): Promise<void> => {
	const cmdName = getCmds()[0],
		logo = await getFiglet(cmdName);
	(yargs as any).logo = logo;

	yargonaut
		.helpStyle('blue.underline')
		.style('red.bold', 'required')
		.style('magenta', ['boolean', 'string']);

	yargs
		.scriptName(cmdName)
		.commandDir('./commands')
		.recommendCommands()
		.completion('completion', 'get completion script')
		.alias('h', 'help')
		.alias('v', 'version')
		.example(`${cmdName} todo`, 'TODO')
		.usage(`${chalk.yellowBright(logo)}\n\n${chalk.blue.underline('Usage:')}\n  `
		+ `${cmdName} <command> [options]`)
		.version(version)
		.epilog(`By ${authorName}`)
		.help()
		// 尽量不要用async函数, 不过这里用用也没事
		// MMP第三方的types这里类型少一个参数
		// tslint:disable-next-line
		.fail((async (msg: string, err: Error, yargs: Argv): Promise<void> => {
			// 这个坑爹东西会捕获掉所有同步异常, 子命令的fail还会向上一级命令的fail冒泡
			if (err) {
				await handleError(err);
			} else {
				// 处理子命令不带参数
				yargs.showHelp();
			}
		}) as any);

	const argv = yargs.argv;

	// 没有参数或子命令就显示help
	if (!argv._.length) {
		yargs.showHelp();
	}
})();
