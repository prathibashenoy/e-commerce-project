// src/routes/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../../components/PageSections/Header";


const AuthLayout = () => {
  return (
    <div>
      <Header /> {/* Show header on login/register */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
