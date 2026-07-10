import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Car, FileText, Inbox, LogOut, LayoutDashboard, BarChart, Briefcase, Menu, X } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: "Applications", path: "/admin/applications", icon: Inbox },
    { name: "Cars", path: "/admin/cars", icon: Car },
    { name: "Real Missions", path: "/admin/real-missions", icon: Briefcase },
    { name: "Projects", path: "/admin/projects", icon: Briefcase },
    { name: "Stats", path: "/admin/stats", icon: BarChart },
    { name: "Content", path: "/admin/content", icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-navy">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-navy text-white p-4 flex justify-between items-center z-50 shadow-md">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-gltOrange" size={24} />
          <span className="font-black tracking-widest uppercase">Admin</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 bg-navy text-white flex flex-col h-full shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} pt-16 md:pt-0`}> 
        <div className="hidden md:flex p-6 border-b border-white/10 items-center gap-3">
          <LayoutDashboard className="text-gltOrange" size={28} />
          <span className="text-xl font-black tracking-widest uppercase">Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === "/admin/applications" && location.pathname === "/admin");
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#f4f7f6] p-4 pt-20 md:p-10 md:pt-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
