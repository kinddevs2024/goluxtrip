import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Field, InfoRow, SectionHeading } from "../components/Shared";

type ApplicationForm = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  dates: string;
  route: string;
  passengers: string;
  message?: string;
};

export default function Contact() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const carParam = searchParams.get("car");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("application.errors.name")),
        email: z.string().email(t("application.errors.email")),
        phone: z.string().min(5, t("application.errors.phone")),
        organization: z.string().min(2, t("application.errors.organization")),
        service: z.string().min(2, t("application.errors.service")),
        dates: z.string().min(2, t("application.errors.dates")),
        route: z.string().min(2, t("application.errors.route")),
        passengers: z.string().min(1, t("application.errors.passengers")),
        message: z.string().max(1000).optional()
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (carParam) {
      setValue("message", `Interested in vehicle: ${carParam}`);
    }
  }, [carParam, setValue]);

  useEffect(() => {
    if (startDate || endDate) {
      setValue("dates", `${startDate} - ${endDate}`, { shouldValidate: true });
    }
  }, [startDate, endDate, setValue]);

  async function onSubmit(values: ApplicationForm) {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      car: values.service, // Map service to the old 'car' field in backend for compatibility
      dates: values.dates,
      route: `${values.organization} | Pax: ${values.passengers} | ${values.route}`,
      message: values.message
    };

    const response = await fetch("https://goluxtrip-backend.vercel.app/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Could not send the request.");
    }

    toast.success(t("application.success"));
    reset();
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-aos="fade-right">
          <SectionHeading kicker={t("application.kicker")} title={t("application.title")} text={t("application.text")} />
          <div className="mt-8 space-y-3 text-sm font-semibold text-asphalt">
            {(t("application.rows", { returnObjects: true }) as string[]).map((row, i) => (
              <InfoRow key={i} icon={i === 0 ? <Mail size={17} /> : i === 1 ? <Phone size={17} /> : <CalendarDays size={17} />} text={row} />
            ))}
          </div>
        </div>

        <form
          data-aos="fade-left"
          onSubmit={handleSubmit(onSubmit, () => toast.error(t("application.invalid")))}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-soft sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("application.fields.organization")} error={errors.organization?.message}>
              <input {...register("organization")} className="input" placeholder={t("application.placeholders.organization")} />
            </Field>
            <Field label={t("application.fields.name")} error={errors.name?.message}>
              <input {...register("name")} className="input" placeholder={t("application.placeholders.name")} />
            </Field>
            <Field label={t("application.fields.email")} error={errors.email?.message}>
              <input {...register("email")} className="input" placeholder={t("application.placeholders.email")} />
            </Field>
            <Field label={t("application.fields.phone")} error={errors.phone?.message}>
              <input {...register("phone")} className="input" placeholder={t("application.placeholders.phone")} />
            </Field>
            <Field label={t("application.fields.service")} error={errors.service?.message}>
              <input {...register("service")} className="input" placeholder={t("application.placeholders.service")} />
            </Field>
            <Field label={t("application.fields.passengers")} error={errors.passengers?.message}>
              <input {...register("passengers")} type="number" min="1" className="input" placeholder={t("application.placeholders.passengers")} />
            </Field>
            <Field label={t("application.fields.dates")} error={errors.dates?.message}>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  className="input flex-1 px-2" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="self-center text-gray-400">-</span>
                <input 
                  type="date" 
                  className="input flex-1 px-2" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <input type="hidden" {...register("dates")} />
              </div>
            </Field>
            <Field label={t("application.fields.route")} error={errors.route?.message}>
              <input {...register("route")} className="input" placeholder={t("application.placeholders.route")} />
            </Field>
          </div>
          
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
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gltOrange px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-[#c84211] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t("application.sending") : t("application.submit")} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
