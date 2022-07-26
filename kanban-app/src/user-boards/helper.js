import { useEffect, useState } from 'react';

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

export const toggleElementFromSet = (set, el, setterFn) => {
	const modifiedSet = new Set(set);
	modifiedSet.has(el) ? modifiedSet.delete(el) : modifiedSet.add(el);
	setterFn(modifiedSet);
};

export const useInstantUpdate = (setterFn) => {
	const [loading, setLoading] = useState(true);

	const performInstantUpdate = (updatedData) => {
		setterFn(updatedData);
		setTimeout(() => setLoading(!loading), 100);
	};

	return { performInstantUpdate };
};
