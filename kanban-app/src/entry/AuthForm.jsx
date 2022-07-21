import React from 'react';

const AuthForm = ({ mode, onClick }) => {
	return (
		<form className='form'>
			{mode === 'signup' ? (
				<div className='username'>
					<label htmlFor='username'>Username</label>
					<input
						id='username'
						placeholder='John Doe'
						type='text'
						required
					/>
				</div>
			) : (
				''
			)}
			<div className='email'>
				<label htmlFor='email'>Email Address</label>
				<input
					id='email'
					type='email'
					placeholder='Johndoe@example.com'
					required
				/>
			</div>
			<div className='password'>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					placeholder='Password'
					type='password'
					required
				/>
			</div>
			<button onClick={onClick}>
				{mode === 'login' ? 'Sign in' : 'Sign up'}
			</button>
		</form>
	);
};

export default AuthForm;
