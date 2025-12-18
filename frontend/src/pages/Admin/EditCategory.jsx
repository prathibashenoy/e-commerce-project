import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";


const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    IsActive: true,
    Image: ""
  });

  const [preview, setPreview] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // Fetch category details
  useEffect(() => {
    axios.get(`${API_URL}/api/category/${id}`)
      .then(res => {
        const data = res.data.data;
        setFormData({
          Name: data.Name,
          Description: data.Description,
          IsActive: data.IsActive,
          Image: data.Image
        });
        setPreview(data.Image);
      })
      .catch(err => console.error(err));
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("Description", formData.Description);
    data.append("IsActive", formData.IsActive);

    if (newImage) {
      data.append("Image", newImage);
    }

    try {
      await axios.put(`${API_URL}/api/category/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Category updated successfully!");
      navigate("/admin/list-categories");

    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

        <label className="block">
          <span>Name</span>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block">
          <span>Description</span>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </label>

        <label className="block">
          <span>Status</span>
          <select
            name="IsActive"
            value={formData.IsActive}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </label>

        <label className="block">
          <span>Category Image</span>
          <input type="file" onChange={handleImageChange} />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded border"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
