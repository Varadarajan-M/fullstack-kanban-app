import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import './entry.scss';
import Footer from './Footer';
import { signup, isResOk } from './../api/helper';

const Signup = () => {
	const [isProcessingReq, setIsProcessingReq] = useState(false);

	const onSignup = async (userCreds) => {
		setIsProcessingReq(true);
		const res = await signup(userCreds);
		setIsProcessingReq(false);
		isResOk(res) ? alert('User Registration Success') : alert(res?.error?.message ?? 'Something went wrong');
	};
	return (
		<div className='container'>
			<h3 className='title'> Kanban App</h3>
			<div className='wrapper'>
				<AuthForm isProcessingReq={isProcessingReq} mode='signup' onSubmit={onSignup} />
				<div className='login-redirect'>
					<span>
						Already have an account? <Link to='/login'>Sign in</Link>
					</span>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Signup;
