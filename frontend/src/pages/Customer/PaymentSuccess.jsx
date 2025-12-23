import { useEffect } from "react";
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

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session_id) return navigate("/customer");

      try {
        const res = await axios.get(
          `${API_URL}/api/payments/payment-success?session_id=${session_id}`
        );

        if (res.data.success) {
          // Clear the cart
          dispatch(clearCart());

          // Show SweetAlert success popup
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: res.data.message || "Your order has been placed successfully.",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
          });

          // Redirect after alert closes
          navigate("/customer");
        } else {
          // Show error alert if order not saved
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: res.data.message || "Something went wrong with your order.",
            confirmButtonText: "OK",
          }).then(() => navigate("/customer"));
        }
      } catch (err) {
        console.error("Payment verification failed:", err);
        Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text: "Please try again or contact support.",
          confirmButtonText: "OK",
        }).then(() => navigate("/customer"));
      }
    };

    verifyPayment();
  }, [session_id, navigate, dispatch]);

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
      <p>Please wait while we verify your payment. You will be redirected shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
