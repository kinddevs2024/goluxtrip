import { motion } from "framer-motion";
import { Plane, Clock, CheckCircle } from "lucide-react";

export default function Transfers() {
  return (
    <div className="pt-24 min-h-screen bg-[#f7f8f6]">
      <div className="relative h-[40vh] bg-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000" alt="Transfers" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-6">
            Airport Transfers
          </motion.h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-navy uppercase mb-8">Punctual & Seamless</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Start and end your journey in comfort. We monitor your flight status in real-time, ensuring our professional drivers are there waiting for you, even if your flight is delayed.
            </p>
            <ul className="space-y-6">
              {[
                { icon: Plane, title: "Flight Monitoring", desc: "We track your flight to guarantee on-time pickup." },
                { icon: CheckCircle, title: "Meet & Greet", desc: "Drivers meet you with a personalized name sign." },
                { icon: Clock, title: "Free Wait Time", desc: "Complimentary waiting time included for all airport pickups." }
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
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" alt="Chauffeur" className="rounded-3xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
