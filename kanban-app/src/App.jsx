import { Navigate, Routes, Route } from 'react-router-dom';
import './App.scss';
import ProtectedRoutes from './common/ProtectedRoute';
import Auth from './pages/Auth';
import UserData from './pages/UserData';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/*' element={<Auth />}></Route>
				<Route path='/home' element={<ProtectedRoutes />}>
					<Route index element={<UserData />} />
				</Route>
				<Route path='*' element={<Navigate to={'/*'} replace={true} />} />
			</Routes>
		</div>
	);
}

export default App;
