import React from 'react'
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaListUl,
  FaBoxOpen,
  FaBoxes,
  FaShoppingCart,
  FaTachometerAlt,
} from "react-icons/fa";

export const AdminSidebar = () => {
  return (
    /* ---------------- SIDEBAR ---------------- */
      <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-6">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

          {/* Menu Links */}
          <nav>
            <ul className="space-y-5">

              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-3 text-lg hover:text-yellow-400"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>

              <li>
                <Link to="/admin/add-category" className="flex items-center gap-3 hover:text-yellow-400">
                  <FaPlusCircle /> Add Category
                </Link>
              </li>

              
              <li>
                <Link to="/admin/list-categories" className="flex items-center gap-3 hover:text-yellow-400">
                  <FaListUl /> List Categories
                </Link>
              </li>

              <li>
                <Link to="/admin/add-product" className="flex items-center gap-3 hover:text-yellow-400">
                  <FaBoxOpen /> Add Product
                </Link>
              </li>

              <li>
                <Link to="/admin/list-products" className="flex items-center gap-3 hover:text-yellow-400">
                  <FaBoxes /> List Products
                </Link>
              </li>

              <li>
                <Link to="/admin/orders" className="flex items-center gap-3 hover:text-yellow-400">
                  <FaShoppingCart /> Orders
                </Link>
              </li>

            </ul>
          </nav>
        </div>

       
      </aside>
  )
}
export default AdminSidebar