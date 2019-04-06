'use strict';

const cleaner = {
	state: [],
	setState() {
		console.log('收集要清理的内容');
	},
	async cleanup() {
		console.log('todo');
	}
};

module.exports = cleaner;
