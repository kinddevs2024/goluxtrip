import { motion } from "framer-motion";
import { Menu, X, Clock, Mail, ChevronDown, Linkedin, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const servicesLinks = [
    [t("nav.fieldMissions"), "/field-missions"],
    [t("nav.delegations"), "/delegations"],
    [t("nav.transfers"), "/transfers"],
    [t("nav.projects"), "/projects"],
    [t("nav.industry"), "/industry-solutions"],
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          <div className="flex items-center gap-3 ml-auto text-gray-400 text-xs">
            <a href="https://wa.me/998946264346" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +998 (94) 626-43-46
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-line shadow-sm">
        <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            {/* Mobile / medium screens — icon mark only */}
            <img src="/glt-mark.png" alt="GoLuxTrip" className="h-11 w-auto xl:hidden" />
            {/* Desktop — wide logo + tagline */}
            <div className="hidden xl:flex flex-col gap-0.5">
              <img
                src="/glt-wide.png"
                alt="GoLuxTrip"
                className="h-11 w-auto max-w-[200px] object-contain object-left"
              />
              <span className="text-[6.5px] font-bold tracking-[0.15em] text-gray-400 uppercase pl-0.5">
                Transportation &amp;  Field Logistics Partner
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-widest font-bold text-navy xl:flex relative">
            <Link to="/" className="relative transition hover:text-gltOrange after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gltOrange after:transition-all hover:after:w-full">{t("nav.home")}</Link>
            
            <div className="relative" ref={dropRef}>
              <button
                className="flex items-center gap-1 transition hover:text-gltOrange uppercase outline-none relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gltOrange after:transition-all hover:after:w-full"
                onClick={() => setDropdownOpen(o => !o)}
              >
                Services <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-68 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-2 z-50">
                  {servicesLinks.map(([label, href]) => (
                    <Link
                      key={href}
                      to={href}
                      className="block px-5 py-3.5 hover:bg-orange-50 hover:text-gltOrange transition-colors text-xs font-bold uppercase tracking-widest border-b border-gray-50 last:border-0"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/fleet" className="relative transition hover:text-gltOrange after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gltOrange after:transition-all hover:after:w-full">{t("nav.fleet")}</Link>
            <Link to="/about" className="relative transition hover:text-gltOrange after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gltOrange after:transition-all hover:after:w-full">{t("nav.about")}</Link>
            <Link to="/real-missions" className="relative transition hover:text-gltOrange after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gltOrange after:transition-all hover:after:w-full">Real Missions</Link>
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded bg-gltOrange px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[#c84211] hover:scale-105 hover:shadow-lg hover:shadow-gltOrange/40 shadow-md shadow-gltOrange/20"
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
              <Link to="/" onClick={() => setMenuOpen(false)} className="text-base font-bold text-navy hover:text-gltOrange transition uppercase tracking-wide border-b border-gray-100 pb-3">{t("nav.home")}</Link>
              
              <div className="border-b border-gray-100 pb-3">
                <div className="text-base font-bold text-navy uppercase tracking-wide mb-3">Services</div>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-gltOrange/30">
                  {servicesLinks.map(([label, href]) => (
                    <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-gray-600 hover:text-gltOrange transition uppercase">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/fleet" onClick={() => setMenuOpen(false)} className="text-base font-bold text-navy hover:text-gltOrange transition uppercase tracking-wide border-b border-gray-100 pb-3">{t("nav.fleet")}</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="text-base font-bold text-navy hover:text-gltOrange transition uppercase tracking-wide border-b border-gray-100 pb-3">{t("nav.about")}</Link>
              <Link to="/real-missions" onClick={() => setMenuOpen(false)} className="text-base font-bold text-navy hover:text-gltOrange transition uppercase tracking-wide border-b border-gray-100 pb-3">Real Missions</Link>
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
    <footer className="bg-navy text-white">
      {/* Top main section */}
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1: Logo + tagline */}
        <div className="flex flex-col gap-5">
          <img src="/glt.png" alt="GoLuxTrip" className="h-20 w-40" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
            Reliable Transportation &amp; Field Logistics across Uzbekistan — for organizations, delegations &amp; corporates.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-2">
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300">
              <Linkedin size={16} />
            </a>
            {/* Telegram */}
            <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white transition-all duration-300">
              <Send size={16} />
            </a>
            {/* WhatsApp — opens whatsapp chat directly */}
            <a
              href="https://wa.me/998946264346"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
            >
              {/* WhatsApp SVG icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span className="block w-4 h-[2px] bg-gltOrange" />
            Contact
          </h4>
          <div className="space-y-4 text-sm">
            {/* Address */}
            <div className="flex items-start gap-3 text-gray-400">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gltOrange">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span className="leading-relaxed">Muqumiy str 82, Yakkasaroy district,<br />Tashkent, Uzbekistan</span>
            </div>

            {/* Phone */}
            <a href="tel:+998946264346" className="flex items-center gap-3 text-gray-400 hover:text-gltOrange transition-colors group">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gltOrange">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span>+998 (94) 626-43-46</span>
            </a>

            {/* Email */}
            <a href="mailto:info@goluxtrip.com" className="flex items-center gap-3 text-gray-400 hover:text-gltOrange transition-colors group">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-gltOrange" />
              </div>
              <span>info@goluxtrip.com</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/998946264346"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366]/15 border border-[#25D366]/25 text-[#25D366] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 mt-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Col 3: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span className="block w-4 h-[2px] bg-gltOrange" />
            Services
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              ["Field Missions", "/field-missions"],
              ["Delegations & Events", "/delegations"],
              ["Airport Transfers", "/transfers"],
              ["Regional Transportation", "/regional"],
              ["Day Trips", "/day-trips"],
              ["Industry Solutions", "/industry-solutions"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="hover:text-gltOrange transition-colors flex items-center gap-2 group">
                  <span className="block w-0 group-hover:w-3 h-[1.5px] bg-gltOrange transition-all duration-300" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span className="block w-4 h-[2px] bg-gltOrange" />
            Legal
          </h4>
          <div className="space-y-3 text-sm text-gray-400">
            <Link to="/privacy" className="block hover:text-gltOrange transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="block hover:text-gltOrange transition-colors">{t("footer.terms")}</Link>
            <p className="pt-2 text-xs leading-relaxed text-gray-500">{t("footer.copyright")}</p>
          </div>
          <div className="hidden">
            {[
              { label: "Cash (USD/UZS)", icon: "💵" },
              { label: "Bank Transfer", icon: "🏦" },
              { label: "Visa Card", icon: "💳" },
              { label: "Mastercard", icon: "💳" },
              { label: "Uzcard", icon: "🪪" },
              { label: "Humo", icon: "🪪" },
              { label: "Corporate Invoice", icon: "🧾" },
              { label: "PayMe", icon: "📱" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-gray-400 text-xs font-semibold hover:border-gltOrange/30 hover:text-white transition-all">
                <span className="text-base leading-none">{p.icon}</span>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>GoLuxTrip</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-gltOrange transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-gltOrange transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

