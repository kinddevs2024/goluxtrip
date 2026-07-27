import ServiceDetailPage from "../components/ServiceDetailPage";

export default function Delegations() {
  return (
    <ServiceDetailPage
      kicker="Delegations & Events"
      title="VIP Delegations & Executive Event Transportation"
      subtitle="Premium ground transportation for government, diplomatic, and corporate delegations in Uzbekistan."
      heroImage="/services/delegations-events-hero.webp"
      heroPosition="center 52%"
      requestService="VIP Delegations & Events"
      intro={[
        "GoLuxTrip provides VIP delegation transportation, executive chauffeur services, and official event logistics for ministry-level visits, international conferences, diplomatic missions, corporate events, and high-level delegations across Uzbekistan.",
        "We coordinate premium transportation for senior officials, executives, international experts, speakers, protocol teams, and invited guests, ensuring punctuality, discretion, comfort, and professional presentation throughout the visit.",
      ]}
      sections={[
        {
          title: "Our Services",
          bullets: [
            "VIP delegation transportation",
            "Ministry and government visit logistics",
            "Diplomatic and embassy transfers",
            "Executive airport meet-and-greet",
            "Conference and summit transportation",
            "Official ceremony transportation",
            "Corporate event chauffeur services",
            "Multi-vehicle convoy coordination",
            "Hotel, airport, and venue transfers",
            "Full-day and multi-day executive transport",
          ],
        },
        {
          title: "Executive Fleet",
          lead: "Premium vehicles selected for protocol teams, senior officials, and invited guests.",
          bullets: [
            "Mercedes-Benz S-Class",
            "Mercedes-Benz V-Class",
            "Mercedes-Benz Sprinter",
            "Premium executive sedans",
            "Luxury minivans",
            "Business-class vehicles for protocol teams",
          ],
        },
        {
          title: "Nationwide Coverage",
          paragraphs: [
            "We support executive visits and major events in Tashkent, Samarkand, Bukhara, Khiva, Navoi, Nukus, Fergana, Andijan, Namangan, Termez, and throughout all regions of Uzbekistan.",
          ],
          checks: [
            "Experienced executive drivers",
            "Discreet and professional service",
            "Premium vehicles for VIP guests",
            "Multi-vehicle and convoy coordination",
            "Flexible schedules and last-minute changes",
            "Airport, hotel, ministry, and venue transfers",
          ],
        },
      ]}
      closing={{
        title: "Trusted Executive Transportation Partner",
        text: "Whether you are organizing a ministerial delegation, diplomatic visit, international conference, investment forum, corporate roadshow, official ceremony, or high-level business event, GoLuxTrip delivers reliable luxury transportation tailored to protocol, security, and guest-comfort requirements.",
      }}
    />
  );
}
