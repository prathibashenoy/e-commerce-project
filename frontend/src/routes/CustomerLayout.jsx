import React from 'react'
import { Outlet } from 'react-router-dom';

import Footer from '../components/PageSections/Footer';

import CustomerSidebar from './CustomerSidebar.jsx';
import CustomerHeader from '../components/PageSections/CustomerHeader.jsx';





function CustomerLayout(){
    return(

        <>
           <div className="min-h-screen flex flex-col">

      {/* Header */}
      <CustomerHeader />

      {/* Content + Sidebar */}
      <div className="flex flex-1">

        {/* Sidebar (left) */}
        <CustomerSidebar />

        {/* Main content */}
        <main className="flex-1 bg-gray-100 min-h-screen p-8">
          <Outlet />
        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>             
                     
        </>
    );
}

export default CustomerLayout;