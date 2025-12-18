//routes/Home.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/PageSections/CategoryCard";
import { API_URL } from "../config";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/category`);
        setCategories(data.data); // depends on your backend response structure
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="pb-20">
      {/* Banner */}
      <section>
        <img
          className="w-full h-60 md:h-120 object-cover"
          src="/images/banner-final.png"
          alt="Banner"
        />
      </section>

      {/* Category Cards */}
      <section id="categories" className="mt-12 px-4">
         <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Categories
          </h1>
        {categories.map((item, index) => (
          <CategoryCard
            key={item._id}
            slug={item.Slug}
            image={item.Image || `/images/static-category-${index + 1}.jpg`}
            title={item.Name}
            description={item.Description}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;
