import ServiceDetailPage from "../components/ServiceDetailPage";

export default function Regional() {
  return (
    <ServiceDetailPage
      kicker="Regional & Intercity Transportation"
      title="Regional & Intercity Transportation Across Uzbekistan"
      subtitle="Safe, reliable, and professional transportation throughout every region of Uzbekistan."
      heroImage="/services/regional-intercity-hero.webp"
      heroPosition="center 58%"
      requestService="Regional & Intercity Transportation"
      intro={[
        "GoLuxTrip provides regional and intercity transportation for international organizations, government agencies, consulting firms, engineering companies, NGOs, corporate clients, and private travelers across every region of Uzbekistan.",
        "Whether your destination is a project site, industrial facility, government office, power plant, border crossing point, airport, railway station, or remote village, our experienced drivers ensure safe, comfortable, and punctual transportation tailored to your itinerary.",
      ]}
      sections={[
        {
          title: "Our Transportation Services",
          image: "/services/regional-remote-convoy.webp",
          imageAlt: "GoLuxTrip vehicles coordinating travel on a remote route",
          imagePosition: "right",
          bullets: [
            "Regional Transportation",
            "Intercity Transfers",
            "Business Travel",
            "Field Mission Transportation",
            "Project Site Visits",
            "Factory & Industrial Visits",
            "Power Plant Transportation",
            "Government & Ministry Meetings",
            "Stakeholder & Community Meetings",
            "Border Crossing Transfers",
            "Airport & Railway Connections",
            "Daily Chauffeur Services",
            "Multi-Day Transportation",
            "Customized Travel Itineraries",
          ],
        },
        {
          title: "Nationwide Coverage",
          bullets: [
            "Tashkent",
            "Samarkand",
            "Bukhara",
            "Navoi",
            "Khorezm",
            "Nukus",
            "Karakalpakstan",
            "Jizzakh",
            "Kashkadarya",
            "Surkhandarya",
            "Fergana",
            "Andijan",
            "Namangan",
            "Syrdarya",
            "Chirchik",
          ],
        },
        {
          title: "Professional Fleet",
          image: "/services/regional-fleet.webp",
          imageAlt: "GoLuxTrip fleet of sedans, SUVs, minivans, Sprinters, and coaches",
          imagePosition: "full",
          bullets: [
            "Sedans",
            "Premium SUVs",
            "4WD Vehicles",
            "Luxury Minivans",
            "Mercedes-Benz V-Class",
            "Mercedes-Benz Sprinter",
            "Coaches for Large Groups",
          ],
        },
      ]}
      closing={{
        title: "One Transportation Partner for Every Region",
        text: "From city-to-city business travel to remote project access, GoLuxTrip coordinates the right vehicle, driver, and schedule for your itinerary anywhere in Uzbekistan.",
      }}
    />
  );
}
