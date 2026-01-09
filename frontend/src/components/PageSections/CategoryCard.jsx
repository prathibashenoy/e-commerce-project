// components/PageSections/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ image, title, description, slug }) => {
  return (
    <Link to={`/category/${slug}`}>
      <div className="relative w-full max-w-3xl mx-auto mt-10 cursor-pointer">
        <img
          className="w-full h-64 md:h-80 rounded-2xl object-cover"
          src={image?.url || "/placeholder.png"}
          alt={title}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1
            className="text-4xl md:text-5xl text-white font-semibold drop-shadow-lg"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {title}
          </h1>

          <h3
            className="mt-4 text-white text-sm md:text-lg max-w-md drop-shadow-md"
            style={{ fontFamily: "'Alex Brush', cursive" }}
          >
            {description}
          </h3>

          <button className="px-6 py-3 mt-6 bg-orange-500 text-white rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition flex items-center gap-2">
            Explore
            <img src="/icons/righticon.png" alt="right" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
