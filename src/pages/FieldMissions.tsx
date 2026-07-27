import ServiceDetailPage from "../components/ServiceDetailPage";

export default function FieldMissions() {
  return (
    <ServiceDetailPage
      kicker="Field Missions"
      title="Field Missions & Remote Site Transportation"
      subtitle="Safe, punctual, and professionally coordinated transport from airport arrivals to remote project sites."
      heroImage="/services/field-missions-hero.webp"
      heroPosition="center 58%"
      requestService="Field Mission Transportation"
      intro={[
        "GoLuxTrip provides professional field mission transportation and remote site logistics for international organizations, consulting firms, engineering companies, renewable energy developers, research institutions, and government agencies operating throughout Uzbekistan.",
        "From airport arrivals to remote project sites, we ensure every journey is safe, punctual, and professionally coordinated.",
      ]}
      sections={[
        {
          title: "Our Services",
          image: "/services/field-missions-site-fleet.webp",
          imageAlt: "GoLuxTrip field mission vehicles at a remote project site",
          imagePosition: "right",
          bullets: [
            "Field Mission Transportation",
            "Executive Chauffeur Services",
            "Remote Site Visits",
            "Infrastructure & Energy Projects",
            "Renewable Energy & Solar Farm Inspections",
            "Environmental & Water Management Missions",
            "Engineering & Technical Site Visits",
            "Long-Term Project Transportation",
            "Multi-Region Logistics Support",
          ],
        },
        {
          title: "Nationwide Coverage",
          paragraphs: [
            "We operate across all regions of Uzbekistan, including Tashkent, Samarkand, Bukhara, Navoi, Kashkadarya, Surkhandarya, Jizzakh, Khorezm, Karakalpakstan, Andijan, Namangan, and Fergana.",
            "Our drivers regularly travel to remote villages, industrial zones, mining sites, solar power plants, construction projects, and government facilities.",
          ],
        },
        {
          title: "Why GoLuxTrip?",
          checks: [
            "Nationwide Coverage",
            "Remote Site Expertise",
            "Experienced Professional Drivers",
            "Flexible Daily Scheduling",
            "Airport Meet & Greet",
            "Executive & Project Transportation",
          ],
        },
      ]}
      closing={{
        title: "Your Trusted Field Logistics Partner",
        text: "Whether your mission involves renewable energy, infrastructure development, water management, environmental research, mining, or government projects, GoLuxTrip delivers reliable transportation solutions that keep your team moving safely and efficiently across Uzbekistan.",
      }}
    />
  );
}
