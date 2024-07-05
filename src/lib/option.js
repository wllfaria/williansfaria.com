/**
 * @template T
 * @param {T} value
 * @returns {Some<T>}
 */
export function some(value) {
    return Object.create(optionPrototype, {
        isSome: { value: () => true },
        isNone: { value: () => false },
        value: { value: value, enumerable: true },
    });
}

/**
 * @template T
 * @returns {None<T>}
 */
export function none() {
    return Object.create(optionPrototype, {
        isSome: { value: () => false },
        isNone: { value: () => true },
    });
}

/**
 * @template T
 * @param {T | null | undefined} value
 * @returns {Option<T>}
 */
export function option(value) {
    if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
        return none();
    }
    /*** @type {T} */
    const temp = value
    return some(temp);
}

/**
 * @template T
 * @param {Option<T>} opt
 * @returns {opt is Some<T>}
 * */
function isSome(opt) {
    return opt.isSome();
}

/**
 * @template T
 * @param {Option<T>} opt
 * @returns {opt is None<T>}
 * */
function isNone(opt) {
    return opt.isNone();
}

const optionPrototype = {
    /**
     * @template T, U
     * @this {Option<T>}
     * @param {(value: T) => U} fn
     * @returns {Option<U>}
     */
    map(fn) {
        return isSome(this) ? some(fn(this.value)) : none();
    },

    /**
     * @template T
     * @this {Option<T>}
     * @returns {T}
     * @throws {Error} If the value is None.
     */
    unwrap() {
        if (isNone(this)) {
            throw new Error("Tried to unwrap an Option that is None");
        }
        return this.value;
    },

    /**
     * @template T
     * @this {Option<T>}
     * @param {T} defaultValue
     * @returns {T}
     */
    unwrapOr(defaultValue) {
        return isSome(this) ? this.value : defaultValue;
    },
};
