import { zodResolver } from "@hookform/resolvers/zod";
import AOS from "aos";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Languages,
  Mail,
  MapPinned,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

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


const languages = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" }
];

const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  car: z.string().min(2),
  dates: z.string().min(2),
  route: z.string().min(2),
  message: z.string().max(1000).optional()
});

type ApplicationForm = z.infer<typeof applicationSchema>;

function scrollToForm(selection?: { carId?: string; route?: string }) {
  const form = document.getElementById("application");
  form?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (selection) {
    window.dispatchEvent(new CustomEvent("select-application", { detail: selection }));
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 850, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-ink">
      <Toaster position="top-center" toastOptions={{ duration: 4200 }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Fleet />
      <Experience />
      <RouteIdeas />
      <Trust />
      <Application />
      <Footer />
    </main>
  );
}

function Header({
  menuOpen,
  setMenuOpen
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}) {
  const { t, i18n } = useTranslation();
  const links = [
    [t("nav.fleet"), "#fleet"],
    [t("nav.process"), "#process"],
    [t("nav.routes"), "#routes"],
    [t("nav.request"), "#application"]
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="GoLuxTrip home">
          <img src="/glt-mark.png" alt="" className="h-11 w-auto sm:hidden" />
          <img src="/glt-wide.png" alt="GoLuxTrip" className="hidden h-8 w-auto sm:block" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-asphalt lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-gltBlue">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher current={i18n.language} onChange={(lang) => i18n.changeLanguage(lang)} />
          <button
            type="button"
            onClick={() => scrollToForm()}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-gltBlue"
          >
            {t("nav.apply")} <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher current={i18n.language} onChange={(lang) => i18n.changeLanguage(lang)} compact />
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
          className="absolute inset-x-0 top-full h-screen border-t border-line bg-white/98 px-5 py-6 backdrop-blur-2xl lg:hidden shadow-soft"
        >
          <div className="flex flex-col gap-6">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-center text-lg font-bold text-ink hover:text-gltBlue transition">
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                scrollToForm();
              }}
              className="mt-4 mx-auto w-full max-w-xs rounded-full bg-gltOrange px-6 py-4 text-center text-base font-bold text-white shadow-soft hover:bg-[#c84211] transition"
            >
              {t("nav.apply")}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function LanguageSwitcher({
  current,
  onChange,
  compact = false
}: {
  current: string;
  onChange: (language: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm">
      {!compact && <Languages size={16} className="ml-2 text-gltBlue" />}
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => onChange(language.code)}
          className={twMerge(
            "h-8 rounded-full px-2.5 text-xs font-black transition",
            current.startsWith(language.code) ? "bg-ink text-white" : "text-asphalt hover:bg-[#f2f4f7]"
          )}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  const stats = t("hero.stats", { returnObjects: true }) as string[];

  return (
    <section id="top" className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(40,119,178,0.12),transparent_42%),linear-gradient(225deg,rgba(228,81,24,0.12),transparent_36%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-asphalt shadow-sm">
            <Sparkles size={16} className="text-gltOrange" />
            {t("hero.badge")}
          </div>
          <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-asphalt sm:text-xl">{t("hero.text")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gltOrange px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-[#c84211]"
            >
              {t("hero.cta")} <ChevronRight size={18} />
            </button>
            <a
              href="#fleet"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-4 text-sm font-bold text-ink transition hover:border-gltBlue hover:text-gltBlue"
            >
              {t("hero.secondary")} <Car size={18} />
            </a>
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
              {stats.map((item) => (
                <div key={item} className="rounded-2xl border border-white/12 bg-white/8 p-4">
                  <Check className="mb-3 text-gltOrange" size={20} />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Fleet() {
  const { t } = useTranslation();
  const cars = t("fleet.cars", { returnObjects: true }) as CarCopy[];

  return (
    <section id="fleet" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionHeading kicker={t("fleet.kicker")} title={t("fleet.title")} text={t("fleet.text")} />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cars.map((car, index) => (
          <article
            key={car.id}
            data-aos="fade-up"
            data-aos-delay={index * 60}
            className="group rounded-[1.5rem] border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="mb-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[#f2f4f7] px-3 py-1 text-xs font-bold text-asphalt">{car.price}</span>
              </div>
              <img src={car.image} alt={car.name} className="h-40 w-full rounded-xl object-cover shadow-sm transition group-hover:scale-105" />
            </div>
            <h3 className="text-xl font-black">{car.name}</h3>
            <p className="mt-1 text-sm font-semibold text-gltBlue">{car.category}</p>
            <div className="mt-5 space-y-3 text-sm text-asphalt">
              <InfoRow icon={<BadgeCheck size={16} />} text={car.seats} />
              <InfoRow icon={<Clock3 size={16} />} text={car.transmission} />
              <InfoRow icon={<MapPinned size={16} />} text={car.range} />
            </div>
            <button
              type="button"
              onClick={() => scrollToForm({ carId: car.id })}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition group-hover:bg-gltOrange"
            >
              {t("fleet.request")} <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as [string, string][];

  return (
    <section id="process" className="border-y border-line bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading kicker={t("process.kicker")} title={t("process.title")} text={t("process.text")} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map(([title, text], index) => (
            <div key={title} data-aos="fade-up" className="rounded-[1.5rem] border border-line p-6">
              <span className="text-sm font-black text-gltOrange">0{index + 1}</span>
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-asphalt">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteIdeas() {
  const { t } = useTranslation();
  const routes = t("routes.items", { returnObjects: true }) as string[];

  return (
    <section id="routes" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <div data-aos="fade-right">
        <SectionHeading kicker={t("routes.kicker")} title={t("routes.title")} text={t("routes.text")} />
        <button
          type="button"
          onClick={() => scrollToForm()}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gltBlue px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
        >
          {t("routes.cta")} <Compass size={18} />
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2" data-aos="fade-right">
        {routes.map((route) => (
          <button
            key={route}
            type="button"
            onClick={() => scrollToForm({ route })}
            className="flex min-h-28 items-center justify-between rounded-[1.5rem] border border-line bg-white p-5 text-left shadow-sm transition hover:border-gltOrange hover:shadow-soft"
          >
            <span className="text-xl font-black">{route}</span>
            <ArrowRight className="text-gltOrange" size={20} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Trust() {
  const { t } = useTranslation();
  const items = t("trust.items", { returnObjects: true }) as [string, string][];

  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-aos="fade-up">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-gltOrange">{t("trust.kicker")}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{t("trust.title")}</h2>
          </div>
          <div className="grid gap-4">
            {items.map(([title, text]) => (
              <div key={title} data-aos="fade-up" className="rounded-[1.5rem] border border-white/10 bg-white/7 p-5">
                <ShieldCheck className="mb-4 text-gltOrange" size={24} />
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-2 leading-7 text-white/72">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Application() {
  const { t } = useTranslation();
  const cars = t("fleet.cars", { returnObjects: true }) as CarCopy[];
  const defaultCar = cars[0].name;
  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);
  const minDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const selectedCar = cars.find((car) => car.id === selectedCarId) ?? cars[0];

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("application.errors.name")),
        email: z.string().email(t("application.errors.email")),
        phone: z.string().min(5, t("application.errors.phone")),
        car: z.string().min(2, t("application.errors.car")),
        dates: z.string().min(2, t("application.errors.dates")),
        route: z.string().min(2, t("application.errors.route")),
        message: z.string().max(1000).optional()
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema),
    defaultValues: { car: defaultCar, message: "" }
  });

  useEffect(() => {
    setValue("car", selectedCar.name, { shouldValidate: true });
  }, [selectedCar.name, setValue]);

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<{ carId?: string; route?: string }>).detail;
      if (detail?.carId && cars.some((car) => car.id === detail.carId)) {
        const nextCar = cars.find((car) => car.id === detail.carId);
        setSelectedCarId(detail.carId);
        if (nextCar) {
          setValue("car", nextCar.name, { shouldValidate: true });
        }
      }
      if (detail?.route) {
        setValue("route", detail.route, { shouldValidate: true });
      }
    };
    window.addEventListener("select-application", listener);
    return () => window.removeEventListener("select-application", listener);
  }, [cars, setValue]);

  async function onSubmit(values: ApplicationForm) {
    const response = await fetch("https://goluxtrip-backend.vercel.app/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message || "Could not send the request.");
    }

    toast.success(t("application.success"));
    reset({ car: selectedCar.name, message: "" });
  }

  return (
    <section id="application" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-aos="fade-right">
          <SectionHeading kicker={t("application.kicker")} title={t("application.title")} text={t("application.text")} />
          <div className="mt-8 space-y-3 text-sm font-semibold text-asphalt">
            <InfoRow icon={<Mail size={17} />} text={t("application.rows.0")} />
            <InfoRow icon={<Phone size={17} />} text={t("application.rows.1")} />
            <InfoRow icon={<CalendarDays size={17} />} text={t("application.rows.2")} />
          </div>
        </div>

        <form
          data-aos="fade-right"
          onSubmit={handleSubmit(onSubmit, () => toast.error(t("application.invalid")))}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-soft sm:p-8"
        >
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {cars.map((car) => (
              <button
                type="button"
                key={car.id}
                onClick={() => {
                  setSelectedCarId(car.id);
                  setValue("car", car.name, { shouldValidate: true });
                }}
                className={twMerge(
                  "rounded-2xl border p-4 text-left transition flex items-center gap-4",
                  selectedCarId === car.id ? "border-gltOrange bg-orange-50" : "border-line hover:border-gltBlue"
                )}
              >
                <img src={car.image} alt={car.name} className="h-16 w-24 rounded-lg object-cover bg-white shadow-sm" />
                <div>
                  <span className="block text-sm font-black">{car.name}</span>
                  <span className="mt-1 block text-xs font-semibold text-asphalt">{car.category}</span>
                </div>
              </button>
            ))}
          </div>

          <input type="hidden" {...register("car")} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("application.fields.name")} error={errors.name?.message}>
              <input {...register("name")} className="input" placeholder={t("application.placeholders.name")} />
            </Field>
            <Field label={t("application.fields.email")} error={errors.email?.message}>
              <input {...register("email")} className="input" placeholder={t("application.placeholders.email")} />
            </Field>
            <Field label={t("application.fields.phone")} error={errors.phone?.message}>
              <input {...register("phone")} className="input" placeholder={t("application.placeholders.phone")} />
            </Field>
            <Field label={t("application.fields.dates")} error={errors.dates?.message}>
              <input {...register("dates")} className="input" min={minDate} placeholder={t("application.placeholders.dates")} />
            </Field>
          </div>
          <Field label={t("application.fields.route")} error={errors.route?.message}>
            <input {...register("route")} className="input" placeholder={t("application.placeholders.route")} />
          </Field>
          <Field label={t("application.fields.message")} error={errors.message?.message}>
            <textarea
              {...register("message")}
              className="input min-h-32 resize-y"
              placeholder={t("application.placeholders.message")}
            />
          </Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gltOrange px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-[#c84211] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t("application.sending") : t("application.submit")} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
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

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-gltOrange">{kicker}</p>
      <h2 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-asphalt">{text}</p>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gltOrange">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-black text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm font-semibold text-gltOrange">{error}</span>}
    </label>
  );
}

export default App;
