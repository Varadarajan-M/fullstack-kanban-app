import { createContext, useContext, useState } from 'react';
import { doesUserExist, getEmail } from './../api/helper';

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
	},
});

const AuthContext = createContext(initAuthState);

const AuthContextProvider = ({ children }) => {
	const [authState, setAuthState] = useState(getInitialAuthState);

	return (
		<AuthContext.Provider value={{ authState, setAuthState }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
