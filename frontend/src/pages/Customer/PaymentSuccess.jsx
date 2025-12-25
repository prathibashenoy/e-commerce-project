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

  const hasRun = useRef(false); // 🚫 prevent double execution

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
          `${API_URL}/api/payment/payment-success?session_id=${session_id}`
        );

        const isSuccess =
          res.data.message === "Payment verified" ||
          res.data.message === "Order already exists";

        if (isSuccess) {
          dispatch(clearCart());
          const emailSent = res.data.emailSent;


          const orderId =
            res.data.order?._id ||
            res.data.orderId ||
            "N/A";

          await Swal.fire({
             icon: "success",
             title: "Payment Successful 🎉",
             html: `
               <p>Your order has been placed successfully.</p>
               <p style="margin-top:10px;">
               <strong>Order ID:</strong>
               <span style="color:#2563eb;"> ${orderId}</span>
               </p>
              ${
                 emailSent
                 ? `<p style="margin-top:10px; color:green;">
                 📧 Order confirmation email sent successfully!
                 </p>`
                 : `<p style="margin-top:10px; color:orange;">
                 ⚠️ Order placed, but email could not be sent.
                 </p>`
               }
             `,
             confirmButtonText: "View My Orders",
          });


          navigate("/customer/my-orders");
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.error("Payment verification issue:", error);

        // ⚠️ Render timeout / Stripe delay fallback
        Swal.fire({
          icon: "warning",
          title: "Payment Processing",
          text:
            "If your amount was debited, your order will appear in My Orders shortly.",
          confirmButtonText: "Go to My Orders",
        }).then(() => navigate("/customer/my-orders"));
      }
    };

    verifyPayment();
  }, [session_id, navigate, dispatch]);

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
      <p>Please wait while we confirm your order.</p>
    </div>
  );
};

export default PaymentSuccess;
