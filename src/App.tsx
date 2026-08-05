import Header from "@/components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Orders from "@/pages/Orders";
import Profile from "@/pages/Profile";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
