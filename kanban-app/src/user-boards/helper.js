export const removeKey = (obj, key) => {
	const clone = structuredClone(obj);
	delete clone[[key]];
	return clone;
};

export const setValue = (obj, path, value) => {
	const newObj = obj;
	const patharray = path.split('.');
	const getVal = (obj, patharr, value) => {
		let key = obj[patharr[0]];
		if (typeof key === 'object' && patharr.length > 1) {
			return getVal(key, patharr.slice(1), value);
		}
		return obj;
	};
	let res = getVal(obj, patharray, value);
	res[patharray.at(-1)] = value;
	return newObj;
};
