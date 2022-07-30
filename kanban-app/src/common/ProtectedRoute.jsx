import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';

const ProtectedRoutes = () => {
	const { authState } = useAuth();

	return authState?.isAuthenticated ? <Outlet /> : <Navigate to='/login' replace={true} />;
};

export default ProtectedRoutes;
