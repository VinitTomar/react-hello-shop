import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";

function Header() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="flex items-center justify-between sticky top-0 bg-white border-b px-6 py-3 border-gray-200">
      <span className="text-lg font-bold text-gray-900">■ Hello Shop</span>
      <nav className="flex gap-6">
        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <Link to="/cart" className="text-sm text-gray-600 hover:text-gray-900">
          Cart
          {totalItems > 0 && (
            <span className="text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded-full ml-1">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
