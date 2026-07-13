import { motion } from "framer-motion";
import { ShieldCheck, Map, Clock } from "lucide-react";

export default function FieldMissions() {
  return (
    <div className="pt-24 min-h-screen bg-[#f7f8f6]">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000" alt="Field Missions" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-5">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-6"
          >
            Field Missions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            Transportation for projects in remote and challenging areas across Uzbekistan.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-navy uppercase mb-8">We Go Further</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              International organizations, development projects, and NGOs require more than just a car; they need a reliable logistics partner. Our fleet of 4WD SUVs is specifically prepared for rough terrain, off-road conditions, and extreme climates in remote regions of Uzbekistan.
            </p>
            <ul className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Armored & Standard 4WDs", desc: "Top-tier vehicles maintained to the highest safety standards." },
                { icon: Map, title: "Remote Area Experts", desc: "Drivers with extensive experience navigating unpaved roads and harsh terrain." },
                { icon: Clock, title: "24/7 Active Missions", desc: "Constant communication and backup vehicle readiness." }
              ].map((feature, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center shrink-0">
                    <feature.icon className="text-gltOrange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy uppercase tracking-wide">{feature.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute inset-0 bg-gltOrange/20 blur-3xl transform rotate-12 rounded-[100px]" />
            <img src="https://images.unsplash.com/photo-1519003300449-424ad0405076?auto=format&fit=crop&q=80&w=800" alt="Offroad" className="relative rounded-3xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
