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
      process: {
        kicker: "About Us",
        title: "Your trusted logistics partner.",
        text: "We provide 24/7 coordination, driver quality assurance, and high vehicle standards for IFIs, UN Agencies, and corporate clients.",
        steps: [
          ["Nationwide Coverage", "Transportation throughout Uzbekistan including remote villages, industrial facilities, and desert sites."],
          ["24/7 Operations", "Dedicated support team ensuring seamless coordination round-the-clock."],
          ["Quality Assurance", "Rigorous driver selection and vehicle maintenance protocols."]
        ]
      },
      routes: {
        kicker: "Services",
        title: "Comprehensive Field Logistics.",
        text: "We are not a taxi company. We support complex missions, long-term operations, and high-level delegations.",
        cta: "See our Projects",
        routeIdea: "Core Services:",
        items: ["Field Missions", "Official Delegations", "Airport Transfers", "Regional Transportation", "Travel Industry Solutions", "Conferences & Events"]
      },
      trust: {
        kicker: "Why GoLuxTrip",
        title: "Operational capability you can trust.",
        items: [
          ["Expertise", "Proven track record supporting Solar Farms, Mining Operations, and Geological Surveys."],
          ["Reliability", "Multi-day missions with experienced drivers trained for rugged terrains."],
          ["Professionalism", "Meet & Greet services for VIPs, Embassies, and International Organizations."]
        ]
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
          message: "Additional Information",
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
