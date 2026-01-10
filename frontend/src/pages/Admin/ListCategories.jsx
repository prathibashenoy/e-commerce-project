import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";



const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/category`);
      const data = await res.json();
      console.log(data);
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`${API_URL}/api/category/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);

      fetchCategories(); // refresh list
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Error deleting category!");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">List Categories</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b hover:bg-gray-100">
                <td className="p-3 border">
                  <img
                    src={cat.image?.url || "/placeholder.png"}
                    alt={cat.Name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 border font-medium">{cat.Name}</td>

                <td className="p-3 border text-gray-600">
                  {cat.Description || "No description"}
                </td>

                <td className="p-3 border">
                  {cat.IsActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>

                <td className="p-3 mt-3 flex gap-5">
                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/admin/edit-category/${cat._id}`)
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategories;
