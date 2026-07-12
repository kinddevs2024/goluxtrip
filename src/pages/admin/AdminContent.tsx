import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, Image as ImageIcon } from "lucide-react";

export default function AdminContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    text_en: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("https://goluxtrip-backend.vercel.app/api/content");
        const data = await res.json();
        const aboutData = data.find((c: any) => c.key === "about_us");
        if (aboutData) {
          setContent({
            text_en: aboutData.text_en || "",
            image: aboutData.image || ""
          });
          if (aboutData.image) setImagePreview(aboutData.image);
        }
      } catch {
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
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify({
          key: "about_us",
          text_en: content.text_en,
          text_ru: content.text_en, // mirror to ru/uz
          text_uz: content.text_en,
          image: content.image
        })
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Content saved successfully ✓");
    } catch {
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gltOrange" />
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-black text-navy uppercase tracking-widest mb-8">Content Management</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-line p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-line">
          <div className="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center">
            <Save size={16} className="text-navy" />
          </div>
          <div>
            <h2 className="font-black text-navy text-lg">About Us Section</h2>
            <p className="text-xs text-gray-400">Text and background image shown on the About page</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Text */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
              About Us Text
            </label>
            <textarea
              rows={6}
              className="w-full border border-line rounded-xl p-4 bg-gray-50 focus:bg-white focus:border-gltOrange outline-none transition-all text-sm leading-relaxed resize-none"
              placeholder="Write the About Us text in English..."
              value={content.text_en}
              onChange={e => setContent({ ...content, text_en: e.target.value })}
            />
            <p className="text-xs text-gray-400 mt-1">{content.text_en.length} characters</p>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
              About Page Background Image
            </label>

            {/* Preview */}
            {imagePreview ? (
              <div className="relative mb-4 rounded-xl overflow-hidden border border-line group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/50 px-4 py-2 rounded-full">
                    Click below to change
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    ✓ Image saved
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-4 border-2 border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-400">
                <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No image uploaded yet</p>
                <p className="text-xs mt-1">This will be shown as the About page hero background</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="w-full border border-line rounded-xl p-3 bg-gray-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gltOrange/10 file:text-gltOrange hover:file:bg-gltOrange/20 transition-all"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                  toast.error("Image must be smaller than 2MB");
                  return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  setContent({ ...content, image: result });
                  setImagePreview(result);
                };
                reader.readAsDataURL(file);
              }}
            />
            <p className="text-xs text-gray-400 mt-1">Max 2MB. JPG, PNG, WebP recommended. Optimal: 1920×600px</p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-gltOrange text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#c84211] transition-all shadow-lg shadow-gltOrange/20 disabled:opacity-50 hover:scale-[1.02]"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
