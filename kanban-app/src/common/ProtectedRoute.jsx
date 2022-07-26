import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';

const AuthError = () => <p>Authentication Error</p>;

const ProtectedRoutes = () => {
	const { authState } = useAuth();

	return authState?.isAuthenticated ? <Outlet /> : <AuthError />;
};

export default ProtectedRoutes;
