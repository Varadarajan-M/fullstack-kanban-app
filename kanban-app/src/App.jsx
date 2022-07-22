import { Navigate, Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/*' element={<Auth />}></Route>
				<Route
					path='*'
					element={<Navigate to={'/*'} replace={true} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
