import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "../components/Shared";
import { Link } from "react-router-dom";

export default function FieldMissions() {
  const { t } = useTranslation();
  
  const features = t("pages.fieldMissions.features", { returnObjects: true }) as {title: string, desc: string}[];
  const highlights = t("pages.fieldMissions.highlights", { returnObjects: true }) as string[];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker="Core Expertise" title={t("pages.fieldMissions.title")} text={t("pages.fieldMissions.subtitle")} />
      
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          {features.map((feature, i) => (
            <div key={i} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-asphalt">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="rounded-[2rem] bg-ink p-8 text-white shadow-soft flex flex-col justify-between relative overflow-hidden">
           <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gltOrange/30 blur-3xl" />
           <div>
             <h3 className="text-2xl font-black mb-6">Why GoLuxTrip?</h3>
             <ul className="space-y-4">
               {highlights.map((hl, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <ShieldCheck className="text-gltOrange" size={24} />
                   <span className="font-semibold">{hl}</span>
                 </li>
               ))}
             </ul>
           </div>
           
           <Link to="/contact" className="mt-10 inline-block rounded-full bg-gltOrange px-6 py-4 text-center font-bold transition hover:bg-[#c84211]">
              Request Transportation
           </Link>
        </div>
      </div>
    </section>
  );
}
