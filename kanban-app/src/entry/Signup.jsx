import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import './entry.scss';
import Footer from './Footer';

const Signup = () => {
	return (
		<div className='container'>
			<h3 className='title'> Kanban App</h3>
			<div className='wrapper'>
				<AuthForm mode='signup' />
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
