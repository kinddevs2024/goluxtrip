import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  longDescription?: string;
  photos?: string[];
  createdAt: string;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const fetchProjects = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    fetch("https://goluxtrip-backend.vercel.app/api/projects")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load tours");
        return res.json();
      })
      .then(data => {
        if (active) setProjects(Array.isArray(data) ? data : []);
      })
      .catch(() => toast.error("Failed to load tours"))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Tour added");
      setIsAdding(false);
      setFormData({});
      fetchProjects();
    } catch {
      toast.error("Failed to save tour");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tour?")) return;
    try {
      const res = await fetch(`https://goluxtrip-backend.vercel.app/api/projects?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Tour deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-navy uppercase tracking-widest">Tours</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gltOrange text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-gltOrange/20 hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add Tour
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-lg border border-line mb-8 grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Title (e.g. Corporate Logistics)" className="border rounded p-3 md:col-span-2" onChange={e => setFormData({...formData, title: e.target.value})} required />
          <textarea placeholder="Short Description" className="border rounded p-3 md:col-span-2 h-20" onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
          <textarea placeholder="Long Description (For Details Page)" className="border rounded p-3 md:col-span-2 h-32" onChange={e => setFormData({...formData, longDescription: e.target.value})}></textarea>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-500 mb-2">Upload Tour Photo</label>
            <input 
              type="file" 
              accept="image/*"
              className="border rounded p-3 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gltOrange/10 file:text-gltOrange hover:file:bg-gltOrange/20"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({...formData, image: reader.result as string});
                  };
                  reader.readAsDataURL(file);
                }
              }} 
              required 
            />
          </div>

          <button type="submit" className="bg-navy text-white py-3 rounded-lg font-bold md:col-span-2 hover:bg-[#051b2e] transition-colors">Save Tour</button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map(p => (
          <div key={p._id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-100 relative">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-navy text-xl mb-1">{p.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{p.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">Added: {new Date(p.createdAt).toLocaleDateString()}</span>
                <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
