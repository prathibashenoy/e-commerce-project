import React from 'react'
import { Outlet } from 'react-router-dom';

import Footer from '../components/PageSections/Footer';
import Header from '../components/PageSections/Header.jsx';


function Layout(){
    return(

        <>
           <Header>            
           </Header>
           <Outlet/>          
            <Footer>               
            </Footer>
           
        </>

    );
}

export default Layout;