import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Car as CarIcon } from "lucide-react";
import toast from "react-hot-toast";

type Car = {
  _id: string;
  name: string;
  seats: string;
  bags: string;
  drive: string;
  image: string;
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
          <span className="text-gltOrange font-bold tracking-widest uppercase text-sm mb-4 block">Our Fleet</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy uppercase leading-tight">
            Built for the road. <br /> Ready for the mission.
          </h1>
          <p className="mt-6 text-gray-500 text-lg">
            A wide range of SUVs, 4WDs, Minivans and Buses for any mission and group size across Uzbekistan.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gltOrange"></div></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gltOrange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={car.image} alt={car.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 relative z-10" />
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl text-navy uppercase tracking-wide mb-6">{car.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-600 font-semibold bg-gray-50 p-3 rounded-xl">
                      <Users className="text-gltOrange" size={20} /> {car.seats} Seats
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 font-semibold bg-gray-50 p-3 rounded-xl">
                      <Briefcase className="text-gltOrange" size={20} /> {car.bags} Bags
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 font-semibold bg-gray-50 p-3 rounded-xl col-span-2">
                      <CarIcon className="text-gltOrange" size={20} /> {car.drive}
                    </div>
                  </div>

                  <a href="/contact" className="block text-center w-full bg-navy text-white font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-gltOrange transition-colors">
                    Request Vehicle
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
