import figlet from 'figlet';
import path from 'path';
import os from 'os';
import pkg from '../../../package.json';
import cleaner from './cleaner';
import * as logger from './logger';


const TODO_DIR = path.resolve(os.homedir(), '.todo');

type PromiseData = [undefined, any];

type PromiseError = [any, undefined];

export type Callable = (...args: any[]) => any;

export type AsyncCallable = (...args: any[]) => Promise<any>;

export const isAsyncFunction = (fn: any): fn is AsyncCallable => fn[Symbol.toStringTag] === 'AsyncFunction';

export const to = (p: Promise<any>): Promise<PromiseData | PromiseError> => p.then((data: any): PromiseData => [undefined, data]).catch((err: any): PromiseError => [err, undefined]);

export const sleep = (time: number): Promise<any> => new Promise<any>((rs: any): any => setTimeout(rs, time));

export const getAbsolutePath = (rel: string): string => path.resolve(process.cwd(), rel);

export const getCmds = (): string[] => Object.keys(pkg.bin);

export const getFiglet = (cmd: string): Promise<string> => new Promise<string>((rs: any, rj: any): void => {
	figlet(cmd, {
		horizontalLayout: 'fitted'
	}, (err: Error | null, data?: string): void => {
		if (err) {
			rj(err);
		} else {
			rs(data);
		}
	});

});

export { logger, TODO_DIR, cleaner };
