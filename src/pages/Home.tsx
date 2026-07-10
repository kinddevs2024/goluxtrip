import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  ArrowRight, ShieldCheck, Map, Truck, Globe, Clock, 
  Users, Briefcase, ChevronDown, CheckCircle
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
  
  const [refStats, inViewStats] = useInView({ triggerOnce: true, threshold: 0.5 });
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
  const tCars = t("fleet.cars", { returnObjects: true }) as {id: string, name: string, seats: string, bags: string, drive: string, image: string}[];
  const partners = t("partners.list", { returnObjects: true }) as string[];

  return (
    <div className="overflow-hidden bg-white">
      {/* 1. HERO SECTION (Parallax) */}
      <section className="relative h-[85vh] min-h-[600px] w-full bg-navy overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity scale-110" 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920" alt="Hero" className="w-full h-full object-cover" />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
        
        <div className="relative mx-auto max-w-[1400px] h-full flex flex-col justify-center px-5 lg:px-8">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.h1 variants={fadeUp} className={`font-black text-white leading-[1.05] tracking-tight whitespace-pre-line ${i18n.language === "ru" ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]"}`}>
              {t("hero.title")}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-lg sm:text-xl text-gray-300 font-medium whitespace-pre-line leading-relaxed max-w-2xl">
              {t("hero.text")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link to="/contact" className="bg-gltOrange text-white px-8 py-4 rounded font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#c84211] hover:scale-105 transition-all duration-300 shadow-lg shadow-gltOrange/30">
                {t("hero.cta")} <ArrowRight size={18} />
              </Link>
              <Link to="/fleet" className="border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-navy hover:scale-105 transition-all duration-300">
                {t("hero.secondary")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES BANNER */}
      <section className="bg-navy border-b border-white/10 relative z-10 -mt-1 shadow-2xl">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 text-white text-sm"
          >
            {[
              { icon: Truck, title: t("featuresBanner.suvs"), desc: t("featuresBanner.suvsDesc") },
              { icon: Map, title: t("featuresBanner.remote"), desc: t("featuresBanner.remoteDesc") },
              { icon: Users, title: t("featuresBanner.drivers"), desc: t("featuresBanner.driversDesc") },
              { icon: Clock, title: t("featuresBanner.ops"), desc: t("featuresBanner.opsDesc") },
              { icon: Globe, title: t("featuresBanner.coverage"), desc: t("featuresBanner.coverageDesc") }
            ].map((feature, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gltOrange transition-colors duration-300">
                  <feature.icon size={24} className="text-gltOrange group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-bold uppercase tracking-wide">{feature.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{feature.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT WE DO (SOLUTIONS GRID - 3D TILT) */}
      <section className="py-24 bg-lightbg relative">
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
                      <Link to={`/${sol.id}`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy group-hover:text-gltOrange transition-colors">
                        Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
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
                   <SwiperSlide key={i} className="w-[320px] sm:w-[380px]">
                     <div className="bg-white rounded-2xl flex flex-col shadow-2xl overflow-hidden group">
                        <div className="h-56 p-6 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 relative">
                           <img src={car.image} alt={car.name} className="max-h-full object-contain mix-blend-multiply drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-6 flex flex-col items-center bg-white relative z-10">
                           <h3 className="font-black text-navy text-lg text-center h-12 mb-4 uppercase tracking-wide">{car.name}</h3>
                           <div className="flex items-center gap-5 text-xs text-asphalt font-bold w-full justify-center border-t border-line pt-5">
                              <span className="flex items-center gap-1.5 bg-lightbg px-3 py-1.5 rounded-full"><Users size={14} className="text-gltOrange" /> {car.seats}</span>
                              <span className="flex items-center gap-1.5 bg-lightbg px-3 py-1.5 rounded-full"><Briefcase size={14} className="text-gltOrange" /> {car.bags}</span>
                              <span className="flex items-center gap-1.5 bg-lightbg px-3 py-1.5 rounded-full"><CheckCircle size={14} className="text-gltOrange" /> {car.drive}</span>
                           </div>
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
                      {inViewStats ? <CountUp end={num} duration={2.5} suffix={suffix} /> : "0"}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-asphalt">{stat.label}</div>
                 </div>
               );
             }) : [
               { num: 150, suffix: "+", label: "Missions Completed" },
               { num: 45, suffix: "", label: "Vehicles in Fleet" },
               { num: 14, suffix: "", label: "Regions Covered" },
               { num: 24, suffix: "/7", label: "Operations Support" }
             ].map((stat, i) => (
                <div key={i} className="text-center opacity-50">
                   <div className="text-4xl md:text-5xl font-black text-gltOrange mb-2">
                     {inViewStats ? <CountUp end={stat.num} duration={2.5} suffix={stat.suffix} /> : "0"}
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
      <section className="bg-lightbg border-y border-line py-16 overflow-hidden">
         <div className="mx-auto max-w-[1400px] px-5 lg:px-8 mb-8 text-center">
            <h3 className="text-navy font-bold text-sm tracking-[0.2em] uppercase">
               {t("partners.title")}
            </h3>
         </div>
         <Marquee gradient={true} gradientColor="var(--lightbg)" speed={40} className="py-4">
            {partnersData.length > 0 ? (
               partnersData.map((p) => (
                  <div key={p._id} className="flex items-center gap-3 mx-12">
                     <img src={p.image} alt="Partner Logo" className="h-16 max-w-[200px] object-contain mix-blend-multiply opacity-60 hover:opacity-100 transition-opacity duration-300" />
                  </div>
               ))
            ) : (
               partners.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 mx-12 text-gray-400 hover:text-navy transition-colors duration-300">
                     <ShieldCheck size={32} />
                     <span className="font-bold uppercase tracking-wider text-sm">{p}</span>
                  </div>
               ))
            )}
         </Marquee>
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
               <div className="absolute inset-0 bg-navy/90" />
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4 }}
                 className="relative z-10"
               >
                  <h4 className="text-gltOrange font-bold text-sm tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                    <span className="w-12 h-px bg-gltOrange"></span>
                    {t("application.kicker")}
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 whitespace-pre-line leading-tight">{t("application.title")}</h2>
                  <p className="text-gray-300 text-base whitespace-pre-line leading-relaxed max-w-sm">{t("application.text")}</p>
               </motion.div>
            </div>

            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4 }}
               className="lg:w-7/12 p-8 lg:p-24 bg-[#051b2e] shadow-2xl relative z-20"
            >
               <form className="grid sm:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit(onSubmit, () => toast.error(t("application.invalid")))}>
                  
                  {/* Inputs mapped to look identical but fully functional */}
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.organization")}</label>
                     <input type="text" {...register("organization")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.route")}</label>
                     <input type="text" {...register("route")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none transition-all" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.name")}</label>
                     <input type="text" {...register("name")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.passengers")}</label>
                     <div className="relative">
                        <select {...register("passengers")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none w-full appearance-none transition-all">
                           <option value="1-4" className="bg-navy">1-4</option>
                           <option value="5-10" className="bg-navy">5-10</option>
                           <option value="10+" className="bg-navy">10+</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.email")}</label>
                     <input type="email" {...register("email")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.upload")}</label>
                     <input type="file" className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg p-3 focus:border-gltOrange focus:bg-white/10 outline-none file:bg-white/10 file:border-0 file:text-white file:px-4 file:py-1.5 file:rounded-md file:mr-4 file:font-semibold file:text-xs file:uppercase file:tracking-wider file:cursor-pointer transition-all" />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.service")}</label>
                     <div className="relative">
                        <select {...register("service")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none w-full appearance-none transition-all">
                           <option value="Field Mission" className="bg-navy">Field Mission</option>
                           <option value="Delegation" className="bg-navy">Delegation</option>
                           <option value="Transfer" className="bg-navy">Transfer</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.message")}</label>
                     <input type="text" {...register("message")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none transition-all" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">{t("application.fields.dates")}</label>
                     <input type="text" {...register("dates")} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-4 focus:border-gltOrange focus:bg-white/10 outline-none transition-all" />
                  </div>

                  <div className="flex items-end mt-4 sm:mt-0">
                     <button type="submit" disabled={isSubmitting} className="bg-gltOrange text-white font-bold text-sm tracking-widest uppercase rounded-lg p-4 w-full hover:bg-[#c84211] transition-all duration-300 disabled:opacity-50 shadow-lg shadow-gltOrange/20 hover:shadow-gltOrange/40 hover:-translate-y-1">
                        {isSubmitting ? t("application.sending") : t("application.submit")}
                     </button>
                  </div>
               </form>
            </motion.div>

         </div>
      </section>
    </div>
  );
}
