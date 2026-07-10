import { motion } from "framer-motion";
import { Globe, HeartHandshake, Zap } from "lucide-react";

export default function IndustrySolutions() {
  return (
    <div className="pt-24 min-h-screen bg-[#f7f8f6]">
      <div className="relative h-[40vh] bg-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000" alt="Industry" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-6">
            Travel Industry
          </motion.h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-navy uppercase mb-8">B2B Partnerships</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We act as the trusted ground transportation arm for travel agencies, tour operators, DMCs, and luxury hotels. Let us provide your clients with an extension of your own high standards.
            </p>
            <ul className="space-y-6">
              {[
                { icon: HeartHandshake, title: "White-Label Service", desc: "We represent your brand with professionalism." },
                { icon: Globe, title: "Nationwide Tours", desc: "Reliable transport for multi-city cultural and historical tours." },
                { icon: Zap, title: "Priority Booking", desc: "Instant confirmations and flexible terms for our B2B partners." }
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
            <img src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=800" alt="Tourism" className="rounded-3xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
