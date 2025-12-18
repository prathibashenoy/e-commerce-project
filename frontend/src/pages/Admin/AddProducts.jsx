// src/pages/Admin/AddProduct.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";


const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    categorySlug: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------------------
  // FETCH CATEGORIES
  // ---------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/category`);

        console.log("Categories fetched:", res.data.data);

        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ---------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------------------------
  // SUBMIT FORM
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // ✅ DEBUG (remove later)
      console.log("Submitting categorySlug:", formData.categorySlug);

      const res = await axios.post(`${API_URL}/api/product`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Product Added Successfully!");

      // Reset form
      setFormData({
        name: "",
        categorySlug: "",
        price: "",
        stock: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-medium mb-1">Category</label>

          {loadingCategories ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-red-500">No categories found!</p>
          ) : (
            <select
              name="categorySlug"
              value={formData.categorySlug}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.Slug}>
                  {cat.Name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
