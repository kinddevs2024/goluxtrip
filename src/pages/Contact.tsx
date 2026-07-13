import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, ChevronDown, Mail, MapPin, Phone, Users, FileText, Briefcase, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const SERVICE_OPTIONS = [
  "Project Site Visit",
  "Delegation",
  "Airport Drop Off",
  "Airport Pick Up",
  "Transfer",
];

const fieldCls = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-navy outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-gltOrange focus:ring-4 focus:ring-orange-100";
const iconFieldCls = `${fieldCls} pl-9`;
const timeOptions = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toDateValue(date: Date | null) {
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toTimeValue(date: Date | null) {
  if (!date) return "";
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toDisplayValue(date: Date | null) {
  if (!date) return "";
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${toTimeValue(date)}`;
}

function toPayloadValue(date: Date) {
  return `${toDateValue(date)} ${toTimeValue(date)}`;
}

function buildDate(dateValue: string, timeValue: string) {
  if (!dateValue) return null;
  return new Date(`${dateValue}T${timeValue || "09:00"}`);
}

type ApplicationForm = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  departureDatetime: string;
  returnDatetime?: string;
  route: string;
  passengers: string;
  itinerary?: string;
  note?: string;
  attachment?: string;
};

function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-navy/70 font-bold text-xs tracking-wider uppercase">
        {label}{required && <span className="text-gltOrange ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  const carParam = searchParams.get("car");

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [attachmentName, setAttachmentName] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const schema = useMemo(() =>
    z.object({
      organization: z.string().min(2, "Organization is required"),
      name: z.string().min(2, "Contact person name is required"),
      email: z.string().email("Please enter a valid email address with @"),
      phone: z.string().min(5, "Phone number is required"),
      service: z.string().min(2, "Please select a service type"),
      departureDatetime: z.string().min(2, "Departure date & time is required"),
      returnDatetime: z.string().optional().default(""),
      route: z.string().min(2, "Region/City is required"),
      passengers: z.string().min(1, "Number of passengers is required"),
      itinerary: z.string().optional().default(""),
      note: z.string().max(1000).optional(),
      attachment: z.string().max(1500000).optional(),
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema),
    defaultValues: { service: serviceParam || "" }
  });

  const selectedService = watch("service");

  useEffect(() => {
    if (serviceParam) setValue("service", serviceParam, { shouldValidate: false });
    if (carParam) setValue("note", `Interested in vehicle: ${carParam}`);
  }, [serviceParam, carParam, setValue]);

  useEffect(() => {
    if (departureDate) {
      const s = toPayloadValue(departureDate);
      setValue("departureDatetime", s, { shouldValidate: true });
    }
  }, [departureDate, setValue]);

  useEffect(() => {
    if (returnDate) {
      const s = toPayloadValue(returnDate);
      setValue("returnDatetime", s, { shouldValidate: true });
    }
  }, [returnDate, setValue]);

  function updateSchedule(kind: "departure" | "return", part: "date" | "time", value: string) {
    const current = kind === "departure" ? departureDate : returnDate;
    const currentDate = toDateValue(current) || toDateValue(new Date());
    const currentTime = toTimeValue(current) || (kind === "departure" ? "09:00" : "18:00");
    const next = buildDate(part === "date" ? value : currentDate, part === "time" ? value : currentTime);
    if (!next) return;
    if (kind === "departure") {
      setDepartureDate(next);
    } else {
      setReturnDate(next);
    }
  }

  async function onSubmit(values: ApplicationForm) {
    const datesStr = values.returnDatetime
      ? `Departure: ${values.departureDatetime} | Return: ${values.returnDatetime}`
      : `Departure: ${values.departureDatetime} (one-way)`;

    const routeStr = [
      `Organization: ${values.organization}`,
      `Region/City: ${values.route}`,
      `Passengers: ${values.passengers}`,
    ].join(" | ");

    const msgParts = [
      values.itinerary ? `Itinerary: ${values.itinerary}` : "",
      values.note ? `Note: ${values.note}` : "",
      values.attachment ? `Attachment: ${values.attachment}` : "",
    ].filter(Boolean).join(" | ");

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      car: values.service,
      dates: datesStr,
      route: routeStr,
      message: msgParts || "No additional info",
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
    setAttachmentName("");
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

      <div className="grid gap-10 rounded-2xl border border-line bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-[0.75fr_1.25fr]">

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
              { icon: <Phone size={16} />, text: "+998 (94) 626-43-46" },
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
          className="rounded-2xl border border-line bg-gray-50 p-5 shadow-sm sm:p-6 flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Organization */}
            <FormField label="Organization" required error={errors.organization?.message}>
              <input {...register("organization")} className={fieldCls} placeholder="e.g. UN, World Bank, XYZ Corp" />
            </FormField>

            {/* Contact Person */}
            <FormField label="Contact Person" required error={errors.name?.message}>
              <input {...register("name")} className={fieldCls} placeholder="Full name" />
            </FormField>

            {/* Email */}
            <FormField label="Email" required error={errors.email?.message}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  className={iconFieldCls}
                  placeholder="email@example.com"
                />
              </div>
            </FormField>

            {/* Phone */}
            <FormField label="Phone" required error={errors.phone?.message}>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("phone")}
                  type="tel"
                  className={iconFieldCls}
                  placeholder="+998 90 123 45 67"
                />
              </div>
            </FormField>

            {/* Service Type */}
            <FormField label="Service Type" required error={errors.service?.message}>
              <div className="relative">
                <input type="hidden" {...register("service")} />
                <button
                  type="button"
                  onClick={() => setServiceOpen(open => !open)}
                  className={`${fieldCls} flex items-center justify-between text-left`}
                >
                  <span className={selectedService ? "text-navy" : "text-slate-400"}>{selectedService || "Select service type"}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${serviceOpen ? "rotate-180" : ""}`} />
                </button>
                {serviceOpen && (
                  <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-line bg-white shadow-2xl">
                    {SERVICE_OPTIONS.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setValue("service", option, { shouldValidate: true });
                          setServiceOpen(false);
                        }}
                        className={`block w-full px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-orange-50 hover:text-gltOrange ${selectedService === option ? "bg-orange-50 text-gltOrange" : "text-navy"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FormField>

            {/* Region/City */}
            <FormField label="Region / City" required error={errors.route?.message}>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register("route")} className={iconFieldCls} placeholder="e.g. Tashkent, Samarkand" />
              </div>
            </FormField>

            {/* Trip Schedule */}
            <FormField label="Trip Schedule" required error={errors.departureDatetime?.message || errors.returnDatetime?.message}>
              <div className="relative">
                <input type="hidden" {...register("departureDatetime")} />
                <input type="hidden" {...register("returnDatetime")} />
                <button
                  type="button"
                  onClick={() => setScheduleOpen(open => !open)}
                  className={`${fieldCls} flex min-h-[54px] items-center gap-3 text-left`}
                >
                  <CalendarDays size={17} className="text-gray-400 flex-shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-navy">
                      {departureDate ? toDisplayValue(departureDate) : "Departure date & time"}
                    </span>
                    <span className="block truncate text-xs text-slate-400">
                      {returnDate ? `Return: ${toDisplayValue(returnDate)}` : "Return date & time"}
                    </span>
                  </span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${scheduleOpen ? "rotate-180" : ""}`} />
                </button>
                {scheduleOpen && (
                  <div className="absolute z-50 mt-2 w-[min(560px,calc(100vw-3rem))] rounded-2xl border border-line bg-white p-4 shadow-2xl">
                    <div className="grid gap-4 md:grid-cols-2">
                      {([
                        { key: "departure" as const, title: "Departure", value: departureDate, fallback: "09:00" },
                        { key: "return" as const, title: "Return", value: returnDate, fallback: "18:00" },
                      ]).map(item => (
                        <div key={item.key} className="rounded-xl border border-slate-200 bg-gray-50 p-3">
                          <div className="mb-2 text-xs font-black uppercase tracking-widest text-navy/70">{item.title}</div>
                          <input
                            type="date"
                            value={toDateValue(item.value)}
                            min={item.key === "return" ? toDateValue(departureDate) || toDateValue(new Date()) : toDateValue(new Date())}
                            onChange={event => updateSchedule(item.key, "date", event.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-navy outline-none focus:border-gltOrange"
                          />
                          <div className="mt-3 grid grid-cols-4 gap-2">
                            {timeOptions.map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => updateSchedule(item.key, "time", time)}
                                className={`rounded-lg border px-2 py-1.5 text-xs font-bold transition-colors ${toTimeValue(item.value) === time || (!item.value && item.fallback === time) ? "border-gltOrange bg-gltOrange text-white" : "border-slate-200 bg-white text-slate-600 hover:border-gltOrange hover:text-gltOrange"}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setScheduleOpen(false)}
                        className="rounded-lg bg-navy px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-gltOrange"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
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
                  className={iconFieldCls}
                  placeholder="e.g. 4"
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
                className={`${iconFieldCls} min-h-28 resize-none`}
                placeholder="Any additional information, special requirements..."
              />
            </div>
          </FormField>

          <FormField label="Additional File">
            <label className="flex min-h-[58px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-navy transition-all hover:border-gltOrange hover:bg-orange-50/40">
              <span className="flex items-center gap-3 min-w-0">
                <Upload size={17} className="text-gltOrange flex-shrink-0" />
                <span className="truncate">{attachmentName || "Upload itinerary, brief, or supporting document"}</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-400 flex-shrink-0">Max 1MB</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.txt"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    setAttachmentName("");
                    setValue("attachment", "");
                    return;
                  }
                  if (file.size > 1024 * 1024) {
                    toast.error("File must be smaller than 1MB");
                    event.target.value = "";
                    setAttachmentName("");
                    setValue("attachment", "");
                    return;
                  }
                  setAttachmentName(file.name);
                  setValue("attachment", `${file.name} (${Math.round(file.size / 1024)}KB)`, { shouldValidate: true });
                }}
              />
            </label>
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



