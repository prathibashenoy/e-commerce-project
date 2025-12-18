import React from "react";
import { useAuth } from "../../context/AuthContext";

const CustomerDashboard = () => {
  const { username, role } = useAuth();

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Hiii <span className="text-blue-600">{username}</span> 👋
      </h1>
      <p className="text-gray-700 text-lg mb-2">Welcome back, {username}</p>
      <p className="text-sm text-gray-500">Role: {role}</p>
    </div>
  );
};

export default CustomerDashboard;
