import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import './assets/styles/app.scss'


import AuthContextProvider from './contexts/ContextComponent'
import HomePage from './views/HomePage';

const App = () => {

	return (
		<div className="App">
      
      <AuthContextProvider>

        <BrowserRouter>
          <div className="main-app-page">
            
            <Route path="/" component={HomePage} />

          </div>
        </BrowserRouter>

      </AuthContextProvider>
		</div>
	);
}

export default App;