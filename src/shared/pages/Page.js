import React from 'react'
import {Helmet} from 'react-helmet';
import {ConfigApp} from "../../Config";

const Page = (props) => {

    let {title, children} = props
    let { name } = ConfigApp;

    return (
        <>
            <Helmet>
                <title>{ name } - {title}</title>
            </Helmet>

            { children }
        </>
    )
}

export default Page
