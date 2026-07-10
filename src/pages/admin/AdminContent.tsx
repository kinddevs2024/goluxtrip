import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

export default function AdminContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    text_en: "",
    text_ru: "",
    text_uz: "",
    image: ""
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("https://goluxtrip-backend.vercel.app/api/content");
        const data = await res.json();
        const aboutData = data.find((c: any) => c.key === "about_us");
        if (aboutData) {
          setContent({
            text_en: aboutData.text_en || "",
            text_ru: aboutData.text_ru || "",
            text_uz: aboutData.text_uz || "",
            image: aboutData.image || ""
          });
        }
      } catch (err) {
        toast.error("Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("https://goluxtrip-backend.vercel.app/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify({
          key: "about_us",
          ...content
        })
      });
      toast.success("Content saved successfully");
    } catch (err) {
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-navy uppercase tracking-widest mb-8">Content Management</h1>
      
      <div className="bg-white rounded-xl shadow-lg border border-line p-8 max-w-4xl">
        <h2 className="text-xl font-bold mb-6 text-navy border-b border-line pb-4">About Us Section</h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">English Text</label>
            <textarea 
              rows={4}
              className="w-full border border-line rounded-lg p-4 bg-gray-50 focus:bg-white focus:border-gltOrange outline-none transition-all"
              value={content.text_en}
              onChange={e => setContent({...content, text_en: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Russian Text</label>
            <textarea 
              rows={4}
              className="w-full border border-line rounded-lg p-4 bg-gray-50 focus:bg-white focus:border-gltOrange outline-none transition-all"
              value={content.text_ru}
              onChange={e => setContent({...content, text_ru: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Uzbek Text</label>
            <textarea 
              rows={4}
              className="w-full border border-line rounded-lg p-4 bg-gray-50 focus:bg-white focus:border-gltOrange outline-none transition-all"
              value={content.text_uz}
              onChange={e => setContent({...content, text_uz: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">About Us Image (Optional)</label>
            {content.image && <img src={content.image} alt="Preview" className="h-32 mb-4 rounded-lg object-cover" />}
            <input 
              type="file" 
              accept="image/*"
              className="w-full border border-line rounded-lg p-3 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gltOrange/10 file:text-gltOrange hover:file:bg-gltOrange/20 transition-all"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setContent({...content, image: reader.result as string});
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="bg-gltOrange text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#c84211] hover:scale-105 transition-all shadow-lg shadow-gltOrange/20 disabled:opacity-50"
          >
            <Save size={20} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
