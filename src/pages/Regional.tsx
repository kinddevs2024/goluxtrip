import { motion } from "framer-motion";
import { Route, Train, ShieldCheck } from "lucide-react";

export default function Regional() {
  return (
    <div className="pt-24 min-h-screen bg-[#f7f8f6]">
      <div className="relative h-[40vh] bg-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=2000" alt="Regional Travel" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-6">
            Regional Travel
          </motion.h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-navy uppercase mb-8">Intercity Transportation</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Seamlessly connect between cities and regions with our premium fleet. Whether it's a corporate transfer or a multi-day regional tour, we ensure safety, comfort, and punctuality.
            </p>
            <ul className="space-y-6">
              {[
                { icon: Route, title: "Long-Distance Routes", desc: "Reliable travel across extensive regional networks." },
                { icon: Train, title: "Station Transfers", desc: "Connecting you smoothly from airports and railway stations to any city." },
                { icon: ShieldCheck, title: "Safe & Secure", desc: "Experienced drivers trained for highway and long-distance travel." }
              ].map((f, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center shrink-0">
                    <f.icon className="text-gltOrange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy uppercase tracking-wide">{f.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1506509635745-d86b03657753?auto=format&fit=crop&q=80&w=800" alt="Regional Travel" className="rounded-3xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
