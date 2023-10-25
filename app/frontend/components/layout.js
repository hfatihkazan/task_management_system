import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import Header from "./header"

const Layout = (params) => {
    const {isAuth} = params
    //alert(JSON.stringify(useLocation().pathname))
    return(
        <>
            <Header isAuth={ isAuth}/>
        </>
    )
}


export default Layout;