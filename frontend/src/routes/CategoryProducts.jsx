import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";


const CategoryProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/product/category/${slug}`
        );

        console.log("API RESPONSE:", data);

        // Your API returns: data: [ products ]
        setProducts(data?.data || []);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, [slug]);

  // Convert slug → "Banarasi Sarees"
  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/-/g, " ");
  };

  return (
    <div className="p-5">
      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-6">
        {formatText(slug).toUpperCase()}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {products.map((product) => (
          <div
            key={product._id}
            className=" p-4 shadow-lg bg-white"
          >
            {/* Product Image */}
            <img
              src={product.image || "/images/no-image.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            {/* Product Name formatted */}
            <h2 className="text-lg font-semibold mt-3">
              {formatText(product.name)}
            </h2>

            {/* Product Price */}
            <p className="text-orange-600 font-bold text-lg mt-1">
              ₹ {product.price || "N/A"}
            </p>

            {/* Button */}
            <Link to={`/product/${product._id}`}>
            <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
              Order Now
            </button>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryProducts;
