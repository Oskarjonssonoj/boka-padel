import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import Header from './components/layout/Header';
import MainPage from './components/mainpage/MainPage';
import './assets/styles/app.scss'


import AuthContextProvider from './contexts/ContextComponent'
import Sidebar from './components/layout/Sidebar';
import TopBorder from './components/layout/TopBorder';

const App = () => {

	return (
		<div className="App">
      
      <AuthContextProvider>

      <div className="main-app-page">
          
          <TopBorder />
          <Header />
          <Sidebar />

          <div className="content-section">
            <BrowserRouter>

                <Route exact path="/">
                  <MainPage />
                </Route>

            </BrowserRouter>
          </div>

        </div>

      </AuthContextProvider>
		</div>
	);
}

export default App;