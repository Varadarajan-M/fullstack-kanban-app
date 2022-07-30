import { createContext, useContext, useState } from 'react';
import { doesUserExist, getEmail, getUserName } from './../api/helper';

const initAuthState = {
	isAuthenticated: false,
	user: {
		email: null,
	},
};

const getInitialAuthState = () => ({
	isAuthenticated: doesUserExist(),
	user: {
		email: getEmail(),
		username: getUserName(),
	},
});

const AuthContext = createContext(initAuthState);

const AuthContextProvider = ({ children }) => {
	const [authState, setAuthState] = useState(getInitialAuthState);

	const clearAuthState = () => {
		setAuthState(initAuthState);
		localStorage.clear();
	};

	return <AuthContext.Provider value={{ authState, setAuthState, clearAuthState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
