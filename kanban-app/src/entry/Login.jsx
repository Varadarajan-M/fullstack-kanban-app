import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import './entry.scss';
import Footer from './Footer';
const Login = () => {
	return (
		<div className='container'>
			<h3 className='title'> Kanban App</h3>
			<div className='wrapper'>
				<AuthForm mode={'login'} />
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
