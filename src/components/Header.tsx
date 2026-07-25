function Header() {
  return (
    <header className="flex items-center justify-between sticky top-0 bg-white border-b px-6 py-3 border-gray-200">
      <span className="text-lg font-bold text-gray-900">■ Hello Shop</span>
      <nav className="flex gap-6">
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          Cart
        </a>
      </nav>
    </header>
  );
}

export default Header;
