import React from 'react'
import { Outlet } from 'react-router-dom';

import Footer from '../components/PageSections/Footer';

import AdminHeader from '../components/PageSections/AdminHeader.jsx';
import AdminSidebar from './AdminSidebar.jsx';




function AdminLayout(){
    return(

        <>
           <div className="min-h-screen flex flex-col">

      {/* Header */}
      <AdminHeader />

      {/* Content + Sidebar */}
      <div className="flex flex-1">

        {/* Sidebar (left) */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>             
                     
        </>
    );
}

export default AdminLayout;