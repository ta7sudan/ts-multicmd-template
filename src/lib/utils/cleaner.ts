export default {
	state: [],
	setState() {
		console.log('收集要清理的内容');
	},
	async cleanup() {
		console.log('todo');
	}
};