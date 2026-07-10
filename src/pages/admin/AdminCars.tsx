import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Car = {
  _id: string;
  name: string;
  seats: string;
  bags: string;
  drive: string;
  image: string;
};

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Car>>({});

  const fetchCars = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/cars");
      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://goluxtrip-backend.vercel.app/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify(formData)
      });
      toast.success("Car added");
      setIsAdding(false);
      setFormData({});
      fetchCars();
    } catch (err) {
      toast.error("Failed to save car");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this car?")) return;
    try {
      await fetch(`https://goluxtrip-backend.vercel.app/api/cars?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      toast.success("Car deleted");
      fetchCars();
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-navy uppercase tracking-widest">Fleet Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gltOrange text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-gltOrange/20 hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add Car
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-lg border border-line mb-8 grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Car Name (e.g. Chevrolet Cobalt)" className="border rounded p-3" onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="text" placeholder="Seats (e.g. 4)" className="border rounded p-3" onChange={e => setFormData({...formData, seats: e.target.value})} required />
          <input type="text" placeholder="Bags (e.g. 2)" className="border rounded p-3" onChange={e => setFormData({...formData, bags: e.target.value})} required />
          <input type="text" placeholder="Drive (e.g. FWD)" className="border rounded p-3" onChange={e => setFormData({...formData, drive: e.target.value})} required />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-500 mb-2">Upload Car Image</label>
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

          <button type="submit" className="bg-navy text-white py-3 rounded-lg font-bold md:col-span-2 hover:bg-[#051b2e] transition-colors">Save Car</button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car._id} className="bg-white rounded-xl shadow-md border border-line overflow-hidden group">
            <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
              <img src={car.image} alt={car.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="font-black text-lg text-navy uppercase mb-4">{car.name}</h3>
              <div className="flex gap-4 text-xs font-bold text-gray-500 mb-6">
                <span className="bg-gray-100 px-3 py-1 rounded-full">{car.seats} Seats</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">{car.bags} Bags</span>
              </div>
              <button onClick={() => handleDelete(car._id)} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2 rounded font-bold uppercase tracking-wider text-xs hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
