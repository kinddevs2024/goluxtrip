import ServiceDetailPage from "../components/ServiceDetailPage";

export default function Transfers() {
  return (
    <ServiceDetailPage
      kicker="Airport & Railway Transfers"
      title="Airport, Railway Station & Private Transfers in Uzbekistan"
      subtitle="Reliable airport and railway transfers across Uzbekistan, coordinated around your arrival and onward itinerary."
      heroImage="/services/airport-railway-transfers-hero.webp"
      heroPosition="center 52%"
      requestService="Airport & Railway Transfers"
      intro={[
        "GoLuxTrip provides professional airport transfers, railway station pickups, private chauffeur services, and long-distance transportation throughout Uzbekistan.",
        "Whether you are arriving for a business mission, an international project, or a private holiday, our experienced drivers ensure a smooth, safe, and comfortable journey. From international airports and railway stations to hotels, project sites, border crossing points, and tourist attractions, we deliver transportation tailored to your schedule.",
      ]}
      sections={[
        {
          title: "Our Transfer Services",
          bullets: [
            "Airport Pick-up & Drop-off",
            "Railway Station Transfers",
            "Hotel Transfers",
            "Border Crossing Transfers",
            "Project Site Transportation",
            "Private City Transfers",
            "Intercity Transportation",
            "Daily Chauffeur Services",
            "Sightseeing & Private Tours",
            "VIP Airport Meet & Greet",
          ],
        },
        {
          title: "Airports & Railway Stations We Serve",
          groups: [
            {
              title: "Airports",
              items: [
                "Tashkent International Airport (TAS)",
                "Samarkand International Airport (SKD)",
                "Bukhara International Airport (BHK)",
                "Urgench International Airport (UGC)",
                "Nukus International Airport (NCU)",
                "Fergana International Airport (FEG)",
                "Namangan International Airport (NMA)",
                "Andijan International Airport (AZN)",
                "Navoi International Airport (NVI)",
                "Termez International Airport (TMJ)",
                "Karshi International Airport (KSQ)",
              ],
            },
            {
              title: "Railway Stations",
              items: [
                "Tashkent Railway Station",
                "Samarkand Railway Station",
                "Bukhara Railway Station",
                "Shahrisabz Railway Station",
                "Navoi Railway Station",
                "Karshi Railway Station",
                "Urgench Railway Station",
                "Khiva Railway Station",
                "Nukus Railway Station",
                "Fergana Railway Station",
                "Andijan Railway Station",
                "Namangan Railway Station",
              ],
            },
          ],
        },
        {
          title: "Why GoLuxTrip?",
          checks: [
            "Flight & Train Schedule Monitoring",
            "Professional Chauffeurs",
            "English-Speaking Drivers Available",
            "Fixed & Transparent Pricing",
            "Comfortable SUVs, Sedans & Minivans",
            "24/7 Airport & Railway Transfers",
          ],
        },
      ]}
      closing={{
        title: "Travel Comfortably Across Uzbekistan",
        text: "Whether you are arriving at Tashkent Airport, Samarkand Railway Station, Urgench Airport, or Nukus Railway Station, GoLuxTrip is ready to take you safely to your hotel, business meeting, project site, border crossing, or the country's most iconic destinations.",
      }}
    />
  );
}
