import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../entry/Login';
import Signup from './../entry/Signup';

const AuthPage = () => {
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
