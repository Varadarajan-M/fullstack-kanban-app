const isStrEmpty = (v = '') => v.trim().length === 0;

const isFalsy = (v) => v == undefined || v == null;

const isNotFalsy = (v) => !isFalsy(v);

const isStrFalsy = (v) => isFalsy(v) || isStrEmpty(v);

const isStrNotFalsy = (v) => !isStrFalsy(v);

const isArrayEmpty = (arr = []) => arr.length === 0;

const hasKey = (obj = {}, key = '') => obj?.hasOwnProperty(key);

export {
	isStrEmpty,
	isFalsy,
	isNotFalsy,
	isStrFalsy,
	isStrNotFalsy,
	isArrayEmpty,
	hasKey,
};
