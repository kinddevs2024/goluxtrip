import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

type Stat = {
  _id?: string;
  value: string;
  label: string;
  order: number;
};

const DEFAULT_STATS = [
  { label: "Missions Completed", value: "150+", order: 1 },
  { label: "Vehicles in Fleet", value: "45", order: 2 },
  { label: "Regions Covered", value: "14", order: 3 },
  { label: "Active Missions", value: "24/7", order: 4 },
];

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/stats");
      const data = await res.json();
      const fetchedStats = Array.isArray(data) ? data : [];
      
      const mergedStats = DEFAULT_STATS.map(def => {
        const found = fetchedStats.find((s: Stat) => s.label === def.label);
        return found ? found : def;
      });
      setStats(mergedStats);
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
    setSaving(true);
    try {
      for (const stat of stats) {
        if (stat._id) {
          await fetch(`https://goluxtrip-backend.vercel.app/api/stats?id=${stat._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            },
            body: JSON.stringify(stat)
          });
        } else {
          await fetch("https://goluxtrip-backend.vercel.app/api/stats", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            },
            body: JSON.stringify(stat)
          });
        }
      }
      toast.success("Stats updated successfully");
      fetchStats();
    } catch (err) {
      toast.error("Failed to update stats");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-navy uppercase tracking-widest mb-8">Stats Management</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">
        Manage the 4 key metrics displayed on the Home and About pages. The labels are fixed, but you can change the values.
      </p>

      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-lg border border-line p-8 max-w-4xl space-y-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Label</span>
              <div className="text-lg font-bold text-navy">{stat.label}</div>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Value</span>
              <input 
                type="text" 
                value={stat.value}
                onChange={e => {
                  const newStats = [...stats];
                  newStats[idx].value = e.target.value;
                  setStats(newStats);
                }}
                className="w-full border border-line rounded-lg p-3 bg-gray-50 focus:bg-white focus:border-gltOrange outline-none transition-all font-black text-gltOrange"
                required
              />
            </div>
          </div>
        ))}
        
        <button 
          type="submit" 
          disabled={saving}
          className="bg-gltOrange text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#c84211] hover:scale-105 transition-all shadow-lg shadow-gltOrange/20 disabled:opacity-50 mt-8"
        >
          <Save size={18} /> {saving ? "Saving..." : "Save All Stats"}
        </button>
      </form>
    </div>
  );
}
