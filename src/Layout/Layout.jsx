import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔹 Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Roomzy
          </Link>
        </div>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/rooms" className="hover:text-blue-600">
            Rooms
          </Link>
          <Link to="/how-it-works" className="hover:text-blue-600">
            How It Works
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About Us
          </Link>
          {userRole ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* 🔹 Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-gray-100 text-center py-3 text-gray-600 text-sm">
        © {new Date().getFullYear()} Roomzy. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
