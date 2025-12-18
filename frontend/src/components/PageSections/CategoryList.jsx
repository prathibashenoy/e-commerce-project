import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/PageSections/CategoryCard";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/category");
        setCategories(data.data); // assuming successResponse({ data })
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-10">
      {categories.map((cat, index) => (
        <CategoryCard
          key={cat._id}
          title={cat.Name}
          description={cat.Description}
          image={`/images/static-category-${index + 1}.jpg`} 
        />
      ))}
    </div>
  );
};

export default CategoryList;
