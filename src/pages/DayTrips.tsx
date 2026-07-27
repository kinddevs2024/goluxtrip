import ServiceDetailPage from "../components/ServiceDetailPage";

export default function DayTrips() {
  return (
    <ServiceDetailPage
      kicker="Day Trips"
      title="Day Trips, Mountain Resorts & Event Transportation"
      subtitle="Private day trips and group transportation across Uzbekistan for families, companies, teams, and organized events."
      heroImage="/services/day-trips-hero.webp"
      heroPosition="center 54%"
      requestService="Day Trips & Mountain Resorts"
      intro={[
        "GoLuxTrip provides professional day trip transportation, mountain resort transfers, and group event logistics for tourists, corporate companies, sports teams, international organizations, schools, and private travelers throughout Uzbekistan.",
        "Whether you are planning a weekend escape to the mountains, a corporate team-building retreat, a sporting event, or a private sightseeing tour, we provide safe, comfortable, and reliable transportation tailored to your schedule.",
      ]}
      sections={[
        {
          title: "Our Services",
          image: "/services/day-trips-coach.webp",
          imageAlt: "GoLuxTrip coaches prepared for group transportation",
          imagePosition: "right",
          bullets: [
            "Private Day Trips",
            "Mountain Resort Transfers",
            "Family & Group Excursions",
            "Corporate Team Building Transportation",
            "Company Retreats & Off-Site Meetings",
            "Sports Team Transportation",
            "Tournament & Competition Transfers",
            "Event Shuttle Services",
            "Private Chauffeur Services",
            "Multi-Day Tours",
          ],
        },
        {
          title: "Popular Destinations",
          lead: "Daily transportation from Tashkent to Uzbekistan's most popular mountain and leisure destinations.",
          image: "/services/day-trips-mountain-van.webp",
          imageAlt: "Mercedes-Benz van on a mountain road in Uzbekistan",
          imagePosition: "left",
          bullets: [
            "Chimgan Mountains",
            "Amirsoy Mountain Resort",
            "Beldersay Resort",
            "Charvak Lake",
            "Chorvoq Reservoir",
            "Bostanliq District",
            "Xumson (Khumson)",
            "Gazalkent",
            "Oqtosh",
            "Nanay Village",
            "Parkent",
            "Ugam-Chatkal National Park",
          ],
          paragraphs: [
            "Whether you are planning a ski trip, hiking adventure, lakeside getaway, corporate retreat, or family outing, we will get you there comfortably and safely.",
          ],
        },
        {
          title: "Corporate Events & Team Building",
          paragraphs: [
            "We are a trusted transportation partner for companies organizing executive retreats, team-building events, leadership workshops, company off-site meetings, employee appreciation trips, business networking events, outdoor corporate activities, and incentive travel programs.",
            "From small executive groups to large company outings, we coordinate transportation using executive sedans, SUVs, luxury vans, minibuses, and coaches.",
          ],
          bullets: [
            "Corporate Team Building Events",
            "Executive Retreats",
            "Company Off-Site Meetings",
            "Leadership Workshops",
            "Employee Appreciation Trips",
            "Business Networking Events",
            "Outdoor Corporate Activities",
            "Incentive Travel Programs",
          ],
        },
        {
          title: "Sports & Group Events",
          groups: [
            {
              title: "Group Transportation",
              items: [
                "Sports Teams",
                "Football & Basketball Tournaments",
                "Cycling & Running Events",
                "International Competitions",
                "School & University Groups",
                "Cultural Festivals",
                "Conferences & Group Excursions",
              ],
            },
            {
              title: "Comfortable Fleet",
              items: [
                "Executive Sedans",
                "Premium SUVs",
                "Mercedes-Benz V-Class",
                "Hyundai Staria",
                "Mercedes-Benz Sprinter",
                "Tourist Minibuses",
                "Coaches for Large Groups",
              ],
            },
          ],
        },
        {
          title: "Why GoLuxTrip?",
          checks: [
            "Professional Drivers",
            "Comfortable Modern Fleet",
            "Flexible Itineraries",
            "Door-to-Door Service",
            "Corporate & Group Transportation Specialists",
            "Team Building & Event Logistics",
            "Year-Round Mountain Resort Transfers",
            "Nationwide Coverage",
            "24/7 Support",
          ],
        },
      ]}
      closing={{
        title: "Discover the Mountains of Uzbekistan",
        text: "Whether you are heading to Amirsoy Mountain Resort, exploring the Chimgan Mountains, relaxing at Charvak Lake, organizing a corporate team-building retreat, or transporting athletes to a regional tournament, GoLuxTrip provides dependable transportation designed for comfort, safety, and memorable experiences.",
      }}
    />
  );
}
