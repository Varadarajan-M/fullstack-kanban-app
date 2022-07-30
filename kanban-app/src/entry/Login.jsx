import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/helper';
import AuthForm from './AuthForm';
import './entry.scss';
import Footer from './Footer';
import { isResOk } from './../api/helper';
import { useAuth } from './../context/AuthContext';
const Login = () => {
	const navigate = useNavigate();
	const [isProcessingReq, setIsProcessingReq] = useState(false);
	const { setAuthState } = useAuth();
	const onLogin = async (userCreds) => {
		setIsProcessingReq(true);
		const res = await login(userCreds, setAuthState);
		setIsProcessingReq(false);
		isResOk(res)
			? navigate('/home')
			: alert(res?.error?.message ?? 'Something went wrong');
	};

	return (
		<div className='container'>
			<h3 className='title'>Kanban App</h3>
			<div className='wrapper'>
				<AuthForm
					isProcessingReq={isProcessingReq}
					mode={'login'}
					onSubmit={onLogin}
				/>
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
