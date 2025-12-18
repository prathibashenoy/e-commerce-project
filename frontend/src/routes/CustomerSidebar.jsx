import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaLock, FaBoxOpen } from "react-icons/fa";

const CustomerSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center text-white gap-3 px-4 py-3 rounded-lg transition 
     ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`;

  return (
    <aside className="w-80 bg-black text-white shadow-lg min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6 text-center">My Account</h2>

      <nav className="flex flex-col gap-2 text-white">
        <NavLink to="/customer" className={linkClass}>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/customer/change-password" className={linkClass}>
          <FaLock />
          Change Password
        </NavLink>

        <NavLink to="/customer/my-orders" className={linkClass}>
          <FaBoxOpen />
          My Orders
        </NavLink>
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
