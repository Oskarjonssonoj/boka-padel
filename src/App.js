 import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import Header from './components/layout/Header';
import Booking from './components/booking/Booking';
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

        <BrowserRouter>
        <div className="main-app-page">
            
            <TopBorder />
            <Header />
            <Sidebar />

            <div className="content-section">
                <div className="component-content-section">
                  <Route exact path="/">
                    <Booking />
                  </Route>

                  <Route exact path="/facilities">
                    <Facilities />
                  </Route>
                  
                  <Route exact path="/facilities/:id">
                    <Facility />
                  </Route>
                </div>
            </div>

          </div>
        </BrowserRouter>

      </AuthContextProvider>
		</div>
	);
}

export default App;