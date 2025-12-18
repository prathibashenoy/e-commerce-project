import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { useAuth } from "./context/AuthContext";

/* AUTH */
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import AuthLayout from "./pages/Auth/AuthLayout";

/* PUBLIC */
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import CategoryProducts from "./routes/CategoryProducts";
import ProductDetails from "./routes/ProductDetails";
import AddToCart from "./pages/Customer/AddToCart";
import AboutUs from "./routes/AboutUs";
/* PROTECTED */
import ProtectedRoutes from "./routes/ProtectedRoutes";

/* ADMIN */
import AdminLayout from "./routes/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCategories from "./pages/Admin/AddCategories";
import AddProducts from "./pages/Admin/AddProducts";
import ListCategories from "./pages/Admin/ListCategories";
import ListProducts from "./pages/Admin/ListProducts";
import EditCategory from "./pages/Admin/EditCategory";
import EditProduct from "./pages/Admin/EditProduct";
import Orders from "./pages/Admin/Orders";
import AdminOrders from "./pages/Admin/AdminOrders";

/* CUSTOMER */
import CustomerLayout from "./routes/CustomerLayout";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import Checkout from "./pages/Customer/Checkout";
import PaymentSuccess from "./pages/Customer/PaymentSuccess";
import MyOrders from "./pages/Customer/MyOrders";
import ChangePassword from "./pages/Customer/ChangePassword";



const App = () => {
 // const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* ========== AUTH PAGES ========== */}
        <Route element={<AuthLayout />}>
          {/* 🔑 FIXED: no auto-redirect here */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>

        {/* ========== PUBLIC PAGES ========== */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path="AboutUs" element={<AboutUs />} />
          <Route path="category/:slug" element={<CategoryProducts />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<AddToCart />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        {/* ========== ADMIN PAGES ========== */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="add-category" element={<AddCategories />} />
            <Route path="add-product" element={<AddProducts />} />
            <Route path="list-categories" element={<ListCategories />} />
            <Route path="list-products" element={<ListProducts />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        {/* ========== CUSTOMER PAGES ========== */}
        <Route element={<ProtectedRoutes allowedRoles={["customer"]} />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* ========== FALLBACK ========== */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
