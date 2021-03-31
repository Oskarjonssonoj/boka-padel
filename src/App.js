import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import Header from './components/layout/Header';
import MainPage from './components/mainpage/MainPage';
import './assets/styles/app.scss'


import AuthContextProvider from './contexts/ContextComponent'
import Sidebar from './components/layout/Sidebar';
import TopBorder from './components/layout/TopBorder';
import Facilities from './components/facilities/Facilities';
import Facility from './components/facilities/Facility';

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
              <div className="component-content-section">
                <Route exact path="/">
                  <MainPage />
                </Route>

                <Route exact path="/facilities">
                  <Facilities />
                </Route>
                
                <Route exact path="/facilities/:id">
                  <Facility />
                </Route>
              </div>
            </BrowserRouter>
          </div>

        </div>

      </AuthContextProvider>
		</div>
	);
}

export default App;