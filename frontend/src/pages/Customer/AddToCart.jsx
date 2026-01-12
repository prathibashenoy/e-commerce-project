import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AddToCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!token) {
      navigate("/login", {
        state: { from: "/customer/checkout" }, // ✅ WORKS
      });
    } else {
      navigate("/customer/checkout");
    }
  };

  return (
    <div className="p-1 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="border-b py-4 flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹ {item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item._id))}
                    className="px-3 bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item._id))}
                    className="px-3 bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-8 p-5 border rounded">
            <p className="text-lg">
              Subtotal: <strong>₹ {subtotal.toFixed(2)}</strong>
            </p>

            <button
              onClick={handleCheckout}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
