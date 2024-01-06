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

/** @param {string} date
 * @returns {string} a date string in format "Jan 1, 2023 12:00"
 */
export function longDate(date) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
}
