import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function About() {
  // English only — no i18n needed here
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
      {/* Our Mission text */}
      <div className="max-w-4xl mx-auto px-5 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black text-navy uppercase mb-8 text-center tracking-wider"
        >
          Our Mission
        </motion.h2>
        <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed text-justify">
          {textData ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {textData.text_en?.split('\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>
          ) : (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gltOrange" />
            </div>
          )}
        </div>
      </div>

      {/* Achievement Bar — full width dark navy */}
      <div className="bg-navy">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {(stats.length > 0 ? stats : [
              { value: "245+", label: "Missions Completed", icon: "🎯" },
              { value: "45",   label: "Vehicles in Fleet",  icon: "🚗" },
              { value: "14",   label: "Regions Covered",    icon: "📍" },
              { value: "24/7", label: "Active Missions", icon: "🕐" },
            ]).map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center justify-center py-12 px-6 text-center hover:bg-white/5 transition-colors duration-300"
              >
                <span className="text-3xl mb-3 leading-none">{item.icon}</span>
                <div className="text-4xl md:text-5xl font-black text-gltOrange leading-none mb-2 tabular-nums">
                  {item.value}
                </div>
                <div className="text-xs font-black text-white/60 uppercase tracking-[0.2em]">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div/>
    </div>
  );
}
