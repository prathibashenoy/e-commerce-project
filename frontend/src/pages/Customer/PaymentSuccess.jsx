// src/pages/Customer/PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session_id) return navigate("/customer");

      try {
        const res = await axios.get(`${API_URL}/api/payments/payment-success?session_id=${session_id}`);
        console.log("Payment success:", res.data);
        setTimeout(() => navigate("/customer"), 2000); // redirect after 2s
      } catch (err) {
        console.error("Payment verification failed:", err);
        setTimeout(() => navigate("/customer"), 2000); // redirect anyway
      }
    };

    verifyPayment();
  }, [session_id, navigate]);

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
      <p>Please wait while we verify your payment. You will be redirected shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
