// src/pages/Customer/Checkout.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Checkout = () => {
  const { token } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [token, navigate]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle payment
  const handlePayment = async () => {
    if (cartItems.length === 0) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/payment/create-checkout-session`,
        { cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between py-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading || cartItems.length === 0}
            className={`mt-6 px-6 py-2 rounded text-white ${
              loading || cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
            }`}
          >
            {loading ? "Redirecting..." : "Pay Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
