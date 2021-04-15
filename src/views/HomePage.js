import React, { useState } from 'react'
import {Route} from 'react-router-dom'
import Header from '../components/layout/Header';
import Booking from '../components/booking/Booking';
import '../assets/styles/app.scss'
import Sidebar from '../components/layout/Sidebar';
import TopBorder from '../components/layout/TopBorder';
import Facilities from '../components/facilities/Facilities';
import Facility from '../components/facilities/Facility';
import Profile from '../components/profile/Profile';
import EditProfile from '../components/profile/EditProfile';
import LoginAndRegister from '../components/loginandregister/LoginAndRegister';

const HomePage = () => {

    const [loginAndRegister, setLoginAndRegister] = useState(false)

    return (
        <>
            <TopBorder />
            <Header setLoginAndRegister={setLoginAndRegister}/>
            <Sidebar setLoginAndRegister={setLoginAndRegister}/>

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

                    <Route exact path="/profile">
                        <Profile />
                    </Route>                    

                    <Route path="/profile/edit">
                        <EditProfile />
                    </Route>

                    {
                        loginAndRegister &&
                        <LoginAndRegister />                    
                    }
                </div>
            </div>        
        </>
    )
}

export default HomePage
