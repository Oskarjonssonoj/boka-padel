import React from 'react'
import Spinner from '../../../assets/images/spinner.gif'
import './styles/loading.scss'

const ButtonLoaderSmall = () => {
    return (
        <>
            <img alt="button-loading" src={Spinner} className="button-loading"/>
        </>
    )
}

export default ButtonLoaderSmall
