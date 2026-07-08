import { useTranslation } from "react-i18next";
import { Plane, Train } from "lucide-react";
import { SectionHeading } from "../components/Shared";

export default function Transfers() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker="Meet & Greet" title={t("pages.transfers.title")} text={t("pages.transfers.subtitle")} />
      
      <div className="mt-12 bg-white border border-line rounded-[2rem] p-8 lg:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <p className="text-lg text-asphalt leading-relaxed mb-6">
            {t("pages.transfers.text")}
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-[#f2f4f7] px-4 py-2 rounded-full font-bold">
               <Plane size={18} className="text-gltBlue" /> Airports
            </div>
            <div className="flex items-center gap-2 bg-[#f2f4f7] px-4 py-2 rounded-full font-bold">
               <Train size={18} className="text-gltBlue" /> Railway Stations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
