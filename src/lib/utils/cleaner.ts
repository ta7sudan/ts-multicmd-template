export default {
	state: [],
	setState(): void {
		console.log('收集要清理的内容');
	},
	async cleanup(): Promise<void> {
		console.log('todo');
	}
};