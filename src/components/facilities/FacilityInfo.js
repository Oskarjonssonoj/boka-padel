import React from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlinePhone, AiOutlineFieldTime } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { BsTextLeft } from "react-icons/bs";
import { GiTennisCourt } from "react-icons/gi";

const FacilityInfo = ({information}) => {
    return (
    <>
        <div className="each-info-row">
            <HiOutlineLocationMarker />
            <p>{information.address} {information.city}</p>
        </div>
        <div className="each-info-row">
            <AiOutlinePhone />
            <p>{information.phone}</p>
        </div>
        <div className="each-info-row">
            <AiOutlineFieldTime />
            <p>{information.open_hours}</p>
        </div>
        <div className="each-info-row">
            <GoMail />
            <p>{information.email}</p>
        </div>
        <div className="each-info-row">
            <GiTennisCourt />
            <p>{information.courts} st</p>
        </div>
        <div className="each-info-row">
            <p id="description">{information.description}</p>
        </div>
    </>
    )
}

export default FacilityInfo
