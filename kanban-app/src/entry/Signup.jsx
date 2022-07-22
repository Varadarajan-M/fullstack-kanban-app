import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import './entry.scss';
import Footer from './Footer';
import { signup, isResOk } from './../api/helper';

const Signup = () => {
	const navigate = useNavigate();
	const onSignup = async (userCreds) => {
		const res = await signup(userCreds);
		isResOk(res)
			? alert('User Registration Success')
			: alert(res?.error?.message);
	};
	return (
		<div className='container'>
			<h3 className='title'> Kanban App</h3>
			<div className='wrapper'>
				<AuthForm mode='signup' onSubmit={onSignup} />
				<div className='login-redirect'>
					<span>
						Already have an account?{' '}
						<Link to='/login'>Sign in</Link>
					</span>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Signup;
