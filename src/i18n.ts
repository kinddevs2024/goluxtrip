import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        fieldMissions: "Field Missions",
        delegations: "Delegations & Events",
        transfers: "Transfers",
        fleet: "Fleet",
        projects: "Projects",
        industry: "Travel Industry",
        about: "About Us",
        contact: "Contact",
        apply: "Request Transportation",
        toggle: "Toggle navigation"
      },
      hero: {
        badge: "Transportation & Field Logistics Partner",
        title: "Where the Road Ends, We Continue.",
        text: "Reliable Transportation & Field Logistics for International Organizations, Development Projects, Official Delegations and Corporate Clients across Uzbekistan.",
        cta: "Request Transportation",
        secondary: "View Fleet",
        stats: ["Field Missions", "Official Delegations", "Airport & Railway Transfers"]
      },
      homeSections: {
        fieldMissions: {
          kicker: "Core Expertise",
          title: "Field Missions & Projects",
          text: "We provide specialized transportation for remote project sites, mining operations, and solar farms. Our 4WD vehicles and experienced drivers ensure safe passage through rugged terrains.",
          cta: "Explore Field Missions"
        },
        delegations: {
          kicker: "VIP Services",
          title: "Official Delegations & Events",
          text: "High-level transportation for government delegations, VIP visitors, and international conferences. We offer seamless coordination, airport meet & greet, and multi-vehicle convoys.",
          cta: "Learn More"
        },
        projects: {
          kicker: "Track Record",
          title: "Proven Operational Experience",
          text: "Trusted by international organizations. We have successfully supported major infrastructure, environmental, and geological projects across all regions of Uzbekistan.",
          cta: "View Our Projects"
        },
        about: {
          kicker: "About Us",
          title: "Your Reliable Logistics Partner",
          text: "With 24/7 coordination, stringent vehicle standards, and a nationwide network, GoLuxTrip is the definitive choice for corporate transportation in Uzbekistan.",
          cta: "Read More About Us"
        }
      },
      fleet: {
        kicker: "Fleet",
        title: "Specialized vehicles for regional and project transportation.",
        text: "Our fleet consists of Comfort, Premium, and Business class sedans, SUVs, 4WDs, Minivans, and Buses.",
        request: "Request this vehicle",
        cars: [
          {
            id: "cobalt",
            name: "Chevrolet Cobalt",
            category: "Comfort Sedan",
            price: "Contact for pricing",
            seats: "3-4 passengers",
            transmission: "Automatic",
            range: "City trips and regional transportation",
            image: "https://chevrolet.uz/assets/images/cobalt/colours/1.png"
          },
          {
            id: "tracker",
            name: "Chevrolet Tracker",
            category: "Compact SUV",
            price: "Contact for pricing",
            seats: "3-4 passengers",
            transmission: "Automatic",
            range: "Urban and light off-road",
            image: "https://chevrolet.uz/assets/images/tracker/colors/07.png"
          },
          {
            id: "k5",
            name: "Kia K5",
            category: "Premium Sedan",
            price: "Contact for pricing",
            seats: "3-4 passengers",
            transmission: "Automatic",
            range: "VIP & Corporate intercity travel",
            image: "https://cdn.motor1.com/images/mgl/bgBOz6/s1/2025-kia-k5.jpg"
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            category: "Premium Minivan",
            price: "Contact for pricing",
            seats: "7-9 passengers",
            transmission: "Automatic",
            range: "Delegations, Groups, Airport transfers",
            image: "https://cdn.motor1.com/images/mgl/POJEW/s3/2021-hyundai-staria.jpg"
          },
          {
            id: "lc250",
            name: "Toyota Land Cruiser",
            category: "Heavy Duty 4WD",
            price: "Contact for pricing",
            seats: "4 passengers",
            transmission: "Automatic",
            range: "Field missions, remote project sites",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtfC1YAPQ5kcKFQ6ABBoLEAsWXxhCpqcx0LiWSiHFGFj_A6nC8n8pBXD2&s=10"
          },
          {
            id: "coaster",
            name: "Minibus",
            category: "Group Transportation",
            price: "Contact for pricing",
            seats: "15-20 passengers",
            transmission: "Automatic/Manual",
            range: "Conference transportation",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          }
        ]
      },
      pages: {
        fieldMissions: {
          title: "Field Missions",
          subtitle: "Trusted transportation for remote and complex projects.",
          features: [
            { title: "Development Projects", desc: "Logistics for IFIs and international development initiatives." },
            { title: "Energy & Infrastructure", desc: "Access to Solar & Wind Farms, Water Management facilities." },
            { title: "Technical Missions", desc: "Geological surveys, Mining operations, and Engineering inspections." },
            { title: "Rural & Agriculture", desc: "Navigation through remote agricultural areas and government inspections." }
          ],
          highlights: ["SUVs & 4WD Vehicles", "Experienced Drivers", "Regional Expertise", "Multi-day Missions", "24/7 Operational Support"]
        },
        delegations: {
          title: "Official Delegations & Events",
          subtitle: "Premium transportation for high-level meetings and VIP guests.",
          features: [
            { title: "Government Delegations", desc: "Secure and protocol-compliant transportation." },
            { title: "Conferences & Forums", desc: "Multi-vehicle coordination for large-scale events." },
            { title: "Corporate Meetings", desc: "Business-class sedans and minivans for executives." }
          ],
          services: ["Airport Meet & Greet", "Hotel Transfers", "Shuttle Services", "Multi-Vehicle Coordination"]
        },
        transfers: {
          title: "Airport & Railway Transfers",
          subtitle: "Professional meet and greet services across Uzbekistan.",
          text: "We provide punctual and reliable transfers to and from all major airports and railway stations, including Tashkent, Samarkand, Bukhara, and Urgench. Our drivers meet you with a nameboard, assist with luggage, and ensure a comfortable ride to your hotel or office."
        },
        projects: {
          title: "Completed Projects",
          subtitle: "Real operational experience across various sectors.",
          items: [
            { name: "Solar Power Development Project", region: "Navoi & Surkhandarya", duration: "14 Days", vehicles: "Heavy Duty 4WDs" },
            { name: "Water Resources Assessment", region: "Karakalpakstan", duration: "7 Days", vehicles: "SUVs & Minivans" },
            { name: "International Conference", region: "Tashkent & Samarkand", duration: "5 Days", vehicles: "Premium Minivans & Buses" },
            { name: "Geological Survey", region: "Navoi", duration: "21 Days", vehicles: "Off-road 4WDs" }
          ]
        },
        industry: {
          title: "Travel Industry Solutions",
          subtitle: "Your trusted local transportation partner.",
          text: "We collaborate with International Travel Agencies, Tour Operators, Destination Management Companies (DMCs), and Hotels to provide seamless travel experiences for their clients.",
          partners: ["International & Local Travel Agencies", "Tour Operators", "DMCs", "Hotels & Concierge Companies", "Corporate Travel Managers"]
        },
        about: {
          title: "About GoLuxTrip",
          subtitle: "The digital headquarters for field logistics in Uzbekistan.",
          text: "GoLuxTrip is not a taxi company. We are a specialized logistics provider ensuring reliable transportation for the most demanding assignments.",
          pillars: [
            { title: "Driver Quality Assurance", desc: "Rigorous vetting, regular training, and strict adherence to safety protocols." },
            { title: "Vehicle Quality Standards", desc: "Modern, meticulously maintained fleet equipped for both city and off-road travel." },
            { title: "24/7 Coordination", desc: "Our dispatch and support team monitors all missions round-the-clock." },
            { title: "Nationwide Network", desc: "Operating in all 14 regions of Uzbekistan, from Tashkent to Nukus." }
          ]
        }
      },
      application: {
        kicker: "Contact",
        title: "Request Transportation Services",
        text: "Submit your inquiry. Our coordination team will provide a tailored logistics proposal.",
        rows: ["Corporate inquiries", "Long-term support", "Multi-vehicle coordination"],
        fields: {
          name: "Contact Person",
          email: "Email",
          phone: "Phone / WhatsApp",
          dates: "Travel Dates",
          route: "Regions / Cities",
          message: "Additional Information (Optional)",
          organization: "Organization",
          service: "Service Required",
          passengers: "Number of Passengers"
        },
        placeholders: {
          name: "Your Name",
          email: "name@organization.org",
          phone: "+998 ...",
          dates: "May 12-20, 2026",
          route: "Tashkent - Navoi - Bukhara",
          message: "Itinerary details, special requirements, terrain conditions, etc.",
          organization: "World Bank, UN, etc.",
          service: "Field Mission, Delegation, Transfer...",
          passengers: "Number of people"
        },
        submit: "Send Inquiry",
        sending: "Sending...",
        success: "Inquiry sent. Our team will contact you shortly.",
        invalid: "Please complete all required fields.",
        errors: {
          name: "Enter contact person name",
          email: "Enter a valid email",
          phone: "Enter a phone number",
          car: "Choose a vehicle category",
          dates: "Add travel dates",
          route: "Tell us the regions",
          organization: "Enter your organization",
          service: "Specify required service",
          passengers: "Specify number of passengers"
        }
      },
      footer: "GoLuxTrip - Official Transportation & Field Logistics Partner in Uzbekistan."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
