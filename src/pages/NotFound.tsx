import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <span className="text-gray-500">Page not found.</span>
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        {" "}
        ← Back to Home{" "}
      </Link>
    </div>
  );
}
