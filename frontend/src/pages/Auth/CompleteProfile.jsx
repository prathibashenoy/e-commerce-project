import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/PageSections/Header";
import Input from "../../components/forms/Input";
import Button from "../../components/Button";
import { API_URL } from "../../config";

const CompleteProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { loginHandler } = useAuth();

  const [form, setForm] = useState({
    Phone: "",
    Dob: "",
    Gender: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ USE TOKEN FROM REGISTER (TEMP TOKEN)
      const token = localStorage.getItem("tempToken");
      console.log("TEMP TOKEN:", token);


      if (!token) {
        alert("Session expired. Please register again.");
        navigate("/register");
        return;
      }

      // ✅ CREATE PROFILE
      await axios.post(
        `${API_URL}/api/userprofiles/${userId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ FINAL LOGIN (NO API CALL)
      loginHandler({ token });

      // ✅ CLEAN TEMP TOKEN
      localStorage.removeItem("tempToken");

      // ✅ GO TO DASHBOARD
      navigate("/customer", { replace: true });

    } catch (err) {
      console.error(err);
      alert("Failed to complete profile");
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center mt-10">
        <form
          className="bg-white p-8 w-96 rounded-md shadow"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Complete Profile</h2>

          <Input
            name="Phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <Input
            type="date"
            name="Dob"
            onChange={handleChange}
            required
          />

          <select
            name="Gender"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <Button className="bg-blue-600 text-white w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;
