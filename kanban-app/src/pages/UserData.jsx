import React from 'react';
import Navbar from '../user-boards/Navbar';
import Boards from '../user-boards/Boards';
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
