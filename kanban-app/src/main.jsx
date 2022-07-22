import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthContextProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</BrowserRouter>,
);
