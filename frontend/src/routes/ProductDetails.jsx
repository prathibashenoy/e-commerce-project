//routes/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { API_URL } from "../config";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
    alert("Added to cart!");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto md:flex md:gap-8">
      {/* Image */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Details */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-orange-600 font-semibold">
          ₹ {product.price}
        </p>
        <p className="text-gray-700">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
