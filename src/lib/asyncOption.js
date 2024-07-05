import { some, none, option } from './option';

/**
 * @template T, U
 * @param {(value: T) => U} fn
 * @returns {Promise<Option<U>>}
 */
Promise.prototype.map = async function (fn) {
	try {
		const result = await this;
		return some(fn(result));
	} catch {
		return none();
	}
};

/**
 * @template T, U
 * @param {(value: T) => Option<U>} fn
 * @returns {Promise<Option<U>>}
 */
Promise.prototype.andThen = async function (fn) {
	try {
		const result = await this;
		return fn(result);
	} catch {
		return none();
	}
};

Promise.prototype.ok = async function () {
	try {
		const result = await this;
		return some(result);
	} catch {
		return none();
	}
};
