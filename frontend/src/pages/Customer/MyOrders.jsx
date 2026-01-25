import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config";

const MyOrders = () => {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${API_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("My Orders API response:", res.data);

        // ✅ Backend returns ARRAY directly
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading orders...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <p className="mt-2">
                <span className="font-medium">Total:</span>{" "}
                ₹{order.totalAmount}
              </p>

              <p className="mt-1">
                <span className="font-medium">Payment:</span>{" "}
                {order.paymentStatus || "Paid"}
              </p>

              <div className="mt-3">
                <p className="font-medium mb-1">Items:</p>
                <ul className="list-disc list-inside space-y-1">
                  {Array.isArray(order.items) &&
                    order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
