import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const location = useLocation();

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleCollectionClick = () => {
    if (location.pathname !== "/") {
      // Go to home and then scroll
      navigate("/", { state: { scrollTo: "categories" } });
    } else {
      // Already on home → just scroll
      document
        .getElementById("categories")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header>
      <div className="mx-auto flex flex-row justify-between items-center mb-10">
        <img className="w-70 h-25" src="/images/logo2.png" alt="Logo" />

        <nav>
          <ul className="flex flex-row items-center justify-between gap-7 text-gray-600 semibold">
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* ✅ COLLECTION */}
            <li>
              <button
                onClick={handleCollectionClick}
                className="hover:text-red-600"
              >
                Collection
              </button>
            </li>

            <li>
              <Link to="/AboutUs">About Us</Link>
            </li>

           
          </ul>
        </nav>

        <div>
          <nav>
            <ul className="flex flex-row justify-between gap-5 mr-5 mb-5 mr-10">
              <li>
                <Link to="/Login">
                  <img src="/icons/profile.png" alt="Login" />
                </Link>
              </li>

              <li className="flex items-center pl-3 relative">
                <Link to="/cart">
                  <img
                    src="/icons/shopping_cart.png"
                    alt="Shopping Cart"
                  />
                </Link>
                <span className="absolute -top-5 -right-4 text-red-500 px-2 text-md">
                  {totalQuantity}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
