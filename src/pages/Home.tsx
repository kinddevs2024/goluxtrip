import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  ArrowRight, ShieldCheck, Map, Truck, Globe, Clock, 
  Users, Briefcase, ChevronDown, CheckCircle, X
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ApplicationForm = {
  name: string;
  email: string;
  service: string;
  dates: string;
  route: string;
  passengers: string;
  organization: string;
  message?: string;
};

// Reusable animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  
  const [refStats, inViewStats] = useInView({ triggerOnce: false, threshold: 0.5 });
  const [refProjects, inViewProjects] = useInView({ triggerOnce: true, threshold: 0.2 });

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("application.errors.name", { defaultValue: "Name is required" })),
        email: z.string().email(t("application.errors.email", { defaultValue: "Valid email is required" })),
        service: z.string().min(2, t("application.errors.service", { defaultValue: "Service is required" })),
        dates: z.string().min(2, t("application.errors.dates", { defaultValue: "Dates are required" })),
        route: z.string().min(2, t("application.errors.route", { defaultValue: "Route is required" })),
        passengers: z.string().min(1, t("application.errors.passengers", { defaultValue: "Passengers required" })),
        organization: z.string().min(2, t("application.errors.organization", { defaultValue: "Organization is required" })),
        message: z.string().max(1000).optional()
      }),
    [t]
  );

  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<ApplicationForm>({
    resolver: zodResolver(schema)
  });

  const [stats, setStats] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [partnersData, setPartnersData] = useState<any[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<null | { icon: any; title: string; desc: string; detail: string; bullets: string[] }>(null);
  useEffect(() => {
    fetch("https://goluxtrip-backend.vercel.app/api/stats")
      .then(res => res.json())
      .then(data => setStats(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
      
    fetch("https://goluxtrip-backend.vercel.app/api/cars")
      .then(res => res.json())
      .then(data => setCars(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));

    fetch("https://goluxtrip-backend.vercel.app/api/real-missions")
      .then(res => res.json())
      .then(data => setMissions(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));

    fetch("https://goluxtrip-backend.vercel.app/api/partners")
      .then(res => res.json())
      .then(data => setPartnersData(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  async function onSubmit(values: ApplicationForm) {
    const payload = { ...values, phone: "N/A", car: values.service, route: `${values.organization} | Pax: ${values.passengers} | ${values.route}` };
    try {
      const response = await fetch("https://goluxtrip-backend.vercel.app/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Could not send the request.");
      toast.success(t("application.success"));
      reset();
    } catch (err) {
      toast.error("Failed to send request. Please try again.");
    }
  }

  const solutions = t("whatWeDo.solutions", { returnObjects: true }) as {id: string, title: string, desc: string, img: string}[];
  const tCars = t("fleet.cars", { returnObjects: true }) as {id: string, name: string, seats: string, bags: string, drive: string, ac?: string, fuel?: string, year?: string, category?: string, image: string}[];
  const partners = t("partners.list", { returnObjects: true }) as string[];

  return (
    <div className="overflow-hidden bg-white">
      {/* 1. HERO SECTION (Parallax) — features bar pinned to bottom */}
      <section className="relative h-screen min-h-[640px] w-full bg-navy overflow-hidden flex flex-col">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity scale-110" 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src="/hero-car.jpg" alt="Hero" className="w-full h-full object-cover object-[center_68%]" />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
        {/* bottom fade for seamless banner blend */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy to-transparent" />
        
        {/* Hero text — centered vertically, pushes up a bit to leave room for banner */}
        <div className="relative flex-1 mx-auto max-w-[1400px] w-full flex flex-col justify-center px-5 lg:px-8 pb-28">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-3xl"
          >
            {/* Decorative label */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-7">
              <span className="block w-8 h-[2px] bg-gltOrange" />
              <span className="text-gltOrange font-bold text-xs tracking-[0.25em] uppercase">GoLuxTrip</span>
            </motion.div>

            <motion.h1 
              variants={fadeUp} 
              className={`font-black text-white leading-[1.02] tracking-tight ${i18n.language === "ru" ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]"}`}
            >
              <span className="block">{t("hero.title").split("\n")[0]}</span>
              {t("hero.title").split("\n").slice(1).map((line: string, i: number) => (
                <span key={i} className="block">
                  {line.split(" ").map((word: string, wi: number) => (
                    wi === line.split(" ").length - 1
                      ? <span key={wi} className="text-gltOrange">{word}</span>
                      : <span key={wi}>{word} </span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 my-7">
              <div className="h-[1px] w-12 bg-gltOrange/60" />
              <div className="h-[1px] flex-1 max-w-[180px] bg-white/10" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-gray-300 font-medium leading-relaxed max-w-xl" style={{fontSize: '0.95rem', letterSpacing: '0.01em'}}>
              {t("hero.text").split("\n").map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="group bg-gltOrange text-white px-6 py-3 rounded font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#c84211] hover:scale-105 transition-all duration-300 shadow-lg shadow-gltOrange/30">
                {t("hero.cta")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link to="/about" className="border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-navy hover:scale-105 transition-all duration-300">
                {t("hero.secondary")}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── FEATURES BANNER pinned to bottom of hero (desktop) ── */}
        <div className="relative z-10 w-full border-t border-white/10 bg-navy/95 backdrop-blur-sm hidden lg:block">
          <div className="mx-auto max-w-[1400px] px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-5 gap-4 text-white text-sm"
            >
              {([
                { icon: Truck, title: t("featuresBanner.suvs"), desc: t("featuresBanner.suvsDesc"),
                  detail: "Our modern fleet of SUVs and 4WD vehicles is equipped for any terrain — from city roads to remote mountain tracks.",
                  bullets: ["Toyota Land Cruiser 200 & 300", "Ford Expedition & Explorer", "Lexus LX & GX series", "All vehicles regularly serviced", "GPS tracking enabled"] },
                { icon: Map, title: t("featuresBanner.remote"), desc: t("featuresBanner.remoteDesc"),
                  detail: "We operate in the most remote and challenging regions of Uzbekistan, including field sites inaccessible to standard transportation.",
                  bullets: ["Karakalpakstan & Aral region", "Fergana Valley & mountain areas", "Desert and off-road routes", "Field camp logistics support", "Local knowledge & experience"] },
                { icon: Users, title: t("featuresBanner.drivers"), desc: t("featuresBanner.driversDesc"),
                  detail: "All our drivers are professionally trained, vetted, and experienced in working with international organizations and diplomatic clients.",
                  bullets: ["English-speaking drivers available", "Security & defensive driving trained", "Background-checked & certified", "Familiar with UN & NGO protocols", "Available 24/7 on request"] },
                { icon: Clock, title: t("featuresBanner.ops"), desc: t("featuresBanner.opsDesc"),
                  detail: "GoLuxTrip operates around the clock. Whether it's an early morning airport transfer or an emergency field evacuation — we are always ready.",
                  bullets: ["24/7 dispatch center", "Emergency response available", "Same-day booking accepted", "Real-time driver communication", "Operations manager on call"] },
                { icon: Globe, title: t("featuresBanner.coverage"), desc: t("featuresBanner.coverageDesc"),
                  detail: "We cover all regions across Uzbekistan and neighboring countries, supporting international missions and corporate travel seamlessly.",
                  bullets: ["All 14 regions of Uzbekistan", "Tashkent city & airport transfers", "Cross-border trips (Tajikistan, Kazakhstan)", "Multi-city itinerary planning", "Dedicated route coordinators"] },
              ] as { icon: any; title: string; desc: string; detail: string; bullets: string[] }[]).map((feature, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedFeature(feature)}
                  className="flex items-center gap-4 group cursor-pointer text-left w-full rounded-xl px-3 py-3 hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gltOrange transition-colors duration-300 flex-shrink-0">
                    <feature.icon size={22} className="text-gltOrange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-wide text-xs">{feature.title}</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">{feature.desc}</div>
                    <div className="text-gltOrange text-[10px] mt-1 font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile features — shown below hero, scrollable */}
        <div className="relative z-10 w-full border-t border-white/10 bg-navy lg:hidden">
          <div className="px-5 py-4 grid grid-cols-2 gap-4 text-white text-sm">
            {([
              { icon: Truck, title: t("featuresBanner.suvs"), desc: t("featuresBanner.suvsDesc") },
              { icon: Map, title: t("featuresBanner.remote"), desc: t("featuresBanner.remoteDesc") },
              { icon: Users, title: t("featuresBanner.drivers"), desc: t("featuresBanner.driversDesc") },
              { icon: Clock, title: t("featuresBanner.ops"), desc: t("featuresBanner.opsDesc") },
              { icon: Globe, title: t("featuresBanner.coverage"), desc: t("featuresBanner.coverageDesc") },
            ] as { icon: any; title: string; desc: string }[]).map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <f.icon size={18} className="text-gltOrange" />
                </div>
                <div>
                  <div className="font-bold uppercase tracking-wide text-[10px]">{f.title}</div>
                  <div className="text-gray-400 text-[10px] mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE DETAIL MODAL ── */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          onClick={() => setSelectedFeature(null)}
        >
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-navy px-8 py-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gltOrange/20 flex items-center justify-center flex-shrink-0">
                <selectedFeature.icon size={28} className="text-gltOrange" />
              </div>
              <div className="flex-1">
                <p className="text-gltOrange text-xs font-bold tracking-widest uppercase mb-1">GoLuxTrip Service</p>
                <h2 className="text-white font-black text-xl tracking-tight">{selectedFeature.title}</h2>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-white/50 hover:text-white transition ml-2"
              >
                <X size={22} />
              </button>
            </div>
            {/* Body */}
            <div className="px-8 py-6">
              <p className="text-gray-600 leading-relaxed text-sm mb-6">{selectedFeature.detail}</p>
              <ul className="space-y-3">
                {selectedFeature.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-gltOrange flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                onClick={() => setSelectedFeature(null)}
                className="mt-8 flex items-center justify-center gap-2 w-full bg-gltOrange text-white font-bold text-sm uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#c84211] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gltOrange/30"
              >
                Request This Service <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 3. WHAT WE DO (SOLUTIONS GRID - 3D TILT) */}
      <section className="pt-14 pb-24 bg-lightbg relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h4 className="text-gltOrange font-bold text-sm tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-gltOrange"></span>
              {t("whatWeDo.kicker")}
              <span className="w-8 h-px bg-gltOrange"></span>
            </h4>
            <h2 className="text-4xl md:text-5xl font-black text-navy">{t("whatWeDo.title")}</h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, idx) => (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="h-full">
                  <div className="group flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-line">
                    <div className="h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <div className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg">
                        <Briefcase size={24} className="text-gltOrange" />
                      </div>
                      <img src={sol.img} alt={sol.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col bg-white z-20 relative">
                      <h3 className="font-bold text-navy text-xl uppercase tracking-wide mb-4 group-hover:text-gltOrange transition-colors">{sol.title}</h3>
                      <p className="text-sm text-asphalt mb-6 leading-relaxed flex-1">{sol.desc}</p>
                      <Link
                        to={`/contact?service=${encodeURIComponent(
                          sol.id === 'field-missions' ? 'Field Mission' :
                          sol.id === 'delegations' ? 'Delegation' :
                          sol.id === 'transfers' ? 'Transfer' :
                          sol.id === 'regional' ? 'Regional Travel' :
                          sol.id === 'day-trips' ? 'Day Trip' :
                          sol.id === 'industry' ? 'Industry Solution' : sol.title
                        )}`}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy group-hover:text-gltOrange transition-colors"
                      >
                        More Info <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR FLEET (3D SWIPER CAROUSEL) */}
      <section className="py-24 bg-navy relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-navy to-navy" />
         
         <div className="mx-auto max-w-[1400px] px-5 lg:px-8 flex flex-col xl:flex-row gap-16 relative z-10 items-center">
            
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="xl:w-[400px] shrink-0 text-white flex flex-col justify-center text-center xl:text-left"
            >
               <h4 className="text-gltOrange font-bold text-sm tracking-[0.2em] uppercase mb-4">{t("fleet.kicker")}</h4>
               <h2 className="text-4xl md:text-5xl font-black mb-6 whitespace-pre-line leading-tight">{t("fleet.title")}</h2>
               <p className="text-gray-400 mb-10 whitespace-pre-line text-base leading-relaxed max-w-lg mx-auto xl:mx-0">{t("fleet.text")}</p>
               <Link to="/fleet" className="bg-gltOrange text-white px-8 py-4 rounded font-bold text-sm tracking-widest uppercase inline-flex items-center justify-center gap-2 hover:bg-[#c84211] transition-all hover:scale-105 shadow-lg shadow-gltOrange/20 w-fit mx-auto xl:mx-0">
                  {t("fleet.viewAll")} <ArrowRight size={18} />
               </Link>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="flex-1 w-full max-w-[100vw] xl:max-w-none"
            >
               <Swiper
                 effect={"coverflow"}
                 grabCursor={true}
                 centeredSlides={true}
                 slidesPerView={"auto"}
                 coverflowEffect={{
                   rotate: 0,
                   stretch: 0,
                   depth: 100,
                   modifier: 2.5,
                   slideShadows: false,
                 }}
                 autoplay={{ delay: 3000, disableOnInteraction: false }}
                 loop={true}
                 modules={[EffectCoverflow, Autoplay, Pagination]}
                 className="w-full py-10"
               >
                 {(cars.length > 0 ? cars : tCars).map((car, i) => (
                    <SwiperSlide key={i} className="w-[300px] sm:w-[340px]">
                      <div className="rounded-2xl overflow-hidden shadow-2xl group bg-[#0a1f35] border border-white/10 flex flex-col">
                        {/* Image */}
                        <div className="relative h-52 bg-gradient-to-br from-navy via-[#0d2540] to-[#061525] flex items-center justify-center p-5 overflow-hidden">
                          {/* Category badge */}
                          {(car as any).category && (
                            <span className="absolute top-3 left-3 bg-gltOrange/20 text-gltOrange text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-gltOrange/30">
                              {(car as any).category}
                            </span>
                          )}
                          {/* Year badge */}
                          {(car as any).year && (
                            <span className="absolute top-3 right-3 bg-white/5 text-gray-300 text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-full border border-white/10">
                              {(car as any).year}
                            </span>
                          )}
                          <img
                            src={car.image}
                            alt={car.name}
                            className="max-h-full max-w-full object-contain mix-blend-luminosity drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                          />
                        </div>

                        {/* Card content */}
                        <div className="p-5 flex flex-col gap-4">
                          {/* Name */}
                          <h3 className="font-black text-white text-base uppercase tracking-wider leading-tight">{car.name}</h3>

                          {/* Divider */}
                          <div className="h-px w-full bg-white/10" />

                          {/* Primary specs grid */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center gap-1 border border-white/5">
                              <Users size={15} className="text-gltOrange" />
                              <span className="text-white font-black text-lg leading-none">{car.seats}</span>
                              <span className="text-gray-500 text-[9px] uppercase tracking-wide font-bold">Seats</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center gap-1 border border-white/5">
                              <Briefcase size={15} className="text-gltOrange" />
                              <span className="text-white font-black text-lg leading-none">{car.bags}</span>
                              <span className="text-gray-500 text-[9px] uppercase tracking-wide font-bold">Bags</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center gap-1 border border-white/5">
                              <CheckCircle size={15} className="text-gltOrange" />
                              <span className="text-white font-black text-sm leading-none text-center">{car.drive}</span>
                              <span className="text-gray-500 text-[9px] uppercase tracking-wide font-bold">Drive</span>
                            </div>
                          </div>

                          {/* Secondary specs — fuel, ac */}
                          <div className="flex gap-2">
                            {(car as any).fuel && (
                              <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                                <Truck size={12} className="text-gltOrange flex-shrink-0" />
                                <div>
                                  <div className="text-[9px] text-gray-500 uppercase tracking-wide font-bold">Fuel</div>
                                  <div className="text-white text-xs font-bold">{(car as any).fuel}</div>
                                </div>
                              </div>
                            )}
                            {(car as any).ac && (
                              <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                                <Globe size={12} className="text-gltOrange flex-shrink-0" />
                                <div>
                                  <div className="text-[9px] text-gray-500 uppercase tracking-wide font-bold">A/C</div>
                                  <div className="text-white text-xs font-bold">{(car as any).ac}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* CTA */}
                          <Link
                            to="/fleet"
                            className="mt-1 w-full flex items-center justify-center gap-2 bg-gltOrange text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-[#c84211] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gltOrange/20 group/btn"
                          >
                            View Fleet
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                 ))}
               </Swiper>
            </motion.div>

         </div>
      </section>

      {/* 5. RECENT PROJECTS (Number Counters + Grid) */}
      <section className="py-24 bg-white" ref={refProjects}>
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          
          {/* Stats Bar */}
          <div ref={refStats} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-10 border-y border-line">
             {stats.length > 0 ? stats.map((stat, i) => {
               // Extract numeric part for CountUp if possible
               const numMatch = stat.value.match(/(\d+)/);
               const num = numMatch ? parseInt(numMatch[1]) : 0;
               const suffix = stat.value.replace(numMatch ? numMatch[1] : "", "");
               return (
                 <div key={i} className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-gltOrange mb-2">
                      {inViewStats ? <CountUp key={String(inViewStats)} end={num} duration={2.5} suffix={suffix} /> : "0"}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-asphalt">{stat.label}</div>
                 </div>
               );
             }) : [
               { num: 150, suffix: "+", label: "Missions Completed" },
               { num: 45, suffix: "", label: "Vehicles in Fleet" },
               { num: 14, suffix: "", label: "Regions Covered" },
               { num: 12, suffix: "", label: "Active Missions" }
             ].map((stat, i) => (
                <div key={i} className="text-center opacity-50">
                   <div className="text-4xl md:text-5xl font-black text-gltOrange mb-2">
                     {inViewStats ? <CountUp key={String(inViewStats)} end={stat.num} duration={2.5} suffix={stat.suffix} /> : "0"}
                   </div>
                   <div className="text-sm font-bold uppercase tracking-widest text-asphalt">{stat.label}</div>
                </div>
             ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inViewProjects ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h4 className="text-gltOrange font-bold text-sm tracking-[0.2em] uppercase mb-3">{t("projects.kicker")}</h4>
            <h2 className="text-4xl md:text-5xl font-black text-navy">{t("projects.title")}</h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {missions.slice(0, 4).map((mission, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={inViewProjects ? { opacity: 1, scale: 1 } : {}}
                   transition={{ duration: 0.5, delay: i * 0.1 }}
                   className="bg-lightbg rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 border border-line flex flex-col"
                >
                   <div className="h-48 overflow-hidden relative">
                     <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src={mission.image} alt={mission.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                   </div>
                   <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-navy text-lg mb-2 h-14 line-clamp-2 leading-tight">{mission.title}</h3>
                      <p className="text-xs text-gltOrange font-bold uppercase tracking-wider mb-3">{mission.date}</p>
                      
                      <p className="text-sm text-gray-500 line-clamp-3 mb-5 flex-grow">{mission.description}</p>
                      
                      <Link to={`/real-missions/${mission._id}`} className="mt-auto block w-full text-center bg-white border-2 border-navy text-navy hover:bg-navy hover:text-white transition-colors py-2.5 rounded font-bold uppercase tracking-widest text-xs">
                        View Details
                      </Link>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNERS BANNER (Infinite Marquee) */}
      <section className="bg-navy relative overflow-hidden py-16">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gltOrange to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gltOrange/30 to-transparent" />

        {/* Heading */}
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 mb-10 text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="block w-12 h-[2px] bg-gltOrange" />
            <span className="text-gltOrange font-black text-xs tracking-[0.3em] uppercase">Industries We Serve</span>
            <span className="block w-12 h-[2px] bg-gltOrange" />
          </div>
          <h2 className="text-white font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
            Trusted Transportation<br />
            <span className="text-gltOrange">Partner</span> For
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative z-10">
          <Marquee gradient={false} speed={50} className="py-3">
            {partnersData.length > 0 ? (
              partnersData.map((p) => (
                <div key={p._id} className="flex items-center mx-8 bg-white/5 border border-white/10 rounded-xl px-5 py-3 hover:bg-white/10 hover:border-gltOrange/40 transition-all duration-300 group">
                  <img src={p.image} alt="Partner Logo" className="h-12 max-w-[160px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))
            ) : (
              partners.map((p, i) => {
                const colors = [
                  "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
                  "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
                  "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300",
                  "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
                  "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300",
                  "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300",
                  "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300",
                ];
                const c = colors[i % colors.length];
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 mx-4 bg-gradient-to-r ${c} border rounded-xl px-6 py-3.5 hover:scale-105 transition-all duration-300 cursor-default group`}
                  >
                    <ShieldCheck size={18} className="flex-shrink-0 opacity-80" />
                    <span className="font-black uppercase tracking-[0.12em] text-sm text-white whitespace-nowrap">{p}</span>
                  </div>
                );
              })
            )}
          </Marquee>

          {/* Second row marquee — opposite direction */}
          {partnersData.length === 0 && (
            <Marquee gradient={false} speed={35} direction="right" className="py-3 mt-2">
              {[...partners].reverse().map((p, i) => {
                const colors2 = [
                  "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300",
                  "from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-300",
                  "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-300",
                  "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300",
                  "from-lime-500/20 to-lime-600/10 border-lime-500/30 text-lime-300",
                  "from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-300",
                  "from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/30 text-fuchsia-300",
                ];
                const c2 = colors2[i % colors2.length];
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 mx-4 bg-gradient-to-r ${c2} border rounded-xl px-6 py-3.5 hover:scale-105 transition-all duration-300 cursor-default`}
                  >
                    <ShieldCheck size={18} className="flex-shrink-0 opacity-80" />
                    <span className="font-black uppercase tracking-[0.12em] text-sm text-white whitespace-nowrap">{p}</span>
                  </div>
                );
              })}
            </Marquee>
          )}
        </div>
      </section>


      {/* 7. CONTACT / APPLICATION */}
      <section className="bg-navy relative overflow-hidden" id="contact">
         <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row">
            
            <div className="lg:w-5/12 p-12 lg:p-24 text-white relative flex flex-col justify-center overflow-hidden">
               <motion.div 
                 className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-luminosity" 
                 initial={{ scale: 1.2 }}
                 whileInView={{ scale: 1 }}
                 transition={{ duration: 5, ease: "linear" }}
               />
               <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-[#061525]" />
               {/* Orange accent line */}
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gltOrange via-gltOrange/50 to-transparent" />
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4 }}
                 className="relative z-10"
               >
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="block w-8 h-[2px] bg-gltOrange" />
                    <span className="text-gltOrange font-black text-[10px] tracking-[0.3em] uppercase">Transportation Request</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">
                    Need a Ride<br />
                    <span className="text-gltOrange">Across</span><br />
                    Uzbekistan?
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Fill in the form — our team responds within 2 hours with the best transport solution.
                  </p>
                  <div className="mt-8 space-y-3 text-sm">
                    <a href="mailto:info@goluxtrip.com" className="flex items-center gap-3 text-gray-400 hover:text-gltOrange transition-colors">
                      <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gltOrange text-xs flex-shrink-0">✉</span>
                      <span className="font-semibold text-gray-300">info@goluxtrip.com</span>
                    </a>
                    <a href="tel:+998946264346" className="flex items-center gap-3 text-gray-400 hover:text-gltOrange transition-colors">
                      <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gltOrange text-xs flex-shrink-0">☎</span>
                      <span className="font-semibold text-gray-300">+998 (94) 626-43-46</span>
                    </a>
                    <div className="flex items-start gap-3 text-gray-400">
                      <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gltOrange text-xs flex-shrink-0 mt-0.5">📍</span>
                      <span className="font-semibold text-gray-300">Muqumiy str 82, Yakkasaroy,<br />Tashkent, Uzbekistan</span>
                    </div>
                    <a
                      href="https://wa.me/998946264346"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/25 text-[#25D366] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-[#25D366] hover:text-white transition-all duration-300 mt-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Chat on WhatsApp
                    </a>
                  </div>
               </motion.div>
            </div>

            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4 }}
               className="lg:w-7/12 p-8 lg:p-24 bg-[#051b2e] shadow-2xl relative z-20"
            >
               <form className="grid sm:grid-cols-2 gap-x-8 gap-y-5" onSubmit={handleSubmit(onSubmit, () => toast.error(t("application.invalid")))}>

                  {/* Organization */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Organization</label>
                     <input type="text" {...register("organization")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all placeholder:text-gray-600" placeholder="UN, World Bank..." />
                  </div>

                  {/* Contact Person */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Contact Person</label>
                     <input type="text" {...register("name")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all placeholder:text-gray-600" placeholder="Full name" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Email <span className="text-gltOrange">*</span></label>
                     <input type="email" {...register("email")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all placeholder:text-gray-600" placeholder="email@example.com" />
                  </div>

                  {/* Passengers — text input */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Nr. of Passenger(s) <span className="text-gltOrange">*</span></label>
                     <input type="text" inputMode="numeric" {...register("passengers")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all placeholder:text-gray-600" placeholder="e.g. 4" />
                  </div>

                  {/* Service Type */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Service Type <span className="text-gltOrange">*</span></label>
                     <div className="relative">
                        <select {...register("service")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none w-full appearance-none transition-all">
                           <option value="" className="bg-navy">Select service...</option>
                           <option value="Project Site Visit" className="bg-navy">Project Site Visit</option>
                           <option value="Delegation" className="bg-navy">Delegation</option>
                           <option value="Airport Drop Off" className="bg-navy">Airport Drop Off</option>
                           <option value="Airport Pick Up" className="bg-navy">Airport Pick Up</option>
                           <option value="Transfer" className="bg-navy">Transfer</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                     </div>
                  </div>

                  {/* Region/City */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Region / City <span className="text-gltOrange">*</span></label>
                     <input type="text" {...register("route")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all placeholder:text-gray-600" placeholder="e.g. Tashkent, Samarkand" />
                  </div>

                  {/* Departure */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Departure Date &amp; Time <span className="text-gltOrange">*</span></label>
                     <input type="datetime-local" {...register("dates")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all [color-scheme:dark]" />
                  </div>

                  {/* Return */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Return Date &amp; Time</label>
                     <input type="datetime-local" {...register("message")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all [color-scheme:dark]" />
                  </div>

                  {/* Note full width */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">Note</label>
                     <input type="text" {...register("message")} className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange outline-none transition-all placeholder:text-gray-600" placeholder="Additional requirements, trip notes..." />
                  </div>

                  <div className="flex items-end sm:col-span-2">
                     <button type="submit" disabled={isSubmitting} className="bg-gltOrange text-white font-bold text-sm tracking-widest uppercase rounded-xl p-4 w-full hover:bg-[#c84211] transition-all duration-300 disabled:opacity-50 shadow-lg shadow-gltOrange/20 hover:shadow-gltOrange/40 hover:-translate-y-0.5">
                        {isSubmitting ? t("application.sending") : "Submit Request →"}
                     </button>
                  </div>
               </form>
            </motion.div>

         </div>
      </section>
    </div>
  );
}
