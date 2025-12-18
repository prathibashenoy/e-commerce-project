import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";



function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // ----------------------------
  // LOAD PRODUCT DETAILS
  // ----------------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/product/${id}`
        );

        const p = res.data.data; // IMPORTANT

        setName(p.name);
        setCategorySlug(p.categorySlug);
        setPrice(p.price);
        setStock(p.stock);
        setDescription(p.description || "");
        setImagePreview(p.image); // full URL
      } catch (err) {
        console.error("Fetch Product Error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // ----------------------------
  // HANDLE EDIT SUBMIT
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("categorySlug", categorySlug);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.put(
        `${API_URL}/api/product/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/admin/list-products");
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        
        <label className="block font-semibold">Product Name</label>
        <input
          type="text"
          className="border p-2 w-full rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block font-semibold">Category Slug</label>
        <input
          type="text"
          className="border p-2 w-full rounded mb-3"
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value)}
        />

        <label className="block font-semibold">Price</label>
        <input
          type="number"
          className="border p-2 w-full rounded mb-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="block font-semibold">Stock</label>
        <input
          type="number"
          className="border p-2 w-full rounded mb-3"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <label className="block font-semibold">Description</label>
        <textarea
          className="border p-2 w-full rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block font-semibold">Product Image</label>
        <input
          type="file"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
