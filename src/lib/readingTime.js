import { visit } from 'unist-util-visit';

/** @param {string} text
 * @returns {{minutes: number, seconds: number}}
 */
function timeToReadInSeconds(text) {
	const WORDS_PER_MINUTE = 200;
	const NORMALIZE = 100;
	const SECONDS = 0.6;
	const wordCount = text.trim().split(/\s+/g).length;
	const minutes = wordCount / WORDS_PER_MINUTE;
	const seconds = (minutes - Math.floor(minutes)) * NORMALIZE * SECONDS;
	return { minutes: Math.floor(minutes), seconds: Math.floor(seconds) };
}

export default function readingTime() {
	return (tree, file) => {
		let content = '';
		visit(tree, 'text', (node) => {
			content += node.value;
		});
		const readingTime = timeToReadInSeconds(content);
		file.data.fm.minutesToRead = file.data.fm.minutesToRead || readingTime.minutes;
		file.data.fm.secondsToRead = file.data.fm.secondsToRead || readingTime.seconds;
		console.log(file.data);
	};
}
