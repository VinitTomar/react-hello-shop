import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Spinner from "@/components/Spinner";

const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Cart = lazy(() => import("@/pages/Cart"));
const Orders = lazy(() => import("@/pages/Orders"));
const Profile = lazy(() => import("@/pages/Profile"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const Checkout = lazy(() => import("@/pages/Checkout"));

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen dark:bg-gray-900">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
