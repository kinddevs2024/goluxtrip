import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

type Application = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  car: string;
  dates: string;
  route: string;
  message: string;
  createdAt: string;
};

export default function AdminApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
    const interval = setInterval(() => {
      fetchApps();
    }, 5000); // Poll every 5 seconds for "live" updates

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      await fetch(`https://goluxtrip-backend.vercel.app/api/applications?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      toast.success("Deleted successfully");
      fetchApps();
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-navy uppercase tracking-widest mb-8">Transportation Requests</h1>
      
      <div className="bg-white rounded-xl shadow-lg border border-line overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-lightbg text-asphalt uppercase tracking-wider font-bold text-xs border-b border-line">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Vehicle/Service</th>
                <th className="p-4">Route Info</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {apps.map(app => (
                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 whitespace-nowrap text-gray-500 font-medium">
                    {format(new Date(app.createdAt), "MMM dd, yyyy HH:mm")}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-navy">{app.name}</div>
                    <div className="text-gray-500 text-xs">{app.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-navy/5 text-navy font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">{app.car}</span>
                    <div className="text-gray-500 text-xs mt-2 truncate max-w-[200px]">{app.dates}</div>
                  </td>
                  <td className="p-4">
                    <div className="truncate max-w-[300px] text-gray-600 font-medium">{app.route}</div>
                    {app.message && <div className="text-xs text-gray-400 mt-1 truncate max-w-[300px]">Msg: {app.message}</div>}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(app._id)} className="text-red-400 hover:text-red-600 transition-colors bg-red-50 p-2 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest">No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
