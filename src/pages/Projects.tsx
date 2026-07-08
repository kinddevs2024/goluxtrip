import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/Shared";
import { CheckCircle } from "lucide-react";

export default function Projects() {
  const { t } = useTranslation();
  
  const items = t("pages.projects.items", { returnObjects: true }) as {name: string, region: string, duration: string, vehicles: string}[];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 bg-[#f7f8f6]">
      <SectionHeading kicker="Track Record" title={t("pages.projects.title")} text={t("pages.projects.subtitle")} />
      
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-line shadow-sm hover:shadow-md transition">
             <h3 className="text-xl font-bold mb-4">{item.name}</h3>
             <div className="space-y-2 text-sm text-asphalt">
               <div className="flex items-center gap-2"><CheckCircle size={16} className="text-gltOrange" /> <strong>Region:</strong> {item.region}</div>
               <div className="flex items-center gap-2"><CheckCircle size={16} className="text-gltOrange" /> <strong>Duration:</strong> {item.duration}</div>
               <div className="flex items-center gap-2"><CheckCircle size={16} className="text-gltOrange" /> <strong>Vehicles:</strong> {item.vehicles}</div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
