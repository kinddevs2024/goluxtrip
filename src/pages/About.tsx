import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/Shared";
import { ShieldCheck } from "lucide-react";

export default function About() {
  const { t } = useTranslation();
  
  const pillars = t("pages.about.pillars", { returnObjects: true }) as {title: string, desc: string}[];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker="Who we are" title={t("pages.about.title")} text={t("pages.about.subtitle")} />
      <p className="mt-6 max-w-3xl text-lg text-asphalt">{t("pages.about.text")}</p>
      
      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <div key={i} className="bg-white border border-line rounded-2xl p-6 shadow-sm">
             <ShieldCheck className="text-gltBlue mb-4" size={32} />
             <h3 className="text-xl font-bold mb-2">{p.title}</h3>
             <p className="text-asphalt">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
