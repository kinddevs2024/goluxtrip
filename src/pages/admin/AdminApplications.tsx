import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Trash2, Mail, Phone, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

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
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApps = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      if (!res.ok) throw new Error("Failed to load applications");
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApps();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchApps, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    try {
      const res = await fetch(`https://goluxtrip-backend.vercel.app/api/applications?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Deleted");
      fetchApps();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchApps();
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gltOrange" />
    </div>
  );

  // Parse route string into structured parts
  const parseRoute = (route: string) => {
    const parts: Record<string, string> = {};
    route.split("|").forEach(part => {
      const [key, ...val] = part.split(":");
      if (key && val.length) parts[key.trim()] = val.join(":").trim();
    });
    return parts;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-widest">Transportation Requests</h1>
          <p className="text-sm text-gray-400 mt-1">{apps.length} total request{apps.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-navy text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl hover:bg-gltOrange transition-all"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-line p-16 text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No requests yet</p>
          <p className="text-gray-300 text-xs mt-2">New requests will appear here automatically</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map(app => {
            const routeParts = parseRoute(app.route);
            const isExpanded = expanded === app._id;
            const serviceColor = app.car?.toLowerCase().includes("airport") ? "bg-blue-100 text-blue-700" :
              app.car?.toLowerCase().includes("delegation") ? "bg-purple-100 text-purple-700" :
              app.car?.toLowerCase().includes("transfer") ? "bg-green-100 text-green-700" :
              "bg-orange-100 text-orange-700";

            return (
              <div key={app._id} className="bg-white rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Main row */}
                <div className="p-5 flex items-start gap-4">
                  {/* Date badge */}
                  <div className="flex-shrink-0 text-center bg-navy/5 rounded-xl px-3 py-2 min-w-[60px]">
                    <div className="text-xs font-bold text-navy">
                      {format(new Date(app.createdAt), "MMM")}
                    </div>
                    <div className="text-2xl font-black text-navy leading-tight">
                      {format(new Date(app.createdAt), "dd")}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {format(new Date(app.createdAt), "HH:mm")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="font-black text-navy text-lg leading-tight">{app.name}</div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <a href={`mailto:${app.email}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gltOrange transition-colors">
                            <Mail size={11} /> {app.email}
                          </a>
                          {app.phone && (
                            <a href={`tel:${app.phone}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gltOrange transition-colors">
                              <Phone size={11} /> {app.phone}
                            </a>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex-shrink-0 ${serviceColor}`}>
                        {app.car}
                      </span>
                    </div>

                    {/* Quick info row */}
                    <div className="mt-3 flex flex-wrap gap-3">
                      {routeParts["Organization"] && (
                        <span className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-600 font-semibold">
                          🏢 {routeParts["Organization"]}
                        </span>
                      )}
                      {routeParts["Region/City"] && (
                        <span className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-600 font-semibold">
                          📍 {routeParts["Region/City"]}
                        </span>
                      )}
                      {routeParts["Passengers"] && (
                        <span className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-600 font-semibold">
                          👥 {routeParts["Passengers"]} pax
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`https://wa.me/${app.phone?.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(app.name)}%2C%20regarding%20your%20GoLuxTrip%20request...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"
                      title="WhatsApp"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : app._id)}
                      className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-navy hover:text-white transition-all"
                      title="Details"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-line bg-gray-50 p-5 grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs font-black text-navy uppercase tracking-widest mb-1">📅 Dates</div>
                      <div className="text-gray-600">{app.dates || "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs font-black text-navy uppercase tracking-widest mb-1">🗺 Route / Info</div>
                      <div className="text-gray-600">{app.route || "—"}</div>
                    </div>
                    {app.message && app.message !== "No additional info" && (
                      <div className="sm:col-span-2">
                        <div className="text-xs font-black text-navy uppercase tracking-widest mb-1">📝 Notes</div>
                        <div className="text-gray-600">{app.message}</div>
                      </div>
                    )}
                    <div className="sm:col-span-2 flex gap-3 pt-2">
                      <a
                        href={`mailto:${app.email}?subject=Re: Your GoLuxTrip Transportation Request`}
                        className="inline-flex items-center gap-2 bg-navy text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-gltOrange transition-all"
                      >
                        <Mail size={12} /> Reply by Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
