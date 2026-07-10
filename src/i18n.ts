import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        fieldMissions: "Field Missions",
        delegations: "Delegations & Events",
        transfers: "Airport & Railway Transfers",
        fleet: "Fleet",
        projects: "Projects",
        industry: "Travel Industry Solutions",
        about: "About Us",
        contact: "Contact",
        apply: "REQUEST TRANSPORTATION",
        toggle: "Toggle navigation"
      },
      hero: {
        title: "WHERE THE\nROAD ENDS,\nWE CONTINUE.",
        text: "Reliable Transportation & Field Logistics\nfor International Organizations, Development Projects,\nOfficial Delegations and Corporate Clients\nacross Uzbekistan.",
        cta: "REQUEST TRANSPORTATION",
        secondary: "OUR SERVICES"
      },
      featuresBanner: {
        suvs: "SUVs & 4WD FLEET",
        suvsDesc: "Built for any terrain",
        remote: "REMOTE AREA EXPERTS",
        remoteDesc: "We go further",
        drivers: "EXPERIENCED DRIVERS",
        driversDesc: "Professional & reliable",
        ops: "24/7 OPERATIONS",
        opsDesc: "Always supportive",
        coverage: "NATIONWIDE COVERAGE",
        coverageDesc: "All regions of Uzbekistan"
      },
      whatWeDo: {
        kicker: "WHAT WE DO",
        title: "Transportation & Field Logistics Solutions",
        solutions: [
          {
            id: "field-missions",
            title: "FIELD MISSIONS",
            desc: "Transportation for projects in remote and challenging areas across Uzbekistan.",
            img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "delegations",
            title: "DELEGATIONS & EVENTS",
            desc: "Professional transportation for official delegations, VIPs, conferences and events.",
            img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "transfers",
            title: "AIRPORT & RAILWAY TRANSFERS",
            desc: "Reliable transfers to/from airports and railway stations, hotels and any destination.",
            img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "regional",
            title: "REGIONAL & INTERCITY TRANSPORTATION",
            desc: "Intercity travel, day trips and multi-day missions with experienced drivers.",
            img: "https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "day-trips",
            title: "DAY TRIPS",
            desc: "One-day trips, site visits, technical inspections and regional travel.",
            img: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "industry",
            title: "TRAVEL INDUSTRY SOLUTIONS",
            desc: "Trusted transportation partner for travel agencies, tour operators, DMCs and hotels.",
            img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      fleet: {
        kicker: "OUR FLEET",
        title: "Built for the Road.\nReady for the Mission.",
        text: "A wide range of SUVs, 4WDs,\nMinivans and Buses for any mission\nand group size.",
        viewAll: "VIEW FULL FLEET",
        cars: [
          {
            id: "lc200",
            name: "Toyota Land Cruiser 200",
            seats: "5",
            bags: "4",
            drive: "4WD",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtfC1YAPQ5kcKFQ6ABBoLEAsWXxhCpqcx0LiWSiHFGFj_A6nC8n8pBXD2&s=10"
          },
          {
            id: "prado",
            name: "Toyota Land Cruiser Prado",
            seats: "5",
            bags: "4",
            drive: "4WD",
            image: "https://chevrolet.uz/assets/images/tracker/colors/07.png" // Placeholder
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            seats: "7",
            bags: "7",
            drive: "A/C",
            image: "https://cdn.motor1.com/images/mgl/POJEW/s3/2021-hyundai-staria.jpg"
          },
          {
            id: "sprinter",
            name: "Black Mercedes Sprinter",
            seats: "16",
            bags: "16",
            drive: "A/C",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          },
          {
            id: "bus",
            name: "King Long Bus",
            seats: "30",
            bags: "20",
            drive: "A/C",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          }
        ]
      },
      projects: {
        kicker: "RECENT PROJECTS",
        title: "Real Missions. Real Results.",
        viewAll: "VIEW ALL PROJECTS",
        items: [
          { 
            name: "Solar Power Development Project", 
            region: "Navoi Region", 
            duration: "18 Days", 
            vehicles: "8 Vehicles", 
            distance: "4,250 km",
            img: "https://images.unsplash.com/photo-1509391366360-1282c0b435ff?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Water Resources Assessment", 
            region: "Karakalpakstan", 
            duration: "14 Days", 
            vehicles: "4 Vehicles", 
            distance: "3,120 km",
            img: "https://images.unsplash.com/photo-1437482078695-73f5d5b78044?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Highway Reconstruction Project", 
            region: "Samarkand – Bukhara", 
            duration: "21 Days", 
            vehicles: "6 Vehicles", 
            distance: "5,680 km",
            img: "https://images.unsplash.com/photo-1517036618791-32520cb2a4ee?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Environmental Monitoring Mission", 
            region: "Surkhandarya Region", 
            duration: "12 Days", 
            vehicles: "5 Vehicles", 
            distance: "2,780 km",
            img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      partners: {
        title: "TRUSTED TRANSPORTATION PARTNER FOR",
        list: [
          "International Organizations", "Development Partners", "Consulting Firms",
          "Engineering Companies", "Government Agencies", "Travel Agencies & DMCs", "Hotels & Event Organizers"
        ]
      },
      application: {
        kicker: "LET'S WORK TOGETHER",
        title: "Need Transportation\nSupport in Uzbekistan?",
        text: "Send us your request and our team\nwill come back to you shortly with the\nbest transportation solution.",
        fields: {
          organization: "Organization",
          name: "Contact Person",
          email: "Email",
          service: "Service Required",
          dates: "Travel Dates",
          route: "Regions / Cities",
          passengers: "Number of Passengers",
          upload: "Upload Itinerary (Optional)",
          message: "Additional Information"
        },
        submit: "SUBMIT REQUEST",
        sending: "SENDING...",
        success: "Inquiry sent. Our team will contact you shortly.",
        invalid: "Please complete all required fields.",
        rows: [
          "info@goluxtrip.com",
          "+998 90 123 45 67 (24/7 Operations)",
          "Monday - Sunday: 24/7 Dispatch"
        ]
      },
      footer: {
        copyright: "© 2026 GoLuxTrip. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        fieldMissions: "Полевые миссии",
        delegations: "Делегации и Мероприятия",
        transfers: "Трансферы в Аэропорт",
        fleet: "Автопарк",
        projects: "Проекты",
        industry: "Турбизнес",
        about: "О нас",
        contact: "Контакты",
        apply: "ЗАКАЗАТЬ ТРАНСПОРТ",
        toggle: "Переключить навигацию"
      },
      hero: {
        title: "ТАМ, ГДЕ ЗАКАНЧИВАЕТСЯ\nДОРОГА,\nМЫ ПРОДОЛЖАЕМ ПУТЬ.",
        text: "Надежные транспортные и логистические услуги\nдля международных организаций, проектов развития,\nофициальных делегаций и корпоративных клиентов\nпо всему Узбекистану.",
        cta: "ЗАКАЗАТЬ ТРАНСПОРТ",
        secondary: "НАШИ УСЛУГИ"
      },
      featuresBanner: {
        suvs: "ВНЕДОРОЖНИКИ 4WD",
        suvsDesc: "Для любой местности",
        remote: "ЭКСПЕРТЫ В РЕГИОНАХ",
        remoteDesc: "Мы едем дальше",
        drivers: "ОПЫТНЫЕ ВОДИТЕЛИ",
        driversDesc: "Профессионалы",
        ops: "КРУГЛОСУТОЧНО 24/7",
        opsDesc: "Всегда на связи",
        coverage: "ПОКРЫТИЕ ПО ВСЕЙ СТРАНЕ",
        coverageDesc: "Все регионы Узбекистана"
      },
      whatWeDo: {
        kicker: "ЧТО МЫ ДЕЛАЕМ",
        title: "Транспорт и полевая логистика",
        solutions: [
          {
            id: "field-missions",
            title: "ПОЛЕВЫЕ МИССИИ",
            desc: "Транспорт для проектов в отдаленных и труднодоступных районах Узбекистана.",
            img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "delegations",
            title: "ДЕЛЕГАЦИИ И МЕРОПРИЯТИЯ",
            desc: "Профессиональный транспорт для официальных делегаций, VIP, конференций и событий.",
            img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "transfers",
            title: "ТРАНСФЕРЫ (АЭРОПОРТ И ВОКЗАЛ)",
            desc: "Надежные трансферы из/в аэропорты, ж/д вокзалы, гостиницы и по любому адресу.",
            img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "regional",
            title: "РЕГИОНАЛЬНЫЕ ПОЕЗДКИ",
            desc: "Междугородние поездки, однодневные туры и многодневные командировки с опытными водителями.",
            img: "https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "day-trips",
            title: "ОДНОДНЕВНЫЕ ТУРЫ",
            desc: "Однодневные поездки, посещение объектов, технические инспекции и региональные выезды.",
            img: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "industry",
            title: "РЕШЕНИЯ ДЛЯ ТУРБИЗНЕСА",
            desc: "Надежный транспортный партнер для турагентств, туроператоров, DMC и гостиниц.",
            img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      fleet: {
        kicker: "НАШ АВТОПАРК",
        title: "Созданы для дорог.\nГотовы к миссиям.",
        text: "Широкий выбор внедорожников 4WD,\nминивэнов и автобусов для любых\nзадач и групп.",
        viewAll: "СМОТРЕТЬ ВЕСЬ ПАРК",
        cars: [
          {
            id: "lc200",
            name: "Toyota Land Cruiser 200",
            seats: "5",
            bags: "4",
            drive: "4WD",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtfC1YAPQ5kcKFQ6ABBoLEAsWXxhCpqcx0LiWSiHFGFj_A6nC8n8pBXD2&s=10"
          },
          {
            id: "prado",
            name: "Toyota Land Cruiser Prado",
            seats: "5",
            bags: "4",
            drive: "4WD",
            image: "https://chevrolet.uz/assets/images/tracker/colors/07.png" // Placeholder
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            seats: "7",
            bags: "7",
            drive: "A/C",
            image: "https://cdn.motor1.com/images/mgl/POJEW/s3/2021-hyundai-staria.jpg"
          },
          {
            id: "sprinter",
            name: "Black Mercedes Sprinter",
            seats: "16",
            bags: "16",
            drive: "A/C",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          },
          {
            id: "bus",
            name: "King Long Bus",
            seats: "30",
            bags: "20",
            drive: "A/C",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          }
        ]
      },
      projects: {
        kicker: "ПОСЛЕДНИЕ ПРОЕКТЫ",
        title: "Реальные миссии. Реальные результаты.",
        viewAll: "СМОТРЕТЬ ВСЕ ПРОЕКТЫ",
        items: [
          { 
            name: "Проект солнечной энергетики", 
            region: "Навоийская область", 
            duration: "18 Дней", 
            vehicles: "8 Авто", 
            distance: "4,250 км",
            img: "https://images.unsplash.com/photo-1509391366360-1282c0b435ff?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Оценка водных ресурсов", 
            region: "Каракалпакстан", 
            duration: "14 Дней", 
            vehicles: "4 Авто", 
            distance: "3,120 км",
            img: "https://images.unsplash.com/photo-1437482078695-73f5d5b78044?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Реконструкция автомагистрали", 
            region: "Самарканд – Бухара", 
            duration: "21 День", 
            vehicles: "6 Авто", 
            distance: "5,680 км",
            img: "https://images.unsplash.com/photo-1517036618791-32520cb2a4ee?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Экологический мониторинг", 
            region: "Сурхандарья", 
            duration: "12 Дней", 
            vehicles: "5 Авто", 
            distance: "2,780 км",
            img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      partners: {
        title: "НАМ ДОВЕРЯЮТ",
        list: [
          "Международные организации", "Партнеры по развитию", "Консалтинговые фирмы",
          "Инжиниринговые компании", "Государственные учреждения", "Турагентства и DMC", "Организаторы мероприятий"
        ]
      },
      application: {
        kicker: "ДЛЯ СОТРУДНИЧЕСТВА",
        title: "Нужна транспортная\nподдержка в Узбекистане?",
        text: "Отправьте запрос, и наша команда\nвскоре свяжется с вами, предложив\nлучшее логистическое решение.",
        fields: {
          organization: "Организация",
          name: "Контактное лицо",
          email: "Электронная почта",
          service: "Требуемая услуга",
          dates: "Даты поездки",
          route: "Регионы / Города",
          passengers: "Количество пассажиров",
          upload: "Прикрепить маршрут (необязательно)",
          message: "Дополнительная информация"
        },
        submit: "ОТПРАВИТЬ ЗАПРОС",
        sending: "ОТПРАВКА...",
        success: "Запрос отправлен. Наша команда свяжется с вами в ближайшее время.",
        invalid: "Пожалуйста, заполните все обязательные поля.",
        rows: [
          "info@goluxtrip.com",
          "+998 90 123 45 67 (Служба диспетчеров 24/7)",
          "Понедельник - Воскресенье: 24/7"
        ]
      },
      footer: {
        copyright: "© 2026 GoLuxTrip. Все права защищены.",
        privacy: "Политика конфиденциальности",
        terms: "Правила и условия"
      }
    }
  },
  uz: {
    translation: {
      nav: {
        home: "Asosiy",
        fieldMissions: "Dala missiyalari",
        delegations: "Delegatsiyalar va Tadbirlar",
        transfers: "Aeroport Transferlari",
        fleet: "Avtopark",
        projects: "Loyihalar",
        industry: "Turizm uchun yechimlar",
        about: "Biz haqimizda",
        contact: "Aloqa",
        apply: "TRANSPORT BUYURTMA QILISH",
        toggle: "Menyuni ochish"
      },
      hero: {
        title: "YO'L TUGAGAN\nJOYDA,\nBIZ DAVOM ETAMIZ.",
        text: "Xalqaro tashkilotlar, rivojlanish loyihalari,\nrasmiy delegatsiyalar va korporativ mijozlar uchun\nO'zbekiston bo'ylab ishonchli transport va dala logistikasi.",
        cta: "TRANSPORT SO'RASH",
        secondary: "XIZMATLARIMIZ"
      },
      featuresBanner: {
        suvs: "4WD YO'LTANLAMASLAR",
        suvsDesc: "Har qanday yo'l uchun",
        remote: "HUDUDIY EKSPERTLAR",
        remoteDesc: "Biz uzoqroqqa boramiz",
        drivers: "TAJRIBALI HAYDOVCHILAR",
        driversDesc: "Professional va ishonchli",
        ops: "24/7 QO'LLAB-QUVVATLASH",
        opsDesc: "Har doim aloqada",
        coverage: "BUTUN RESPUBLIKA BO'YLAB",
        coverageDesc: "O'zbekistonning barcha hududlari"
      },
      whatWeDo: {
        kicker: "BIZ NIMA QILAMIZ",
        title: "Transport va Dala Logistikasi Yechimlari",
        solutions: [
          {
            id: "field-missions",
            title: "DALA MISSIYALARI",
            desc: "O'zbekistonning chekka va borish qiyin bo'lgan hududlaridagi loyihalar uchun transport.",
            img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "delegations",
            title: "DELEGATSIYALAR VA TADBIRLAR",
            desc: "Rasmiy delegatsiyalar, VIP mehmonlar, konferensiyalar va tadbirlar uchun professional transport.",
            img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "transfers",
            title: "AEROPORT VA VOKZAL TRANSFERLARI",
            desc: "Aeroportlar, poezd vokzallari, mehmonxonalar va istalgan manzilga ishonchli transferlar.",
            img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "regional",
            title: "HUDUDIY VA SHAHARLARARO SAFARLAR",
            desc: "Tajribali haydovchilar bilan shaharlararo safarlar, bir kunlik va ko'p kunlik missiyalar.",
            img: "https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "day-trips",
            title: "BIR KUNLIK SAFARLAR",
            desc: "Bir kunlik sayohatlar, obyektlarni ko'rish, texnik tekshiruvlar va hududiy safarlar.",
            img: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=600"
          },
          {
            id: "industry",
            title: "TURIZM UCHUN YECHIMLAR",
            desc: "Turistik agentliklar, turoperatorlar, DMC va mehmonxonalar uchun ishonchli transport hamkori.",
            img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      fleet: {
        kicker: "BIZNING AVTOPARK",
        title: "Yo'l uchun yaratilgan.\nMissiyaga tayyor.",
        text: "Har qanday vazifa va guruh uchun\nkeng turdagi 4WD yo'ltanlamaslar,\nminivenlar va avtobuslar.",
        viewAll: "BARCHA AVTOPARKNI KO'RISH",
        cars: [
          {
            id: "lc200",
            name: "Toyota Land Cruiser 200",
            seats: "5",
            bags: "4",
            drive: "4WD",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtfC1YAPQ5kcKFQ6ABBoLEAsWXxhCpqcx0LiWSiHFGFj_A6nC8n8pBXD2&s=10"
          },
          {
            id: "prado",
            name: "Toyota Land Cruiser Prado",
            seats: "5",
            bags: "4",
            drive: "4WD",
            image: "https://chevrolet.uz/assets/images/tracker/colors/07.png" // Placeholder
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            seats: "7",
            bags: "7",
            drive: "A/C",
            image: "https://cdn.motor1.com/images/mgl/POJEW/s3/2021-hyundai-staria.jpg"
          },
          {
            id: "sprinter",
            name: "Black Mercedes Sprinter",
            seats: "16",
            bags: "16",
            drive: "A/C",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          },
          {
            id: "bus",
            name: "King Long Bus",
            seats: "30",
            bags: "20",
            drive: "A/C",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          }
        ]
      },
      projects: {
        kicker: "SO'NGGI LOYIHALAR",
        title: "Haqiqiy missiyalar. Haqiqiy natijalar.",
        viewAll: "BARCHA LOYIHALARNI KO'RISH",
        items: [
          { 
            name: "Quyosh energetikasi loyihasi", 
            region: "Navoiy viloyati", 
            duration: "18 Kun", 
            vehicles: "8 Ta avto", 
            distance: "4,250 km",
            img: "https://images.unsplash.com/photo-1509391366360-1282c0b435ff?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Suv resurslarini baholash", 
            region: "Qoraqalpog'iston", 
            duration: "14 Kun", 
            vehicles: "4 Ta avto", 
            distance: "3,120 km",
            img: "https://images.unsplash.com/photo-1437482078695-73f5d5b78044?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Avtomagistral rekonstruksiyasi", 
            region: "Samarqand – Buxoro", 
            duration: "21 Kun", 
            vehicles: "6 Ta avto", 
            distance: "5,680 km",
            img: "https://images.unsplash.com/photo-1517036618791-32520cb2a4ee?auto=format&fit=crop&q=80&w=600"
          },
          { 
            name: "Ekologik monitoring", 
            region: "Surxondaryo", 
            duration: "12 Kun", 
            vehicles: "5 Ta avto", 
            distance: "2,780 km",
            img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      partners: {
        title: "ISHONCHLI TRANSPORT HAMKORI",
        list: [
          "Xalqaro Tashkilotlar", "Rivojlanish Hamkorlari", "Konsalting Firmalari",
          "Muhandislik Kompaniyalari", "Davlat Tashkilotlari", "Turistik Agentliklar va DMC", "Tadbir Tashkilotchilari"
        ]
      },
      application: {
        kicker: "HAMKORLIK UCHUN",
        title: "O'zbekistonda transport\nyordami kerakmi?",
        text: "So'rovingizni yuboring va jamoamiz\ntez orada eng yaxshi logistika\nyechimi bilan sizga aloqaga chiqadi.",
        fields: {
          organization: "Tashkilot",
          name: "Aloqa qiluvchi shaxs",
          email: "Elektron pochta",
          service: "Kerakli xizmat",
          dates: "Safar sanalari",
          route: "Hududlar / Shaharlar",
          passengers: "Yo'lovchilar soni",
          upload: "Marshrutni yuklash (majburiy emas)",
          message: "Qo'shimcha ma'lumot"
        },
        submit: "SO'ROV YUBORISH",
        sending: "YUBORILMOQDA...",
        success: "So'rov yuborildi. Tez orada bizning jamoamiz siz bilan bog'lanadi.",
        invalid: "Iltimos, barcha majburiy maydonlarni to'ldiring.",
        rows: [
          "info@goluxtrip.com",
          "+998 90 123 45 67 (24/7 Navbatchi xizmat)",
          "Dushanba - Yakshanba: 24/7"
        ]
      },
      footer: {
        copyright: "© 2026 GoLuxTrip. Barcha huquqlar himoyalangan.",
        privacy: "Maxfiylik siyosati",
        terms: "Foydalanish shartlari"
      }
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
