'use strict';

module.exports = function (projectName) {
	return {
		prompts: [
			{
				name: 'project',
				type: 'input',
				message: 'Project Name',
				default: projectName
			},
			{
				name: 'author',
				type: 'input',
				message: 'Author',
				validate(input) {
					return !!input;
				}
			},
			{
				name: 'desc',
				type: 'input',
				message: 'Project description',
				default: 'A multicmd cli project'
			},
			{
				name: 'keywords',
				type: 'input',
				message: 'Keywords',
				default: 'cli'
			},
			{
				name: 'cmd',
				type: 'input',
				message: 'Command name',
				default: projectName
			},
			{
				name: 'needNpmrc',
				type: 'confirm',
				message: 'Need .npmrc?',
				default: false
			},
			{
				name: 'hasTest',
				type: 'confirm',
				message: 'Set up unit tests?',
				default: true
			},
			{
				name: 'hasTravis',
				type: 'confirm',
				message: 'Use travis-ci?',
				default: true
			},
			{
				name: 'email',
				type: 'input',
				message: 'Email',
				validate(input) {
					return !!input;
				},
				when({ hasTravis }) {
					return hasTravis;
				}
			},
			{
				name: 'asAPI',
				type: 'confirm',
				message: 'Use as API?',
				default: false
			},
			{
				name: 'dependencies',
				type: 'checkbox',
				message: 'Choose dependencies',
				choices: [
					{
						name: 'Inquirer.js',
						value: '"inquirer": "^6.2.0"'
					},
					{
						name: 'fs-extra',
						value: '"fs-extra": "^7.0.0"'
					},
					{
						name: 'shelljs',
						value: '"shelljs": "^0.8.2"'
					},
					{
						name: 'request',
						value: '"request": "^2.88.0"'
					},
					{
						name: 'got',
						value: '"got": "^9.2.0"'
					},
					{
						name: 'chokidar',
						value: '"chokidar": "^2.0.4"'
					},
					{
						name: 'fast-glob',
						value: '"fast-glob": "^2.2.2"'
					},
					{
						name: 'execa',
						value: '"execa": "^1.0.0"'
					},
					{
						name: 'cross-spawn',
						value: '"cross-spawn": "^6.0.5"'
					}
				]
			}
		],
		complete(answers) {
			const { hasTest, hasTravis, needNpmrc, asAPI } = answers,
				excludes = ['.dulu.js'],
				templates = ['_package.json', 'man/doc.1', 'README.md'],
				transform = {
					'_package.json': 'package.json'
				};
			answers.keywords = answers.keywords ? answers.keywords.split(/\s+/) : [];

			if (!needNpmrc) {
				excludes.push('.npmrc');
			}

			if (!asAPI) {
				excludes.push('types', 'docs/API.md');
			}

			if (!hasTravis) {
				excludes.push('.travis.yml');
			} else {
				templates.push('.travis.yml');
			}


			if (!hasTest) {
				excludes.push('test');
			}

			return {
				excludes,
				templates,
				transform
			};
		}
	};
};
