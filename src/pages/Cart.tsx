import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <span>Your cart is empty.</span>
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        {" "}
        Browse products →{" "}
      </Link>
    </div>
  );
}
