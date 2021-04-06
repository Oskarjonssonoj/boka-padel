import React from 'react'
import Loader from '../../../assets/images/loading.gif'
// import Bouncer from '../../../assets/images/loading-bouncer.gif'
import './styles/loading.scss'

const Loading = () => {
    return (
        <div className="loading-section">
             <img src={Loader} alt=""/>
            {/* <img src={Bouncer} alt=""/> */}
        </div>
    )
}

export default Loading
