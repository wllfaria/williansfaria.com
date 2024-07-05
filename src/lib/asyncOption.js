import { some, none, option } from './option'

/**
 * @template T, U
 * @param {(value: T) => U} fn
 * @returns {Promise<Option<U>>}
 */
Promise.prototype.map = async function(fn) {
    try {
        const result = await this;
        return some(fn(result));
    } catch {
        return none();
    }
};

/**
 * @template T
 * @param {(value: T) => void} fn
 * @returns {Promise<void>}
 */
Promise.prototype.andThen = async function(fn) {
    try {
        const result = await this;
        fn(result);
    } catch {
        return;
    }
}

Promise.prototype.ok = async function() {
    try {
        const result = await this;
        return some(result)
    } catch {
        return none();
    }
}
