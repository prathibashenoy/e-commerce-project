// src/pages/Customer/PaymentSuccess.jsx
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { clearCart } from "../../redux/cartSlice";
import { API_URL } from "../../config";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session_id = searchParams.get("session_id");
  const hasRun = useRef(false); // prevent double API call (StrictMode)

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyPayment = async () => {
      if (!session_id) {
        navigate("/customer/my-orders");
        return;
      }

      try {
        const res = await axios.get(
          `${API_URL}/api/payments/payment-success?session_id=${session_id}`,
          { timeout: 15000 }
        );

        const isSuccess =
          res.data.success || res.data.message === "Order already exists";

        if (!isSuccess) throw new Error(res.data.message);

        // ✅ Clear cart only on success
        dispatch(clearCart());

        const orderId =
          res.data.orderId || res.data.order?._id || "N/A";

        await Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          html: `
            <p>Your order has been placed successfully.</p>
            <p style="margin-top:10px;">
              <strong>Order ID:</strong>
              <span style="color:#2563eb;"> ${orderId}</span>
            </p>
            <p style="margin-top:8px;">
              A confirmation email has been sent to your email address.
            </p>
          `,
          confirmButtonText: "View My Orders",
        });

        // ✅ Redirect to My Orders
        navigate("/customer/my-orders");
      } catch (error) {
        console.error("Payment verification failed:", error);

        Swal.fire({
          icon: "warning",
          title: "Payment Processing",
          text:
            "Your payment may be successful. If the amount was debited, please check My Orders.",
          confirmButtonText: "Go to My Orders",
        }).then(() => navigate("/customer/my-orders"));
      }
    };

    verifyPayment();
  }, [session_id, navigate, dispatch]);

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
      <p>Please wait while we verify your payment.</p>
    </div>
  );
};

export default PaymentSuccess;
