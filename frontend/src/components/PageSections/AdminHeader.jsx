import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear token + auth data
    navigate("/login");       // redirect to login page
  };

  return (
    <header>
      <div className="mr-5 flex flex-row justify-between items-center mb-10">
        <img className="w-70 h-25" src="/images/logo2.png" alt="" />

        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white py-1 px-5 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
