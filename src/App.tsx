import Header from "@/components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
