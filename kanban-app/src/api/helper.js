import {
	ADD_BOARD_URL,
	ADD_NEW_TASK_URL,
	BOARD_INFO_URL,
	LOGIN_URL,
	SAVE_CHANGES_URL,
	SIGN_UP_URL,
	UPDATE_BOARD_URL,
} from './constants';
import { isStrNotFalsy } from '../util';

// *Local Storage

export const getUser = () => localStorage.getItem('authToken') ?? null;

export const getEmail = () => localStorage.getItem('authEmail') ?? null;

export const getUserName = () => localStorage.getItem('authUser') ?? null;

export const doesUserExist = () => isStrNotFalsy(getUser());

export const setToken = (v) => localStorage.setItem('authToken', v);

export const setEmail = (v) => localStorage.setItem('authEmail', v);

export const setUserName = (v) => localStorage.setItem('authUser', v);

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

export const makeHttpOptions = (method = 'GET', body = {}, authToken = null) => {
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
	const res = await makeHttpReq(LOGIN_URL, makeHttpOptions('POST', userCreds));
	if (isResOk(res)) {
		setAuthState({
			isAuthenticated: true,
			user: {
				email: res?.payload?.email,
				username: res?.payload?.username,
			},
		});
		setEmail(res?.payload?.email);
		setToken(res?.payload?.token);
		setUserName(res?.payload?.username);
	}
	return res;
};
// *Signup service
export const signup = async (userCreds) => {
	const res = await makeHttpReq(SIGN_UP_URL, makeHttpOptions('POST', userCreds));
	return res;
};

// Get user board information

export const getBoardInfo = async (accessToken) => {
	const res = await makeHttpReq(BOARD_INFO_URL, makeHttpOptions('GET', {}, accessToken));
	return res;
};

// Update Board Name

export const updateBoard = async (id, value, accessToken) => {
	const res = await makeHttpReq(
		`${UPDATE_BOARD_URL}/${id}`,
		makeHttpOptions(
			'PATCH',
			{
				board_name: value,
			},
			accessToken,
		),
	);
	return res;
};

export const addBoard = async (boardDetails, accessToken) => {
	const res = await makeHttpReq(ADD_BOARD_URL, makeHttpOptions('POST', boardDetails, accessToken));
	return res;
};

export const saveAllChanges = async (payload, accessToken) => {
	const res = await makeHttpReq(SAVE_CHANGES_URL, makeHttpOptions('PUT', payload, accessToken));
	return res;
};

// task services

export const addTask = async (task, accessToken) => {
	const res = await makeHttpReq(ADD_NEW_TASK_URL, makeHttpOptions('POST', task, accessToken));
	return res;
};
