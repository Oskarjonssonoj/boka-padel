import React from 'react'
import {Route} from 'react-router-dom'
import Header from '../components/layout/Header';
import Booking from '../components/booking/Booking';
import '../assets/styles/app.scss'
import Sidebar from '../components/layout/Sidebar';
import TopBorder from '../components/layout/TopBorder';
import Facilities from '../components/facilities/Facilities';
import Facility from '../components/facilities/Facility';
import Login from '../components/login/Login';
import { useAuth } from '../contexts/ContextComponent';
import Profile from '../components/profile/Profile';
import Register from '../components/register/Register';

const HomePage = () => {
    
    const {currentUser} = useAuth()

    console.log(currentUser)

    return (
        <>
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
                    
                    <Route path="/facilities/:id">
                        <Facility />
                    </Route>

                    <Route exact path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/register">
                        <Register />
                    </Route>

                    <Route exact path="/profile">
                        <Profile />
                    </Route>                    
                </div>
            </div>        
        </>
    )
}

export default HomePage
