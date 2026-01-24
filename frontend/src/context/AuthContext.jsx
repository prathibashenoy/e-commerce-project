// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null); // ✅ ADD THIS
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Load auth data from localStorage (important for Stripe redirect)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUsername(parsedUser?.name || parsedUser?.username || null);
      setRole(parsedUser?.role || null); // ✅ ADD THIS
    }

    setLoading(false);
  }, []);

  // ✅ Call this on login
  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setUsername(userData?.name || userData?.username || null);
    setRole(userData?.role || null); // ✅ ADD THIS
    setToken(jwtToken);
  };

  // 🚪 Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setUsername(null);
    setRole(null); // ✅ ADD THIS
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        role, // ✅ ADD THIS
        token,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

