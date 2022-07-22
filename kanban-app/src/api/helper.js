import { LOGIN_URL, SIGN_UP_URL } from './constants';
import { isStrNotFalsy } from '../util';

// *Local Storage

export const getUser = () => localStorage.getItem('authToken') ?? null;

export const getEmail = () => localStorage.getItem('authEmail') ?? null;

export const doesUserExist = () => isStrNotFalsy(getUser());

export const setUser = (v) => localStorage.setItem('authToken', v);

export const setEmail = (v) => localStorage.setItem('authEmail', v);

// *http

export const makeHttpReq = async (url, options = {}) => {
	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const makeHttpOptions = (
	method = 'GET',
	body = {},
	authToken = null,
) => {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(authToken !== null && { Authorization: `Bearer ${authToken}` }),
		},
		...(method !== 'GET' && { body: JSON.stringify(body) }),
	};
	return options;
};

export const isResOk = (res) => res?.ok;

// *Login service

export const login = async (userCreds, setAuthState) => {
	const res = await makeHttpReq(
		LOGIN_URL,
		makeHttpOptions('POST', userCreds),
	);
	if (isResOk(res)) {
		setAuthState({
			isAuthenticated: true,
			user: {
				email: res?.payload?.email,
			},
		});
		setEmail(res?.payload?.email);
		setUser(res?.payload?.token);
	}
	return res;
};
// *Signup service
export const signup = async (userCreds) => {
	const res = await makeHttpReq(
		SIGN_UP_URL,
		makeHttpOptions('POST', userCreds),
	);
	return res;
};
