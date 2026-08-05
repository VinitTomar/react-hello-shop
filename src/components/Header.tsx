import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";

function Header() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <header className="flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <span className="text-lg font-bold text-gray-900 dark:text-white">■ Hello Shop</span>
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Home
        </Link>
        <Link to="/cart" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Cart
          {totalItems > 0 && (
            <span className="text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded-full ml-1">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              login({ id: "1", name: "Alex", email: "alex@example.com" })
            }
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Log in
          </button>
        )}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
