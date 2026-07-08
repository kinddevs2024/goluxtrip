import { motion } from "framer-motion";
import { ChevronRight, Compass, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/Shared";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(40,119,178,0.12),transparent_42%),linear-gradient(225deg,rgba(228,81,24,0.12),transparent_36%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-asphalt shadow-sm">
              <ShieldCheck size={16} className="text-gltOrange" />
              {t("hero.badge")}
            </div>
            <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-normal text-ink sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-asphalt sm:text-xl">{t("hero.text")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gltOrange px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-[#c84211]"
              >
                {t("hero.cta")} <ChevronRight size={18} />
              </Link>
              <Link
                to="/fleet"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-4 text-sm font-bold text-ink transition hover:border-gltBlue hover:text-gltBlue"
              >
                {t("hero.secondary")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-soft">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-gltBlue/35 blur-3xl" />
              <img src="/glt.png" alt="GoLuxTrip logo" className="relative mx-auto mb-8 w-full max-w-lg rounded-3xl bg-white p-6" />
              <div className="relative grid gap-3 sm:grid-cols-3">
                {(t("hero.stats", { returnObjects: true }) as string[]).map((item) => (
                  <div key={item} className="rounded-2xl border border-white/12 bg-white/8 p-4">
                    <Compass className="mb-3 text-gltOrange" size={20} />
                    <p className="text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading kicker={t("routes.kicker")} title={t("routes.title")} text={t("routes.text")} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(t("routes.items", { returnObjects: true }) as string[]).map((item) => (
            <div key={item} className="flex items-center justify-between rounded-[1.5rem] border border-line bg-white p-5 shadow-sm transition hover:border-gltBlue">
              <span className="text-lg font-black">{item}</span>
              <ShieldCheck className="text-gltOrange" size={20} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
