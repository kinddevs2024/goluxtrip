import { motion } from "framer-motion";
import { Briefcase, Building, MapPin } from "lucide-react";

export default function Projects() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="relative h-[40vh] bg-ink flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=2000" alt="Projects" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-6">
            Long-term Projects
          </motion.h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1541888087625-f8148faa5c17?auto=format&fit=crop&q=80&w=800" alt="Construction site" className="rounded-3xl shadow-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-navy uppercase mb-8">Corporate Logistics</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We provide dedicated fleet and driver leasing for long-term construction, mining, and corporate projects. Focus on your core business while we handle your daily logistics.
            </p>
            <ul className="space-y-6">
              {[
                { icon: Briefcase, title: "Monthly Leasing", desc: "Cost-effective long-term contracts tailored to your project timeline." },
                { icon: Building, title: "Corporate Transport", desc: "Daily staff shuttles and executive transport." },
                { icon: MapPin, title: "On-site Fleet Management", desc: "Dedicated managers to coordinate logistics directly at your facility." }
              ].map((f, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
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
        </div>
      </div>
    </div>
  );
}
