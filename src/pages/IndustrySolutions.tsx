import ServiceDetailPage from "../components/ServiceDetailPage";

export default function IndustrySolutions() {
  return (
    <ServiceDetailPage
      kicker="Travel Industry Solutions"
      title="Travel Agency Transportation Partner in Uzbekistan"
      subtitle="Reliable B2B transportation solutions for tour operators, DMCs, and travel agencies."
      heroImage="/services/travel-industry-hero.webp"
      heroPosition="center 56%"
      requestService="Travel Industry Solutions"
      intro={[
        "GoLuxTrip is a trusted B2B transportation partner for travel agencies, tour operators, destination management companies (DMCs), and travel professionals worldwide.",
        "We support international and local travel companies by providing reliable ground transportation, professional drivers, licensed tour guides, and complete transportation logistics throughout Uzbekistan.",
        "Whether your clients are arriving for a cultural tour, business trip, incentive program, or private vacation, our team ensures every transfer is delivered professionally and on schedule, allowing you to focus on your customers while we take care of the transportation.",
      ]}
      sections={[
        {
          title: "Our B2B Services",
          image: "/services/industry-partnership.webp",
          imageAlt: "GoLuxTrip transportation fleet and B2B partnership",
          imagePosition: "right",
          bullets: [
            "Airport & Railway Transfers",
            "Hotel Transfers",
            "Private Tours",
            "Multi-Day Transportation",
            "Intercity Transfers",
            "VIP Transportation",
            "Group Transportation",
            "Coach & Minibus Services",
            "Executive Chauffeur Services",
            "Professional Licensed Tour Guides",
            "English, Russian & Other Language Guides",
            "Customized Transportation Programs",
            "Transportation for FIT & Group Tours",
          ],
        },
        {
          title: "Why Travel Agencies Choose GoLuxTrip",
          paragraphs: [
            "Many travel agencies and tour operators already rely on GoLuxTrip as their local transportation partner because we provide dependable service for both independent travelers (FIT) and large group tours, adapting to each agency's unique requirements.",
          ],
          checks: [
            "Experienced Professional Drivers",
            "Reliable Transportation Scheduling",
            "Executive Cars, SUVs, Minivans & Coaches",
            "Professional Licensed Tour Guides",
            "Flexible Last-Minute Support",
            "Airport Meet & Greet",
            "Competitive B2B Rates",
            "Dedicated Account Management",
            "Nationwide Operations",
            "Fast Response Times",
          ],
        },
        {
          title: "Nationwide Coverage",
          paragraphs: [
            "We provide transportation services across Uzbekistan, including Tashkent, Samarkand, Bukhara, Khiva, Urgench, Nukus, Fergana, Namangan, Andijan, Shahrisabz, Termez, Navoi, Karshi, Chimgan, Amirsoy, and Charvak.",
            "Whether your itinerary includes historical cities, mountain resorts, UNESCO World Heritage Sites, business meetings, or border crossings, we ensure seamless transportation from arrival to departure.",
          ],
        },
      ]}
      closing={{
        title: "Let's Become Your Local Transportation Partner",
        text: "Whether you are a travel agency organizing cultural tours, luxury holidays, MICE events, incentive travel, educational programs, cruise extensions, or private VIP itineraries, GoLuxTrip is ready to become your trusted transportation partner in Uzbekistan. Our goal is simple: deliver the same level of service to your clients that you promise them.",
      }}
    />
  );
}
