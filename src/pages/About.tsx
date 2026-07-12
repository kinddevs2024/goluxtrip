import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function About() {
  const { i18n } = useTranslation();
  const [textData, setTextData] = useState<any>(null);
  const [image, setImage] = useState("");
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://goluxtrip-backend.vercel.app/api/content")
      .then(res => res.json())
      .then(data => {
        const aboutData = data.find((c: any) => c.key === "about_us");
        if (aboutData) {
          setTextData(aboutData);
          if (aboutData.image) setImage(aboutData.image);
        }
      })
      .catch(() => toast.error("Failed to load content"));

    fetch("https://goluxtrip-backend.vercel.app/api/stats")
      .then(res => res.json())
      .then(data => setStats(Array.isArray(data) ? data : []))
      .catch(() => console.error("Failed to load stats"));
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="relative h-[60vh] bg-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"} alt="About Us" className="w-full h-full object-cover opacity-25 mix-blend-luminosity" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-navy" />
        {/* Left orange accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gltOrange via-gltOrange/50 to-transparent" />
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="block w-10 h-[2px] bg-gltOrange" />
              <span className="text-gltOrange font-black text-xs tracking-[0.3em] uppercase">GoLuxTrip</span>
              <span className="block w-10 h-[2px] bg-gltOrange" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-8">
              Where the Road Ends,<br />
              <span className="text-gltOrange">We Continue.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              Reliable Transportation &amp; Field Logistics for International Organizations,
              Development Projects, Official Delegations and Corporate Clients across Uzbekistan.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-5 py-24">
        <div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-black text-navy uppercase mb-8 text-center">Our Mission</motion.h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed text-justify mb-16">
            {textData ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                {(i18n.language === 'ru' ? textData.text_ru : i18n.language === 'uz' ? textData.text_uz : textData.text_en)?.split('\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </motion.div>
            ) : (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gltOrange"></div></div>
            )}
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {stats.length > 0 ? stats.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="text-4xl font-black text-gltOrange mb-2">{item.value}</div>
                <div className="text-sm font-bold text-navy uppercase tracking-widest">{item.label}</div>
              </motion.div>
            )) : [
              { stat: "10+", label: "Years Experience" },
              { stat: "150+", label: "Missions Completed" },
              { stat: "100%", label: "Client Satisfaction" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 opacity-50">
                <div className="text-4xl font-black text-gltOrange mb-2">{item.stat}</div>
                <div className="text-sm font-bold text-navy uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
