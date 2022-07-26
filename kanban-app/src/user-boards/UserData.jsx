import React from 'react';
import Navbar from './Navbar';
import Boards from './Boards';
import { BoardDataContextProvider } from '../context/BoardDataContext';

const UserData = () => {
	return (
		<BoardDataContextProvider>
			<Navbar />
			<Boards />
		</BoardDataContextProvider>
	);
};
export default UserData;
