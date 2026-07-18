import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Trash2, UploadCloud } from "lucide-react";

type Partner = {
  _id: string;
  image: string;
};

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPartners = async () => {
    try {
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/partners");
      if (!res.ok) throw new Error("Failed to load partners");
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

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const loadToast = toast.loading("Uploading partner logo...");
      try {
        const res = await fetch("https://goluxtrip-backend.vercel.app/api/partners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          },
          body: JSON.stringify({ image: base64String })
        });
        if (!res.ok) throw new Error("Upload failed");
        toast.success("Partner uploaded", { id: loadToast });
        fetchPartners();
      } catch (err) {
        toast.error("Failed to upload partner", { id: loadToast });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this partner logo?")) return;
    try {
      const res = await fetch(`https://goluxtrip-backend.vercel.app/api/partners?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      if (!res.ok) throw new Error("Delete failed");
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
      </div>

      {/* Drag & Drop Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragging ? "border-gltOrange bg-gltOrange/5" : "border-gray-300 hover:border-navy hover:bg-gray-50"}`}
      >
        <UploadCloud className={`mx-auto mb-4 ${isDragging ? "text-gltOrange" : "text-gray-400"}`} size={48} />
        <h3 className="text-lg font-bold mb-2">Drop your partner logo here</h3>
        <p className="text-gray-500 mb-4">Or click to browse from your computer</p>
        <p className="text-xs text-gray-400">Supports PNG, SVG, JPG. Transparent background recommended.</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {partners.map(partner => (
          <div key={partner._id} className="bg-white rounded-xl border border-line overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="p-6 bg-gray-50 h-32 flex items-center justify-center">
              <img src={partner.image} alt="Partner Logo" className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(partner._id);
                }}
                className="bg-white text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg shadow-sm border border-line transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
