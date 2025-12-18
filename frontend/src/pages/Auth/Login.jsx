import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, role, login, loading: authLoading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // 🔁 AUTO REDIRECT AFTER LOGIN
  useEffect(() => {
    if (!authLoading && token) {
      const from = location.state?.from;

      const redirectPath =
        typeof from === "string"
          ? from
          : from?.pathname
          ? from.pathname
          : role === "admin"
          ? "/admin"
          : "/customer";

      navigate(redirectPath, { replace: true });
    }
  }, [token, role, authLoading, navigate, location.state]);

  // ℹ Message when redirected from protected page
  useEffect(() => {
    if (location.state?.from) {
      setInfo("Please login to continue");
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        form
      );

      // ✅ Correct order
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        {info && (
          <div className="bg-blue-100 text-blue-600 p-2 rounded mb-4 text-sm">
            {info}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
