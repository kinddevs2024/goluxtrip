import { motion } from "framer-motion";
import { Users, Star, Shield } from "lucide-react";

export default function Delegations() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="relative h-[40vh] bg-ink flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=2000" alt="Delegations" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-5">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-6"
          >
            Delegations & Events
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" alt="VIP Event" className="rounded-3xl shadow-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
            <h2 className="text-3xl font-black text-navy uppercase mb-8">VIP Level Service</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We provide impeccable, highly coordinated transportation for official delegations, VIP guests, international conferences, and large-scale corporate events. Our service is discreet, punctual, and flexible to last-minute schedule changes.
            </p>
            <ul className="space-y-6">
              {[
                { icon: Star, title: "Premium Vehicles", desc: "Latest model luxury sedans, minivans, and buses." },
                { icon: Users, title: "Convoy Management", desc: "Expert coordination of multi-vehicle convoys." },
                { icon: Shield, title: "Discreet & Secure", desc: "Professional, vetted drivers trained in VIP protocol." }
              ].map((feature, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
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
        </div>
      </div>
    </div>
  );
}
