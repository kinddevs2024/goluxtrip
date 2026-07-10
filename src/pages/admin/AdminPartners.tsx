import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Partner = {
  _id: string;
  name: string;
  image: string;
};

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({});

  const fetchPartners = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/partners");
      const data = await res.json();
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://goluxtrip-backend.vercel.app/api/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify(formData)
      });
      toast.success("Partner added");
      setIsAdding(false);
      setFormData({});
      fetchPartners();
    } catch (err) {
      toast.error("Failed to save partner");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this partner?")) return;
    try {
      await fetch(`https://goluxtrip-backend.vercel.app/api/partners?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      toast.success("Partner deleted");
      fetchPartners();
    } catch (err) {
      toast.error("Failed to delete partner");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Partners</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90"
        >
          <Plus size={20} /> Add Partner
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-line shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                required
                className="w-full border border-line rounded-lg px-4 py-2 focus:border-navy outline-none"
                value={formData.name || ""}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo Image URL (PNG/SVG transparent)</label>
              <input
                type="url"
                required
                className="w-full border border-line rounded-lg px-4 py-2 focus:border-navy outline-none"
                value={formData.image || ""}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-line rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gltOrange text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Save Partner
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map(partner => (
          <div key={partner._id} className="bg-white rounded-xl border border-line overflow-hidden flex flex-col justify-between">
            <div className="p-4 bg-gray-50 h-32 flex items-center justify-center">
              <img src={partner.image} alt={partner.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{partner.name}</h3>
              </div>
              <button
                onClick={() => handleDelete(partner._id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
