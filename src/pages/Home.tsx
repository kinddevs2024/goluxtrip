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
import { useMemo } from "react";

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

export default function Home() {
  const { t } = useTranslation();

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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(values: ApplicationForm) {
    const payload = {
      name: values.name,
      email: values.email,
      phone: "N/A", // Not in mockup form, just use placeholder
      car: values.service,
      dates: values.dates,
      route: `${values.organization} | Pax: ${values.passengers} | ${values.route}`,
      message: values.message
    };

    try {
      const response = await fetch("https://goluxtrip-backend.vercel.app/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Could not send the request.");
      }

      toast.success(t("application.success"));
      reset();
    } catch (err) {
      toast.error("Failed to send request. Please try again.");
    }
  }

  const solutions = t("whatWeDo.solutions", { returnObjects: true }) as {id: string, title: string, desc: string, img: string}[];
  const cars = t("fleet.cars", { returnObjects: true }) as {id: string, name: string, seats: string, bags: string, drive: string, image: string}[];
  const projects = t("projects.items", { returnObjects: true }) as {name: string, region: string, duration: string, vehicles: string, distance: string, img: string}[];
  const partners = t("partners.list", { returnObjects: true }) as string[];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-navy overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        
        <div className="relative mx-auto max-w-[1400px] h-full flex flex-col justify-center px-5 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 font-medium whitespace-pre-line leading-relaxed">
              {t("hero.text")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="bg-gltOrange text-white px-8 py-4 rounded font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-[#c84211] transition"
              >
                {t("hero.cta")} <ArrowRight size={18} />
              </Link>
              <Link 
                to="/fleet" 
                className="border border-white text-white px-8 py-4 rounded font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition"
              >
                {t("hero.secondary")} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES BANNER */}
      <section className="bg-[#051b2e] py-6 border-b-4 border-gltOrange">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-white text-sm">
            <div className="flex items-center gap-3">
              <Truck size={32} className="text-gray-400" />
              <div>
                <div className="font-bold uppercase">{t("featuresBanner.suvs")}</div>
                <div className="text-gray-400 text-xs">{t("featuresBanner.suvsDesc")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Map size={32} className="text-gray-400" />
              <div>
                <div className="font-bold uppercase">{t("featuresBanner.remote")}</div>
                <div className="text-gray-400 text-xs">{t("featuresBanner.remoteDesc")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={32} className="text-gray-400" />
              <div>
                <div className="font-bold uppercase">{t("featuresBanner.drivers")}</div>
                <div className="text-gray-400 text-xs">{t("featuresBanner.driversDesc")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={32} className="text-gray-400" />
              <div>
                <div className="font-bold uppercase">{t("featuresBanner.ops")}</div>
                <div className="text-gray-400 text-xs">{t("featuresBanner.opsDesc")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={32} className="text-gray-400" />
              <div>
                <div className="font-bold uppercase">{t("featuresBanner.coverage")}</div>
                <div className="text-gray-400 text-xs">{t("featuresBanner.coverageDesc")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO (SOLUTIONS GRID) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="text-center mb-12">
            <h4 className="text-gltOrange font-bold text-sm tracking-widest uppercase mb-2">{t("whatWeDo.kicker")}</h4>
            <h2 className="text-3xl md:text-4xl font-black text-navy">{t("whatWeDo.title")}</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <Link to={`/${sol.id === 'day-trips' ? 'regional' : sol.id === 'regional' ? 'regional' : sol.id}`} key={sol.id} className="group flex flex-col bg-lightbg border border-line hover:border-gltOrange transition duration-300">
                <div className="h-56 relative overflow-hidden">
                   <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow-sm">
                      <Briefcase size={24} className="text-navy" />
                   </div>
                   <img src={sol.img} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-navy text-lg uppercase tracking-wide mb-3">{sol.title}</h3>
                  <p className="text-sm text-asphalt mb-4 leading-relaxed flex-1">{sol.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR FLEET */}
      <section className="py-20 bg-navy relative overflow-hidden">
         <div className="mx-auto max-w-[1400px] px-5 lg:px-8 flex flex-col xl:flex-row gap-12">
            
            <div className="xl:w-[350px] shrink-0 text-white flex flex-col justify-center">
               <h4 className="text-gltOrange font-bold text-sm tracking-widest uppercase mb-2">{t("fleet.kicker")}</h4>
               <h2 className="text-3xl md:text-4xl font-black mb-6 whitespace-pre-line leading-tight">{t("fleet.title")}</h2>
               <p className="text-gray-400 mb-8 whitespace-pre-line text-sm leading-relaxed">{t("fleet.text")}</p>
               <Link to="/fleet" className="bg-gltOrange text-white px-6 py-3 rounded font-bold text-sm tracking-wide uppercase self-start flex items-center gap-2 hover:bg-[#c84211] transition">
                  {t("fleet.viewAll")} <ArrowRight size={16} />
               </Link>
            </div>

            <div className="flex-1 overflow-x-auto pb-6 hide-scrollbar flex gap-4">
               {cars.map((car, i) => (
                 <div key={i} className="bg-white rounded w-[280px] shrink-0 flex flex-col">
                    <div className="h-40 p-4 flex items-center justify-center bg-gray-50 border-b border-line">
                       <img src={car.image} alt={car.name} className="max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="p-5 flex flex-col items-center">
                       <h3 className="font-bold text-navy text-center h-10 mb-4">{car.name}</h3>
                       <div className="flex items-center gap-4 text-xs text-gray-500 font-bold w-full justify-center border-t border-line pt-4">
                          <span className="flex items-center gap-1"><Users size={14} /> {car.seats}</span>
                          <span className="flex items-center gap-1"><Briefcase size={14} /> {car.bags}</span>
                          <span className="flex items-center gap-1"><CheckCircle size={14} /> {car.drive}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

         </div>
      </section>

      {/* 5. RECENT PROJECTS */}
      <section className="py-20 bg-lightbg">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="text-center mb-12">
            <h4 className="text-gltOrange font-bold text-sm tracking-widest uppercase mb-2">{t("projects.kicker")}</h4>
            <h2 className="text-3xl md:text-4xl font-black text-navy">{t("projects.title")}</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {projects.map((proj, i) => (
                <div key={i} className="bg-white border border-line group">
                   <div className="h-40 overflow-hidden">
                     <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                   </div>
                   <div className="p-5">
                      <h3 className="font-bold text-navy mb-2 h-12">{proj.name}</h3>
                      <p className="text-xs text-asphalt mb-4">{proj.region}</p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 border-t border-line pt-3 mb-4">
                         <span className="flex items-center gap-1"><Clock size={12} /> {proj.duration}</span>
                         <span className="flex items-center gap-1"><Truck size={12} /> {proj.vehicles}</span>
                         <span className="flex items-center gap-1"><Map size={12} /> {proj.distance}</span>
                      </div>
                      
                      <Link to="/projects" className="text-xs font-bold text-navy flex items-center gap-1 uppercase hover:text-gltOrange transition">
                         View Project <ArrowRight size={14} />
                      </Link>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-12 text-center">
             <Link to="/projects" className="border border-line bg-white text-navy px-8 py-3 rounded font-bold text-sm tracking-wide uppercase inline-flex items-center justify-center hover:border-navy transition">
                {t("projects.viewAll")}
             </Link>
          </div>
        </div>
      </section>

      {/* 6. PARTNERS BANNER */}
      <section className="bg-white border-y border-line py-10">
         <div className="mx-auto max-w-[1400px] px-5 lg:px-8 flex flex-col xl:flex-row items-center gap-8">
            <h3 className="text-navy font-bold text-sm tracking-widest uppercase shrink-0 xl:w-48 xl:border-r border-line pr-8 text-center xl:text-left">
               {t("partners.title")}
            </h3>
            <div className="flex flex-wrap justify-center xl:justify-between items-center w-full gap-6 text-gray-400 text-xs font-bold text-center">
               {partners.map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 max-w-[120px]">
                     <ShieldCheck size={28} />
                     <span>{p}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. CONTACT / APPLICATION */}
      <section className="bg-navy relative overflow-hidden" id="contact">
         <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row">
            
            <div className="lg:w-1/3 p-12 lg:p-20 text-white relative flex flex-col justify-center">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-navy/80" />
               <div className="relative z-10">
                  <h4 className="text-gltOrange font-bold text-sm tracking-widest uppercase mb-4">{t("application.kicker")}</h4>
                  <h2 className="text-3xl md:text-4xl font-black mb-6 whitespace-pre-line leading-tight">{t("application.title")}</h2>
                  <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{t("application.text")}</p>
               </div>
            </div>

            <div className="lg:w-2/3 p-8 lg:p-20 bg-[#051b2e]">
               <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit, () => toast.error(t("application.invalid")))}>
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.organization")}</label>
                     <input type="text" {...register("organization")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.route")}</label>
                     <input type="text" {...register("route")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.name")}</label>
                     <input type="text" {...register("name")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.passengers")}</label>
                     <div className="relative">
                        <select {...register("passengers")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none w-full appearance-none">
                           <option value="1-4">1-4</option>
                           <option value="5-10">5-10</option>
                           <option value="10+">10+</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400" />
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.email")}</label>
                     <input type="email" {...register("email")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.upload")}</label>
                     <input type="file" className="bg-navy border border-gray-700 text-gray-400 text-sm rounded p-2 focus:border-gltOrange outline-none file:bg-gray-700 file:border-0 file:text-white file:px-4 file:py-1 file:rounded file:mr-3" />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.service")}</label>
                     <div className="relative">
                        <select {...register("service")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none w-full appearance-none">
                           <option value="Field Mission">Field Mission</option>
                           <option value="Delegation">Delegation</option>
                           <option value="Transfer">Transfer</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.message")}</label>
                     <input type="text" {...register("message")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <label className="text-white text-xs">{t("application.fields.dates")}</label>
                     <input type="text" {...register("dates")} className="bg-navy border border-gray-700 text-white text-sm rounded p-3 focus:border-gltOrange outline-none" />
                  </div>

                  <div className="flex items-end mt-4 sm:mt-0">
                     <button type="submit" disabled={isSubmitting} className="bg-gltOrange text-white font-bold text-sm tracking-wide uppercase rounded p-3 w-full hover:bg-[#c84211] transition disabled:opacity-50">
                        {isSubmitting ? t("application.sending") : t("application.submit")}
                     </button>
                  </div>
               </form>
            </div>

         </div>
      </section>
    </>
  );
}
