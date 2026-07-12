import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Car = {
  _id: string;
  name: string;
  seats: string;
  bags: string;
  drive: string;
  ac?: string;
  fuel?: string;
  year?: string;
  category?: string;
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

  const field = (placeholder: string, key: keyof Car, required = false) => (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-line rounded-lg p-3 text-sm focus:border-navy outline-none transition"
      value={(formData[key] as string) || ""}
      onChange={e => setFormData({ ...formData, [key]: e.target.value })}
      required={required}
    />
  );

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
        <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-lg border border-line mb-8">
          <h2 className="font-black text-navy text-lg uppercase tracking-wide mb-6">New Vehicle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {field("Vehicle Name (e.g. Toyota Land Cruiser 200)", "name", true)}
            {field("Category (e.g. SUV, Minivan, Bus)", "category")}
            {field("Seats (e.g. 7)", "seats", true)}
            {field("Bags / Luggage (e.g. 4)", "bags", true)}
            {field("Drive Type (e.g. 4WD, FWD, RWD)", "drive", true)}
            {field("Fuel Type (e.g. Diesel, Petrol)", "fuel")}
            {field("A/C (e.g. Yes / No)", "ac")}
            {field("Year (e.g. 2022)", "year")}

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-500 mb-2">Upload Car Image</label>
              <input
                type="file"
                accept="image/*"
                className="border border-line rounded-lg p-3 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gltOrange/10 file:text-gltOrange hover:file:bg-gltOrange/20 transition-all"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, image: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="submit" className="bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-[#051b2e] transition-colors">
              Save Vehicle
            </button>
            <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3 rounded-lg border border-line font-bold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car._id} className="bg-white rounded-xl shadow-md border border-line overflow-hidden group">
            <div className="h-48 bg-navy flex items-center justify-center p-4 relative">
              {car.category && (
                <span className="absolute top-3 left-3 bg-gltOrange/20 text-gltOrange text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border border-gltOrange/30">
                  {car.category}
                </span>
              )}
              {car.year && (
                <span className="absolute top-3 right-3 bg-white/10 text-gray-300 text-[9px] font-bold px-2 py-1 rounded-full">
                  {car.year}
                </span>
              )}
              <img src={car.image} alt={car.name} className="max-h-full object-contain mix-blend-luminosity group-hover:scale-110 transition-transform duration-500 opacity-90" />
            </div>
            <div className="p-5">
              <h3 className="font-black text-base text-navy uppercase mb-3 tracking-wide">{car.name}</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-50 rounded-lg px-2 py-2 text-center border border-line">
                  <div className="text-xs text-gray-400 font-bold uppercase">Seats</div>
                  <div className="font-black text-navy">{car.seats}</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-2 py-2 text-center border border-line">
                  <div className="text-xs text-gray-400 font-bold uppercase">Bags</div>
                  <div className="font-black text-navy">{car.bags}</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-2 py-2 text-center border border-line">
                  <div className="text-xs text-gray-400 font-bold uppercase">Drive</div>
                  <div className="font-black text-navy text-sm">{car.drive}</div>
                </div>
              </div>
              {(car.fuel || car.ac) && (
                <div className="flex gap-2 mb-4">
                  {car.fuel && <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">⛽ {car.fuel}</span>}
                  {car.ac && <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">❄️ A/C: {car.ac}</span>}
                </div>
              )}
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
