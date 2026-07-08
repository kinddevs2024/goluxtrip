import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/Shared";

export default function IndustrySolutions() {
  const { t } = useTranslation();
  
  const partners = t("pages.industry.partners", { returnObjects: true }) as string[];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker="Partnerships" title={t("pages.industry.title")} text={t("pages.industry.subtitle")} />
      
      <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
           <p className="text-lg text-asphalt leading-relaxed mb-8">{t("pages.industry.text")}</p>
           <ul className="space-y-4">
             {partners.map((p, i) => (
               <li key={i} className="font-bold text-ink text-lg pb-3 border-b border-line last:border-0">{p}</li>
             ))}
           </ul>
        </div>
      </div>
    </section>
  );
}
