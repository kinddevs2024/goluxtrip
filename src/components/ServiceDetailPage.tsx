import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, MapPinned } from "lucide-react";
import { TransportationRequest } from "../pages/Contact";

export type ServiceContentGroup = {
  title: string;
  items: string[];
};

export type ServiceContentSection = {
  title: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
  groups?: ServiceContentGroup[];
  checks?: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right" | "full";
};

type ServiceDetailPageProps = {
  kicker: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroPosition?: string;
  intro: string[];
  sections: ServiceContentSection[];
  closing?: {
    title: string;
    text: string;
  };
  requestService: string;
};

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] font-semibold leading-6 text-asphalt">
          <Check aria-hidden="true" className="mt-1 shrink-0 text-gltOrange" size={17} strokeWidth={3} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionCopy({ section }: { section: ServiceContentSection }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="h-0.5 w-9 bg-gltOrange" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-gltOrange">GoLuxTrip Service</span>
      </div>
      <h2 className="max-w-4xl text-3xl font-black leading-tight text-navy md:text-4xl">{section.title}</h2>
      {section.lead && <p className="mt-5 max-w-4xl text-lg font-bold leading-8 text-ink">{section.lead}</p>}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-4xl text-base leading-8 text-gray-600 md:text-lg">
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <div className="mt-7">
          <ItemList items={section.bullets} />
        </div>
      )}
      {section.groups && (
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {section.groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xl font-black text-navy">{group.title}</h3>
              <ItemList items={group.items} />
            </div>
          ))}
        </div>
      )}
      {section.checks && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.checks.map((item) => (
            <div key={item} className="flex items-center gap-3 border-l-2 border-gltOrange pl-4 text-sm font-black text-navy">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServiceDetailPage({
  kicker,
  title,
  subtitle,
  heroImage,
  heroPosition = "center",
  intro,
  sections,
  closing,
  requestService,
}: ServiceDetailPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f6]">
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-navy">
        <img
          src={heroImage}
          alt={title}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: heroPosition }}
        />
        <div className="absolute inset-0 bg-[#02213d]/55" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-10 text-white lg:px-8 lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-gltOrange">{kicker}</p>
            <h1 className="max-w-5xl text-4xl font-black leading-[1.05] md:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/85 md:text-xl">{subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#request"
                className="inline-flex items-center gap-2 rounded-md bg-gltOrange px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#c84211]"
              >
                Request Transportation <ArrowRight size={18} />
              </a>
              <a
                href="#service-details"
                className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-black/15 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-black/30"
              >
                Explore Service <ArrowDown size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="service-details" className="scroll-mt-32 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.3fr_1fr] lg:px-8 lg:py-20">
          <div className="flex items-start gap-3 text-gltOrange">
            <MapPinned className="mt-1" size={24} />
            <p className="text-xs font-black uppercase tracking-[0.22em]">Professional ground transportation across Uzbekistan</p>
          </div>
          <div>
            {intro.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`${index === 0 ? "text-xl font-bold text-ink md:text-2xl md:leading-10" : "mt-5 text-base leading-8 text-gray-600 md:text-lg"}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {sections.map((section, index) => {
        const hasSideImage = section.image && section.imagePosition !== "full";
        const imageFirst = section.imagePosition === "left";
        return (
          <section key={`${section.title}-${index}`} className={index % 2 === 0 ? "bg-[#f7f8f6]" : "bg-white"}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"
            >
              {section.imagePosition === "full" && section.image && (
                <img
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  loading="lazy"
                  decoding="async"
                  className="mb-12 aspect-[16/8] w-full rounded-lg object-cover shadow-soft"
                />
              )}
              {hasSideImage ? (
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={imageFirst ? "lg:order-2" : undefined}>
                    <SectionCopy section={section} />
                  </div>
                  <img
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    loading="lazy"
                    decoding="async"
                    className={`aspect-[4/3] w-full rounded-lg object-cover shadow-soft ${imageFirst ? "lg:order-1" : undefined}`}
                  />
                </div>
              ) : (
                <SectionCopy section={section} />
              )}
            </motion.div>
          </section>
        );
      })}

      {closing && (
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gltOrange">Why GoLuxTrip</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight md:text-5xl">{closing.title}</h2>
            <p className="mt-6 max-w-4xl text-base leading-8 text-white/75 md:text-lg">{closing.text}</p>
          </div>
        </section>
      )}

      <TransportationRequest defaultService={requestService} embedded />
    </div>
  );
}
