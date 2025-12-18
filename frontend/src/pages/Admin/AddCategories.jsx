import React, { useState } from "react";
import { API_URL } from "../../config";


const AddCategories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);

  const [successMsg, setSuccessMsg] = useState(""); // ⭐ Success message
  const [errorMsg, setErrorMsg] = useState("");     // ⭐ Error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("IsActive", isActive);
    formData.append("Image", image);

    try {
      const response = await fetch(`${API_URL}/api/category`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || "Category added successfully!");
        setErrorMsg("");

        // Optional: clear form
        setName("");
        setDescription("");
        setIsActive(true);
        setImage(null);
      } else {
        setSuccessMsg("");
        setErrorMsg(data.message || "Failed to add category");
      }

    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Something went wrong!");
      setSuccessMsg("");
    }
  };

  return (
    <div className="p-6 bg-white mx-70 mt-10">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>

      {/* ⭐ Success Message */}
      {successMsg && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {successMsg}
        </p>
      )}

      {/* ⭐ Error Message */}
      {errorMsg && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="max-w-xs space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="border w-full p-2 rounded"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Active */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span className="font-medium">Active</span>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            className="border p-2 w-full rounded"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white my-4 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategories;
