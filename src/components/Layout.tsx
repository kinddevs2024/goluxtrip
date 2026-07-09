import { motion } from "framer-motion";
import { Menu, X, Clock, Mail, Instagram, Facebook, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    [t("nav.home"), "/"],
    [t("nav.fleet"), "/#fleet"],
    [t("nav.projects"), "/#projects"],
    [t("nav.about"), "/#contact"],
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-white text-xs font-semibold py-2">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <div className="flex gap-6 hidden sm:flex">
             <div className="flex items-center gap-2">
               <Clock size={14} /> 24/7 Operations
             </div>
             <div className="flex items-center gap-2">
               <Mail size={14} /> info@goluxtrip.com
             </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
             <button onClick={() => i18n.changeLanguage('en')} className={`hover:text-gltOrange transition ${i18n.language === 'en' ? 'text-gltOrange' : 'text-gray-300'}`}>EN</button>
             <span className="text-gray-500">|</span>
             <button onClick={() => i18n.changeLanguage('ru')} className={`hover:text-gltOrange transition ${i18n.language === 'ru' ? 'text-gltOrange' : 'text-gray-300'}`}>RU</button>
             <span className="text-gray-500">|</span>
             <button onClick={() => i18n.changeLanguage('uz')} className={`hover:text-gltOrange transition ${i18n.language === 'uz' ? 'text-gltOrange' : 'text-gray-300'}`}>UZ</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-line shadow-sm">
        <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img src="/glt-mark.png" alt="" className="h-12 w-auto xl:hidden" />
            <img src="/glt-wide.png" alt="GoLuxTrip" className="hidden h-12 w-auto xl:block" />
          </Link>

          {/* Desktop Nav - We try to fit all of them, or use smaller text */}
          <nav className="hidden items-center gap-4 text-[11px] uppercase tracking-wider font-bold text-ink xl:flex">
            {links.map(([label, href]) => (
              <Link key={href} to={href} className="transition hover:text-gltOrange">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded bg-gltOrange px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#c84211]"
            >
              {t("nav.apply")}
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
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

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-full h-[calc(100vh-5rem)] border-t border-line bg-white px-5 py-6 xl:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5 pb-32">
              {links.map(([label, href]) => (
                <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-base font-bold text-ink hover:text-gltOrange transition uppercase tracking-wide border-b border-line pb-3">
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 mx-auto w-full rounded bg-gltOrange px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-[#c84211] transition"
              >
                {t("nav.apply")}
              </Link>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
           <img src="/glt-wide.png" alt="GoLuxTrip" className="h-10 w-fit" />
        </div>
        
        <div className="text-xs text-asphalt flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
           <p>{t("footer.copyright")}</p>
           <div className="flex gap-4">
             <Link to="/privacy" className="hover:text-gltOrange">{t("footer.privacy")}</Link>
             <Link to="/terms" className="hover:text-gltOrange">{t("footer.terms")}</Link>
           </div>
        </div>

        <div className="flex items-center gap-4 text-navy">
           <a href="#" className="hover:text-gltOrange transition"><Linkedin size={20} /></a>
           <a href="#" className="hover:text-gltOrange transition"><Facebook size={20} /></a>
           <a href="#" className="hover:text-gltOrange transition"><Instagram size={20} /></a>
           <a href="#" className="hover:text-gltOrange transition"><Send size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
