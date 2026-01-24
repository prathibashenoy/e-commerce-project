import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config";

const AdminUsers = () => {
  const { token, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin") return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // supports successResponse structure
        setUsers(res.data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, role]);

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin – Users</h1>

      {/* Active Members */}
      <div className="mb-6 p-4 bg-blue-100 rounded-lg">
        <p className="text-lg font-semibold">
          Active Members: {users.length}
        </p>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Username</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
