import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } catch (err) {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-navy to-navy" />
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="bg-lightbg p-8 text-center border-b border-line">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4 text-gltOrange">
              <ShieldAlert size={32} />
           </div>
           <h2 className="text-2xl font-black text-navy uppercase tracking-widest">Admin Portal</h2>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Username</label>
            <input
              type="text"
              className="w-full bg-gray-50 border border-line rounded-lg px-4 py-3 text-sm focus:border-gltOrange focus:bg-white outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-gray-50 border border-line rounded-lg px-4 py-3 text-sm focus:border-gltOrange focus:bg-white outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gltOrange text-white font-bold tracking-widest uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#c84211] transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : <><LogIn size={20} /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
}
