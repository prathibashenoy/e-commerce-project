import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/PageSections/CategoryCard";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/category`
        );
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <CategoryCard
          key={cat._id}
          title={cat.Name}
          description={cat.Description}
          image={cat.image}   /* Cloudinary image */
          slug={cat.Slug}
        />
      ))}
    </div>
  );
};

export default CategoryList;
