import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Car as CarIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type Car = {
  _id: string;
  name: string;
  seats: string;
  bags: string;
  drive: string;
  image: string;
  category?: string;
  year?: string;
  ac?: string;
  fuel?: string;
};

export default function Fleet() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://goluxtrip-backend.vercel.app/api/cars")
      .then(res => res.json())
      .then(data => setCars(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load fleet data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="block w-8 h-[2px] bg-gltOrange" />
            <span className="text-gltOrange font-black text-xs tracking-[0.25em] uppercase">Our Fleet</span>
            <span className="block w-8 h-[2px] bg-gltOrange" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy uppercase leading-tight mb-5">
            Built for the Road.<br />Ready for the Mission.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            A wide range of SUVs, 4WDs, Minivans and Buses for any mission and group size across Uzbekistan.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gltOrange" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-56 bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gltOrange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={car.image}
                    alt={car.name}
                    className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 relative z-10"
                  />
                  {car.category && (
                    <span className="absolute top-4 right-4 bg-navy text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {car.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-black text-xl text-navy uppercase tracking-wide leading-tight">{car.name}</h3>
                    {car.year && (
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg flex-shrink-0 ml-2">{car.year}</span>
                    )}
                  </div>

                  {/* Specs — all in one row */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600">
                      <Users className="text-gltOrange flex-shrink-0" size={14} />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600">
                      <Briefcase className="text-gltOrange flex-shrink-0" size={14} />
                      <span>{car.bags} Bags</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600">
                      <CarIcon className="text-gltOrange flex-shrink-0" size={14} />
                      <span>{car.drive}</span>
                    </div>
                    {car.ac && (
                      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600">
                        <span className="text-gltOrange text-xs">❄</span>
                        <span>{car.ac}</span>
                      </div>
                    )}
                    {car.fuel && (
                      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600">
                        <span className="text-gltOrange text-xs">⛽</span>
                        <span>{car.fuel}</span>
                      </div>
                    )}
                  </div>

                  {/* Request button — full width, single row */}
                  <Link
                    to={`/contact?car=${encodeURIComponent(car.name)}&service=Transfer`}
                    className="flex items-center justify-center gap-2 w-full bg-navy text-white font-bold tracking-widest uppercase py-3.5 rounded-xl hover:bg-gltOrange transition-all duration-300 group/btn text-sm"
                  >
                    Request Vehicle
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
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
