import React, { useRef } from 'react';
import { isStrNotFalsy } from '../util';

const AuthForm = ({ mode, onSubmit, isProcessingReq }) => {
	const usernameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const isLogin = mode === 'login';

	const submitHandler = (e) => {
		e.preventDefault();
		const loginCreds = {
			email: emailRef?.current?.value,
			password: passwordRef?.current?.value,
		};

		if (Object.values(loginCreds).every(isStrNotFalsy)) {
			isLogin
				? onSubmit(loginCreds)
				: isStrNotFalsy(usernameRef?.current?.value) &&
				  onSubmit({
						username: usernameRef?.current?.value,
						...loginCreds,
				  });
			return;
		}
		alert('All fields are required!');
	};

	return (
		<form onSubmit={submitHandler} className='form'>
			{mode === 'signup' ? (
				<div className='username'>
					<label htmlFor='username'>Username</label>
					<input
						id='username'
						ref={usernameRef}
						placeholder='John Doe'
						type='text'
						// required
					/>
				</div>
			) : (
				''
			)}
			<div className='email'>
				<label htmlFor='email'>Email Address</label>
				<input id='email' type='email' ref={emailRef} placeholder='Johndoe@example.com' required />
			</div>
			<div className='password'>
				<label htmlFor='password'>Password</label>
				<input id='password' type='password' ref={passwordRef} placeholder='Password' required autoComplete='off' />
			</div>
			<button disabled={isProcessingReq} type='submit'>
				{isLogin ? (isProcessingReq ? 'Signing in...' : 'Sign in') : isProcessingReq ? 'Signing up...' : 'Sign up'}
			</button>
		</form>
	);
};

export default AuthForm;
