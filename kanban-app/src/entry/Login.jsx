import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/helper';
import AuthForm from './AuthForm';
import './entry.scss';
import Footer from './Footer';
import { isResOk } from './../api/helper';
import { useAuth } from './../context/AuthContext';
const Login = () => {
	const navigate = useNavigate();
	const { setAuthState } = useAuth();
	const onLogin = async (userCreds) => {
		const res = await login(userCreds, setAuthState);
		isResOk(res)
			? navigate('/home')
			: alert(res?.error?.message ?? 'Something went wrong');
	};

	return (
		<div className='container'>
			<h3 className='title'>Kanban App</h3>
			<div className='wrapper'>
				<AuthForm mode={'login'} onSubmit={onLogin} />
				<div className='signup-redirect'>
					<span>
						New to Kanban App?{' '}
						<Link to='/signup'>Create an account</Link>
					</span>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Login;
