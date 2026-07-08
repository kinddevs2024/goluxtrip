import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export function Header() {
  const { t, i18n } = useTranslation();
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
          <Link to="/" className="transition hover:text-gltBlue">{t("nav.home")}</Link>
          
          <div className="group relative py-2">
             <span className="cursor-pointer transition group-hover:text-gltBlue">Services</span>
             <div className="absolute left-0 top-full hidden w-56 flex-col gap-1 rounded-xl border border-line bg-white p-2 shadow-soft group-hover:flex">
               <Link to="/field-missions" className="rounded-lg px-3 py-2 hover:bg-[#f2f4f7]">{t("nav.fieldMissions")}</Link>
               <Link to="/delegations" className="rounded-lg px-3 py-2 hover:bg-[#f2f4f7]">{t("nav.delegations")}</Link>
               <Link to="/transfers" className="rounded-lg px-3 py-2 hover:bg-[#f2f4f7]">{t("nav.transfers")}</Link>
             </div>
          </div>
          
          <Link to="/fleet" className="transition hover:text-gltBlue">{t("nav.fleet")}</Link>
          
          <div className="group relative py-2">
             <span className="cursor-pointer transition group-hover:text-gltBlue">Company</span>
             <div className="absolute left-0 top-full hidden w-56 flex-col gap-1 rounded-xl border border-line bg-white p-2 shadow-soft group-hover:flex">
               <Link to="/projects" className="rounded-lg px-3 py-2 hover:bg-[#f2f4f7]">{t("nav.projects")}</Link>
               <Link to="/industry-solutions" className="rounded-lg px-3 py-2 hover:bg-[#f2f4f7]">{t("nav.industry")}</Link>
               <Link to="/about" className="rounded-lg px-3 py-2 hover:bg-[#f2f4f7]">{t("nav.about")}</Link>
             </div>
          </div>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2 text-sm font-bold text-asphalt">
             <button onClick={() => i18n.changeLanguage('ru')} className={`hover:text-gltBlue transition ${i18n.language === 'ru' ? 'text-gltBlue' : ''}`}>RU</button>
             <span className="text-line">|</span>
             <button onClick={() => i18n.changeLanguage('uz')} className={`hover:text-gltBlue transition ${i18n.language === 'uz' ? 'text-gltBlue' : ''}`}>UZ</button>
             <span className="text-line">|</span>
             <button onClick={() => i18n.changeLanguage('en')} className={`hover:text-gltBlue transition ${i18n.language === 'en' ? 'text-gltBlue' : ''}`}>EN</button>
          </div>
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
          className="absolute inset-x-0 top-full h-[calc(100vh-5rem)] border-t border-line bg-white/95 px-5 py-6 backdrop-blur-2xl lg:hidden shadow-soft overflow-y-auto"
        >
          <div className="flex flex-col gap-6 pb-32">
            {links.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-center text-lg font-bold text-ink hover:text-gltBlue transition">
                {label}
              </Link>
            ))}
            
            <div className="mt-4 flex justify-center gap-4 text-lg font-bold text-asphalt border-t border-line pt-6">
               <button onClick={() => i18n.changeLanguage('ru')} className={i18n.language === 'ru' ? 'text-gltBlue' : ''}>RU</button>
               <button onClick={() => i18n.changeLanguage('uz')} className={i18n.language === 'uz' ? 'text-gltBlue' : ''}>UZ</button>
               <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'text-gltBlue' : ''}>EN</button>
            </div>

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
