import React from 'react'
import {Link} from 'react-router-dom'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { IoMdTransgender } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { BiCalendar } from "react-icons/bi";

const ProfileInfo = ({user}) => {
    return (
    <>
        <div className="each-info-row">
            <HiOutlineLocationMarker />
                {
                    user?.address ?
                    <p>{user.address}</p>
                    : 
                    <Link to="">Redigera adress</Link>
                }
        </div>
        <div className="each-info-row">
            <AiOutlinePhone />
                {
                    user?.phone ?
                    <p>{user.phone}</p>
                    : 
                    <Link to="">Redigera telefonnummer</Link>
                }
        </div>
        <div className="each-info-row">
            <GoMail />
                {
                    user?.email ?
                    <p>{user.email}</p>
                    : 
                    <Link to="">Redigera e-postadress</Link>
                }
        </div>
        <div className="each-info-row">
            <IoMdTransgender />
                {
                    user?.gender ?
                    <p>{user.gender}</p>
                    : 
                    <Link to="">Ange kön</Link>
                }
        </div>
        <div className="each-info-row">
            <BiCalendar />
                {
                    user?.date_of_birth ?
                    <p>{user.date_of_birth}</p>
                    : 
                    <Link to="">Ange födelsedatum</Link>
                }
        </div>
    </>
    )
}

export default ProfileInfo
