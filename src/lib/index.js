/** @param {string} date
 * @returns {string} a short date string in format "Jan 1, 2023"
 */
export function shortDate(date) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
