import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, ChevronDown, Mail, MapPin, Phone, Users, FileText, ClipboardList, Briefcase } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Country codes list
const COUNTRY_CODES = [
  { code: "+1",   flag: "🇺🇸", name: "US" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+49",  flag: "🇩🇪", name: "DE" },
  { code: "+33",  flag: "🇫🇷", name: "FR" },
  { code: "+39",  flag: "🇮🇹", name: "IT" },
  { code: "+34",  flag: "🇪🇸", name: "ES" },
  { code: "+31",  flag: "🇳🇱", name: "NL" },
  { code: "+46",  flag: "🇸🇪", name: "SE" },
  { code: "+47",  flag: "🇳🇴", name: "NO" },
  { code: "+45",  flag: "🇩🇰", name: "DK" },
  { code: "+41",  flag: "🇨🇭", name: "CH" },
  { code: "+43",  flag: "🇦🇹", name: "AT" },
  { code: "+32",  flag: "🇧🇪", name: "BE" },
  { code: "+48",  flag: "🇵🇱", name: "PL" },
  { code: "+90",  flag: "🇹🇷", name: "TR" },
  { code: "+7",   flag: "🇷🇺", name: "RU" },
  { code: "+998", flag: "🇺🇿", name: "UZ" },
  { code: "+992", flag: "🇹🇯", name: "TJ" },
  { code: "+7",   flag: "🇰🇿", name: "KZ" },
  { code: "+993", flag: "🇹🇲", name: "TM" },
  { code: "+994", flag: "🇦🇿", name: "AZ" },
  { code: "+374", flag: "🇦🇲", name: "AM" },
  { code: "+995", flag: "🇬🇪", name: "GE" },
  { code: "+380", flag: "🇺🇦", name: "UA" },
  { code: "+375", flag: "🇧🇾", name: "BY" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
  { code: "+966", flag: "🇸🇦", name: "SA" },
  { code: "+91",  flag: "🇮🇳", name: "IN" },
  { code: "+86",  flag: "🇨🇳", name: "CN" },
  { code: "+81",  flag: "🇯🇵", name: "JP" },
  { code: "+82",  flag: "🇰🇷", name: "KR" },
  { code: "+55",  flag: "🇧🇷", name: "BR" },
  { code: "+27",  flag: "🇿🇦", name: "ZA" },
];

const SERVICE_OPTIONS = [
  "Project Site Visit",
  "Delegation",
  "Airport Drop Off",
  "Airport Pick Up",
  "Transfer",
];

type ApplicationForm = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  organization: string;
  service: string;
  departureDatetime: string;
  returnDatetime: string;
  route: string;
  passengers: string;
  itinerary: string;
  note?: string;
};

function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 font-semibold text-xs tracking-wider uppercase">
        {label}{required && <span className="text-gltOrange ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

const inputCls = "bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:border-gltOrange focus:bg-white/8 outline-none transition-all placeholder:text-gray-600";

export default function Contact() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  const carParam = searchParams.get("car");

  const [countryCode, setCountryCode] = useState("+998");
  const [ccOpen, setCcOpen] = useState(false);
  const ccRef = useRef<HTMLDivElement>(null);

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  // Auto-detect country code from IP
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(d => {
        const found = COUNTRY_CODES.find(c => c.name === d.country);
        if (found) setCountryCode(found.code + (found.name === "KZ" ? "" : ""));
      })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node)) setCcOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const schema = useMemo(() =>
    z.object({
      organization: z.string().min(2, "Organization is required"),
      name: z.string().min(2, "Contact person name is required"),
      email: z.string().email("Please enter a valid email address with @"),
      countryCode: z.string().min(1),
      phone: z.string().min(5, "Phone number is required"),
      service: z.string().min(2, "Please select a service type"),
      departureDatetime: z.string().min(2, "Departure date & time is required"),
      returnDatetime: z.string().min(2, "Return date & time is required"),
      route: z.string().min(2, "Region/City is required"),
      passengers: z.string().min(1, "Number of passengers is required"),
      itinerary: z.string().min(2, "Trip itinerary is required"),
      note: z.string().max(1000).optional(),
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: "+998", service: serviceParam || "" }
  });

  useEffect(() => {
    if (serviceParam) setValue("service", serviceParam, { shouldValidate: false });
    if (carParam) setValue("note", `Interested in vehicle: ${carParam}`);
  }, [serviceParam, carParam, setValue]);

  useEffect(() => {
    if (departureDate) {
      const s = departureDate.toISOString().slice(0, 16).replace("T", " ");
      setValue("departureDatetime", s, { shouldValidate: true });
    }
  }, [departureDate, setValue]);

  useEffect(() => {
    if (returnDate) {
      const s = returnDate.toISOString().slice(0, 16).replace("T", " ");
      setValue("returnDatetime", s, { shouldValidate: true });
    }
  }, [returnDate, setValue]);

  async function onSubmit(values: ApplicationForm) {
    const payload = {
      name: values.name,
      email: values.email,
      phone: `${values.countryCode} ${values.phone}`,
      car: values.service,
      dates: `Depart: ${values.departureDatetime} | Return: ${values.returnDatetime}`,
      route: `Org: ${values.organization} | Region: ${values.route} | Pax: ${values.passengers}`,
      message: `Itinerary: ${values.itinerary}${values.note ? " | Note: " + values.note : ""}`,
    };

    const response = await fetch("https://goluxtrip-backend.vercel.app/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Could not send the request.");

    toast.success(t("application.success"));
    reset();
    setDepartureDate(null);
    setReturnDate(null);
  }


  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
      {/* Pre-selected service banner */}
      {serviceParam && (
        <div className="mb-10 flex items-center gap-4 bg-navy text-white px-6 py-4 rounded-2xl shadow-lg border border-gltOrange/20">
          <div className="w-10 h-10 rounded-full bg-gltOrange/20 flex items-center justify-center flex-shrink-0">
            <Briefcase size={18} className="text-gltOrange" />
          </div>
          <div>
            <p className="text-xs text-gltOrange font-bold uppercase tracking-widest mb-0.5">Service Pre-Selected</p>
            <p className="font-bold text-sm">{serviceParam} — Fill in your details below and submit your request.</p>
          </div>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

        {/* Left info panel */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-gltOrange" />
              <span className="text-gltOrange font-black text-xs tracking-[0.25em] uppercase">Transportation Request</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-navy leading-tight mb-5">
              Need a Ride<br />
              <span className="text-gltOrange">Across Uzbekistan?</span>
            </h1>
            <p className="text-gray-500 leading-relaxed text-sm max-w-sm">
              Fill in the form and our operations team will respond with the best transport solution — typically within 2 hours.
            </p>
          </div>
          <div className="space-y-4 text-sm">
            {[
              { icon: <Mail size={16} />, text: "info@goluxtrip.com" },
              { icon: <Phone size={16} />, text: "+998 90 000 00 00" },
              { icon: <CalendarDays size={16} />, text: "24/7 Operations Support" },
              { icon: <MapPin size={16} />, text: "Tashkent, Uzbekistan" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-600 font-semibold">
                <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center text-gltOrange flex-shrink-0">{row.icon}</div>
                {row.text}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit, () => toast.error(t("application.invalid")))}
          className="rounded-3xl border border-line bg-white p-6 shadow-xl sm:p-8 flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Organization */}
            <FormField label="Organization" required error={errors.organization?.message}>
              <input {...register("organization")} className={inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} placeholder="e.g. UN, World Bank, XYZ Corp" />
            </FormField>

            {/* Contact Person */}
            <FormField label="Contact Person" required error={errors.name?.message}>
              <input {...register("name")} className={inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} placeholder="Full name" />
            </FormField>

            {/* Email */}
            <FormField label="Email" required error={errors.email?.message}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9`}
                  placeholder="email@example.com"
                />
              </div>
            </FormField>

            {/* Phone with country code */}
            <FormField label="Phone" required error={errors.phone?.message}>
              <div className="flex gap-2">
                {/* Country code selector */}
                <div ref={ccRef} className="relative flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setCcOpen(o => !o)}
                    className="h-full min-h-[48px] flex items-center gap-1.5 bg-gray-50 border border-line rounded-xl px-3 text-sm font-bold text-navy hover:border-gltOrange transition-colors"
                  >
                    <span>{COUNTRY_CODES.find(c => c.code === countryCode)?.flag ?? "🌍"}</span>
                    <span className="text-xs text-gray-500">{countryCode}</span>
                    <ChevronDown size={12} className={`text-gray-400 transition-transform ${ccOpen ? "rotate-180" : ""}`} />
                  </button>
                  {ccOpen && (
                    <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-line rounded-xl shadow-2xl w-48 max-h-56 overflow-y-auto">
                      {COUNTRY_CODES.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => { setCountryCode(c.code); setValue("countryCode", c.code); setCcOpen(false); }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-gray-50 text-navy font-semibold"
                        >
                          <span>{c.flag}</span>
                          <span className="text-gray-500 text-xs w-10">{c.code}</span>
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  {...register("phone")}
                  type="tel"
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} flex-1`}
                  placeholder="90 123 45 67"
                />
                <input type="hidden" {...register("countryCode")} value={countryCode} />
              </div>
            </FormField>

            {/* Service Type */}
            <FormField label="Service Type" required error={errors.service?.message}>
              <div className="relative">
                <select
                  {...register("service")}
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} w-full appearance-none pr-10`}
                >
                  <option value="" disabled>Select service type</option>
                  {SERVICE_OPTIONS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </FormField>

            {/* Region/City */}
            <FormField label="Region / City" required error={errors.route?.message}>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register("route")} className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9`} placeholder="e.g. Tashkent, Samarkand" />
              </div>
            </FormField>

            {/* Departure Date & Time */}
            <FormField label="Departure Date & Time" required error={errors.departureDatetime?.message}>
              <div className="relative">
                <CalendarDays size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <DatePicker
                  selected={departureDate}
                  onChange={(d: Date | null) => setDepartureDate(d)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="Departure date & time"
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9 w-full`}
                  minDate={new Date()}
                />
                <input type="hidden" {...register("departureDatetime")} />
              </div>
            </FormField>

            {/* Return Date & Time */}
            <FormField label="Return Date & Time" required error={errors.returnDatetime?.message}>
              <div className="relative">
                <CalendarDays size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <DatePicker
                  selected={returnDate}
                  onChange={(d: Date | null) => setReturnDate(d)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="Return date & time"
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9 w-full`}
                  minDate={departureDate || new Date()}
                />
                <input type="hidden" {...register("returnDatetime")} />
              </div>
            </FormField>

            {/* Number of Passengers */}
            <FormField label="Nr. of Passenger(s)" required error={errors.passengers?.message}>
              <div className="relative">
                <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("passengers")}
                  type="text"
                  inputMode="numeric"
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9`}
                  placeholder="e.g. 4"
                />
              </div>
            </FormField>

            {/* Trip Itinerary — required */}
            <FormField label="Trip Itinerary" required error={errors.itinerary?.message}>
              <div className="relative">
                <ClipboardList size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                <textarea
                  {...register("itinerary")}
                  rows={3}
                  className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9 resize-none w-full`}
                  placeholder="Describe your trip plan, stops, waypoints..."
                />
              </div>
            </FormField>
          </div>

          {/* Note (full width) */}
          <FormField label="Note" error={errors.note?.message}>
            <div className="relative">
              <FileText size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
              <textarea
                {...register("note")}
                rows={3}
                className={`${inputCls.replace("bg-white/5 border-white/10 text-white", "bg-gray-50 border-line text-navy")} pl-9 resize-none w-full`}
                placeholder="Any additional information, special requirements..."
              />
            </div>
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gltOrange px-6 py-4 text-sm font-black text-white shadow-lg shadow-gltOrange/30 transition-all hover:bg-[#c84211] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Submit Request"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
