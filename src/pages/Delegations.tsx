import { useTranslation } from "react-i18next";
import { Landmark } from "lucide-react";
import { SectionHeading } from "../components/Shared";

export default function Delegations() {
  const { t } = useTranslation();
  
  const features = t("pages.delegations.features", { returnObjects: true }) as {title: string, desc: string}[];
  const services = t("pages.delegations.services", { returnObjects: true }) as string[];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker="VIP Services" title={t("pages.delegations.title")} text={t("pages.delegations.subtitle")} />
      
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="rounded-2xl border border-line bg-white p-6 shadow-sm hover:border-gltBlue transition">
             <Landmark className="text-gltOrange mb-4" size={32} />
             <h3 className="text-xl font-bold mb-2">{f.title}</h3>
             <p className="text-asphalt text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white border border-line rounded-[2rem] p-8 lg:p-12">
        <h3 className="text-2xl font-black mb-6">Services Include</h3>
        <div className="flex flex-wrap gap-4">
          {services.map((s, i) => (
            <span key={i} className="px-4 py-2 bg-[#f2f4f7] rounded-full text-sm font-bold text-ink">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
