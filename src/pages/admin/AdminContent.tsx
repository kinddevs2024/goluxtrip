import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, Image as ImageIcon } from "lucide-react";

const defaultHeroServices = [
  { id: "suvs", title: "SUVs & 4WD Fleet", desc: "Built for any terrain", detail: "Our modern fleet of SUVs and 4WD vehicles is equipped for any terrain - from city roads to remote mountain tracks.", bullets: "Toyota Land Cruiser 200 & 300\nFord Expedition & Explorer\nLexus LX & GX series\nAll vehicles regularly serviced\nGPS tracking enabled" },
  { id: "remote", title: "Remote Area Experts", desc: "We go further", detail: "We operate in the most remote and challenging regions of Uzbekistan, including field sites inaccessible to standard transportation.", bullets: "Karakalpakstan & Aral region\nFergana Valley & mountain areas\nDesert and off-road routes\nField camp logistics support\nLocal knowledge & experience" },
  { id: "drivers", title: "Experienced Drivers", desc: "Professional & reliable", detail: "All our drivers are professionally trained, vetted, and experienced in working with international organizations and diplomatic clients.", bullets: "English-speaking drivers available\nSecurity & defensive driving trained\nBackground-checked & certified\nFamiliar with UN & NGO protocols\nAvailable 24/7 on request" },
  { id: "ops", title: "24/7 Operations", desc: "Always supportive", detail: "GoLuxTrip operates around the clock. Whether it is an early morning airport transfer or an emergency field evacuation - we are always ready.", bullets: "24/7 dispatch center\nEmergency response available\nSame-day booking accepted\nReal-time driver communication\nOperations manager on call" },
  { id: "coverage", title: "Nationwide Coverage", desc: "All regions of Uzbekistan", detail: "We cover all regions across Uzbekistan and neighboring countries, supporting international missions and corporate travel seamlessly.", bullets: "All 14 regions of Uzbekistan\nTashkent city & airport transfers\nCross-border trips\nMulti-city itinerary planning\nDedicated route coordinators" },
];

export default function AdminContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    text_en: "",
    image: ""
  });
  const [heroServices, setHeroServices] = useState(defaultHeroServices);
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
        const heroServicesData = data.find((c: any) => c.key === "hero_services");
        if (heroServicesData?.text_en) {
          const parsed = JSON.parse(heroServicesData.text_en);
          if (Array.isArray(parsed)) {
            setHeroServices(defaultHeroServices.map(item => {
              const saved = parsed.find((service: any) => service.id === item.id);
              return saved ? { ...item, ...saved, bullets: Array.isArray(saved.bullets) ? saved.bullets.join("\n") : saved.bullets || item.bullets } : item;
            }));
          }
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
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      };
      const heroServicesPayload = heroServices.map(service => ({
        ...service,
        bullets: service.bullets.split("\n").map(item => item.trim()).filter(Boolean),
      }));
      const res = await fetch("https://goluxtrip-backend.vercel.app/api/content", {
        method: "POST",
        headers,
        body: JSON.stringify({
          key: "about_us",
          text_en: content.text_en,
          text_ru: content.text_en, // mirror to ru/uz
          text_uz: content.text_en,
          image: content.image
        })
      });
      if (!res.ok) throw new Error("Save failed");
      const servicesRes = await fetch("https://goluxtrip-backend.vercel.app/api/content", {
        method: "POST",
        headers,
        body: JSON.stringify({
          key: "hero_services",
          text_en: JSON.stringify(heroServicesPayload),
          text_ru: JSON.stringify(heroServicesPayload),
          text_uz: JSON.stringify(heroServicesPayload)
        })
      });
      if (!servicesRes.ok) throw new Error("Save failed");
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

      <div className="bg-white rounded-2xl shadow-lg border border-line p-8 max-w-5xl mt-8">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-line">
          <div className="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center">
            <Save size={16} className="text-navy" />
          </div>
          <div>
            <h2 className="font-black text-navy text-lg">Hero Service Popups</h2>
            <p className="text-xs text-gray-400">Editable text for the service buttons shown over the hero image</p>
          </div>
        </div>

        <div className="space-y-6">
          {heroServices.map((service, index) => (
            <div key={service.id} className="rounded-xl border border-line bg-gray-50 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Title</label>
                  <input
                    className="w-full border border-line rounded-xl p-3 bg-white focus:border-gltOrange outline-none text-sm font-semibold"
                    value={service.title}
                    onChange={e => setHeroServices(items => items.map((item, i) => i === index ? { ...item, title: e.target.value } : item))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Short Text</label>
                  <input
                    className="w-full border border-line rounded-xl p-3 bg-white focus:border-gltOrange outline-none text-sm font-semibold"
                    value={service.desc}
                    onChange={e => setHeroServices(items => items.map((item, i) => i === index ? { ...item, desc: e.target.value } : item))}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Popup Detail</label>
                <textarea
                  rows={3}
                  className="w-full border border-line rounded-xl p-4 bg-white focus:border-gltOrange outline-none transition-all text-sm leading-relaxed resize-none"
                  value={service.detail}
                  onChange={e => setHeroServices(items => items.map((item, i) => i === index ? { ...item, detail: e.target.value } : item))}
                />
              </div>
              <div className="mt-4">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Bullets - one per line</label>
                <textarea
                  rows={5}
                  className="w-full border border-line rounded-xl p-4 bg-white focus:border-gltOrange outline-none transition-all text-sm leading-relaxed resize-none"
                  value={service.bullets}
                  onChange={e => setHeroServices(items => items.map((item, i) => i === index ? { ...item, bullets: e.target.value } : item))}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={(e) => handleSave(e as unknown as React.FormEvent)}
          className="mt-6 bg-gltOrange text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#c84211] transition-all shadow-lg shadow-gltOrange/20 disabled:opacity-50 hover:scale-[1.02]"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
