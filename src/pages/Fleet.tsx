import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Clock3, MapPinned } from "lucide-react";
import { SectionHeading, InfoRow } from "../components/Shared";

type CarCopy = {
  id: string;
  name: string;
  category: string;
  price: string;
  seats: string;
  transmission: string;
  range: string;
  image: string;
};

export default function Fleet() {
  const { t } = useTranslation();
  const cars = t("fleet.cars", { returnObjects: true }) as CarCopy[];

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <SectionHeading kicker={t("fleet.kicker")} title={t("fleet.title")} text={t("fleet.text")} />
      
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((car, index) => (
          <article
            key={car.id}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="group flex flex-col rounded-[1.5rem] border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="mb-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[#f2f4f7] px-3 py-1 text-xs font-bold text-asphalt">{car.price}</span>
              </div>
              <img src={car.image} alt={car.name} className="h-48 w-full rounded-xl object-cover shadow-sm transition group-hover:scale-[1.02]" />
            </div>
            <h3 className="text-2xl font-black">{car.name}</h3>
            <p className="mt-1 text-sm font-semibold text-gltBlue">{car.category}</p>
            <div className="mt-5 mb-6 flex-1 space-y-3 text-sm text-asphalt">
              <InfoRow icon={<BadgeCheck size={16} />} text={car.seats} />
              <InfoRow icon={<Clock3 size={16} />} text={car.transmission} />
              <InfoRow icon={<MapPinned size={16} />} text={car.range} />
            </div>
            <Link
              to={`/contact?car=${car.id}`}
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition group-hover:bg-gltOrange"
            >
              {t("fleet.request")} <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
