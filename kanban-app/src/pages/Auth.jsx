import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../entry/Login';
import Signup from './../entry/Signup';

const AuthPage = () => {
	const { authState } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (authState?.isAuthenticated) {
			navigate('/home');
		}
	}, []);

	return (
		<React.Fragment>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route
					path='*'
					element={<Navigate to={'login'} replace={true} />}
				/>
			</Routes>
		</React.Fragment>
	);
};

export default AuthPage;
