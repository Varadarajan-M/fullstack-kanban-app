import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardData } from '../context/BoardDataContext';
import { useAuth } from './../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
	const {
		authState: {
			user: { username },
		},
		clearAuthState,
	} = useAuth();
	const { saveState, saveChanges } = useBoardData();
	const navigate = useNavigate();

	const isSaveDisabled = saveState === 'disabled';
	const isSaving = saveState === 'saving';
	return (
		<nav className='navbar'>
			<div className='nav__brand'>
				<span>{`${username ?? 'User'}'s`} Kanban</span>
			</div>

			<div className='nav__buttons'>
				<div className='nav__save_btn'>
					<button
						disabled={isSaveDisabled || isSaving}
						onClick={saveChanges}
					>
						{isSaving ? 'Saving' : 'Save'}
					</button>
				</div>
				<button
					onClick={() => {
						clearAuthState();
						localStorage.clear();
						navigate('/');
					}}
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
