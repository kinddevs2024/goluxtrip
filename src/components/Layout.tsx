import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    [t("nav.home"), "/"],
    [t("nav.fieldMissions"), "/field-missions"],
    [t("nav.delegations"), "/delegations"],
    [t("nav.transfers"), "/transfers"],
    [t("nav.fleet"), "/fleet"],
    [t("nav.projects"), "/projects"],
    [t("nav.industry"), "/industry-solutions"],
    [t("nav.about"), "/about"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="GoLuxTrip home" onClick={() => setMenuOpen(false)}>
          <img src="/glt-mark.png" alt="" className="h-11 w-auto xl:hidden" />
          <img src="/glt-wide.png" alt="GoLuxTrip" className="hidden h-8 w-auto xl:block" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-asphalt lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} to={href} className="transition hover:text-gltBlue">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-gltBlue"
          >
            {t("nav.apply")} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("nav.toggle")}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-full h-screen border-t border-line bg-white/98 px-5 py-6 backdrop-blur-2xl lg:hidden shadow-soft overflow-y-auto"
        >
          <div className="flex flex-col gap-6 pb-32">
            {links.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-center text-lg font-bold text-ink hover:text-gltBlue transition">
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 mx-auto w-full max-w-xs rounded-full bg-gltOrange px-6 py-4 text-center text-base font-bold text-white shadow-soft hover:bg-[#c84211] transition"
            >
              {t("nav.apply")}
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-asphalt sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <img src="/glt-wide.png" alt="GoLuxTrip" className="h-8 w-fit" />
        <p>{t("footer")}</p>
      </div>
    </footer>
  );
}
