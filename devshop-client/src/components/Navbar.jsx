import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-brand text-white shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">DevShop</Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;