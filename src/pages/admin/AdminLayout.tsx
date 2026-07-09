import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Car, FileText, Inbox, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Applications", path: "/admin", icon: Inbox },
    { name: "Cars", path: "/admin/cars", icon: Car },
    { name: "Content", path: "/admin/content", icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-navy">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col h-full shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <LayoutDashboard className="text-gltOrange" size={28} />
          <span className="text-xl font-black tracking-widest uppercase">Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 ${isActive ? "bg-gltOrange text-white shadow-lg shadow-gltOrange/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg font-semibold tracking-wide text-gray-400 hover:bg-white/5 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gray-50">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
