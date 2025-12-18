import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";


const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/users/verify-email/${token}`
        );

        const { tempToken, userId } = res.data;

        // store TEMP token after email verification
        localStorage.setItem("tempToken", tempToken);
        localStorage.setItem("tempUserId", userId);

        setMessage("Email verified successfully!");

        setTimeout(() => {
          navigate(`/complete-profile/${userId}`);
        }, 1200);

      } catch (err) {
        console.log(err);
        
        setMessage("Email verification failed.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-xl font-semibold">{message}</h1>
    </div>
  );
};

export default VerifyEmail;
