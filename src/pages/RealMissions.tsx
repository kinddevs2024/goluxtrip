import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";

type RealMission = {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

export default function RealMissions() {
  const [missions, setMissions] = useState<RealMission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://goluxtrip-backend.vercel.app/api/real-missions")
      .then(res => res.json())
      .then(data => setMissions(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load real missions"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-[#f7f8f6]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gltOrange font-bold tracking-widest uppercase text-sm mb-4 block">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy uppercase leading-tight">
            Real Missions
          </h1>
          <p className="mt-6 text-gray-500 text-lg">
            A glimpse into the successful operations and deployments we've executed across Uzbekistan.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gltOrange"></div></div>
        ) : missions.length === 0 ? (
          <div className="text-center text-gray-400 p-10">No missions published yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={mission.image} alt={mission.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-gltOrange font-semibold text-sm mb-3">
                    <Calendar size={16} /> {mission.date}
                  </div>
                  <h3 className="font-black text-2xl text-navy leading-tight mb-4">{mission.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {mission.description}
                  </p>
                  <Link to={`/real-missions/${mission._id}`} className="mt-auto inline-block border-2 border-navy text-navy font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-lg text-center hover:bg-navy hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
