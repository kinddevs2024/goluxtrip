import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Stat = {
  _id: string;
  value: string;
  label: string;
  order: number;
};

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Stat>>({});

  const fetchStats = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/stats");
      const data = await res.json();
      setStats(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://goluxtrip-backend.vercel.app/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify(formData)
      });
      toast.success("Stat added");
      setIsAdding(false);
      setFormData({});
      fetchStats();
    } catch (err) {
      toast.error("Failed to save stat");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    try {
      await fetch(`https://goluxtrip-backend.vercel.app/api/stats?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      toast.success("Stat deleted");
      fetchStats();
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-navy uppercase tracking-widest">Stats Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gltOrange text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-gltOrange/20 hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add Stat
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-lg border border-line mb-8 grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Value (e.g. 150+)" className="border rounded p-3" onChange={e => setFormData({...formData, value: e.target.value})} required />
          <input type="text" placeholder="Label (e.g. Missions Completed)" className="border rounded p-3" onChange={e => setFormData({...formData, label: e.target.value})} required />
          <input type="number" placeholder="Order (e.g. 1)" className="border rounded p-3 md:col-span-2" onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
          
          <button type="submit" className="bg-navy text-white py-3 rounded-lg font-bold md:col-span-2 hover:bg-[#051b2e] transition-colors">Save Stat</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="pb-4 font-semibold">Value</th>
              <th className="pb-4 font-semibold">Label</th>
              <th className="pb-4 font-semibold">Order</th>
              <th className="pb-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(s => (
              <tr key={s._id} className="border-b border-gray-50">
                <td className="py-4 font-bold text-navy text-xl">{s.value}</td>
                <td className="py-4 text-gray-600">{s.label}</td>
                <td className="py-4 text-gray-600">{s.order}</td>
                <td className="py-4 text-right">
                  <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {stats.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">No stats found. Click Add Stat to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
