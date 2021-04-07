import React from 'react'
import Loader from '../../../assets/images/spinner.gif'
import './styles/loading.scss'

const SmallLoader = () => {
    return (
        <div className="small-loader">
            <img alt="loading" src={Loader}/> 
        </div>
    )
}

export default SmallLoader
