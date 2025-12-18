import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/Input";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Frontend validation
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/users/register`,
        {
          username: form.username,
          email: form.email,
          password: form.password,
          role: "customer",
        }
      );

      // ✅ Save token via context
      login(res.data.token);

      // ✅ Redirect after registration
      navigate("/customer", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-gray-200 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          Create Account
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            className="bg-white"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <Input
            className="bg-white"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            className="bg-white"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Input
            className="bg-white"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            className="bg-blue-800 text-white w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Register;
