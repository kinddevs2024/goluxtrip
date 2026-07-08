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
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        fieldMissions: "Полевые миссии",
        delegations: "Делегации и Мероприятия",
        transfers: "Трансферы",
        fleet: "Автопарк",
        projects: "Проекты",
        industry: "Для турбизнеса",
        about: "О нас",
        contact: "Контакты",
        apply: "Заказать транспорт",
        toggle: "Переключить меню"
      },
      hero: {
        badge: "Ваш партнер по транспорту и логистике",
        title: "Там, где заканчивается дорога, мы продолжаем путь.",
        text: "Надежные транспортные и логистические услуги для международных организаций, проектов развития, официальных делегаций и корпоративных клиентов по всему Узбекистану.",
        cta: "Запросить транспорт",
        secondary: "Смотреть автопарк",
        stats: ["Полевые миссии", "Официальные делегации", "Трансферы в аэропорт и на вокзал"]
      },
      fleet: {
        kicker: "Автопарк",
        title: "Специализированные автомобили для региональных и проектных поездок.",
        text: "Наш автопарк состоит из седанов Комфорт, Премиум и Бизнес класса, внедорожников, минивэнов и автобусов.",
        request: "Заказать этот автомобиль",
        cars: [
          {
            id: "cobalt",
            name: "Chevrolet Cobalt",
            category: "Седан Комфорт",
            price: "Цена по запросу",
            seats: "3-4 пассажира",
            transmission: "Автомат",
            range: "Городские и региональные поездки",
            image: "https://chevrolet.uz/assets/images/cobalt/colours/1.png"
          },
          {
            id: "tracker",
            name: "Chevrolet Tracker",
            category: "Компактный кроссовер",
            price: "Цена по запросу",
            seats: "3-4 пассажира",
            transmission: "Автомат",
            range: "Город и легкое бездорожье",
            image: "https://chevrolet.uz/assets/images/tracker/colors/07.png"
          },
          {
            id: "k5",
            name: "Kia K5",
            category: "Премиум Седан",
            price: "Цена по запросу",
            seats: "3-4 пассажира",
            transmission: "Автомат",
            range: "VIP и Корпоративные междугородние поездки",
            image: "https://cdn.motor1.com/images/mgl/bgBOz6/s1/2025-kia-k5.jpg"
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            category: "Премиум Минивэн",
            price: "Цена по запросу",
            seats: "7-9 пассажиров",
            transmission: "Автомат",
            range: "Делегации, Группы, Трансферы",
            image: "https://cdn.motor1.com/images/mgl/POJEW/s3/2021-hyundai-staria.jpg"
          },
          {
            id: "lc250",
            name: "Toyota Land Cruiser",
            category: "Тяжелый внедорожник 4WD",
            price: "Цена по запросу",
            seats: "4 пассажира",
            transmission: "Автомат",
            range: "Полевые миссии, удаленные объекты",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtfC1YAPQ5kcKFQ6ABBoLEAsWXxhCpqcx0LiWSiHFGFj_A6nC8n8pBXD2&s=10"
          },
          {
            id: "coaster",
            name: "Микроавтобус",
            category: "Групповые перевозки",
            price: "Цена по запросу",
            seats: "15-20 пассажиров",
            transmission: "Автомат / Механика",
            range: "Конференции и мероприятия",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          }
        ]
      },
      pages: {
        fieldMissions: {
          title: "Полевые миссии",
          subtitle: "Надежный транспорт для удаленных и сложных проектов.",
          features: [
            { title: "Проекты развития", desc: "Логистика для международных финансовых институтов и проектов." },
            { title: "Энергетика и Инфраструктура", desc: "Доступ к солнечным и ветровым электростанциям, объектам водопользования." },
            { title: "Технические миссии", desc: "Геологоразведка, горнодобывающие работы и инженерные инспекции." },
            { title: "Сельское хозяйство", desc: "Навигация по отдаленным сельскохозяйственным районам." }
          ],
          highlights: ["Внедорожники и 4WD", "Опытные водители", "Региональная экспертиза", "Многодневные миссии", "Круглосуточная поддержка"]
        },
        delegations: {
          title: "Официальные Делегации",
          subtitle: "Премиум-транспорт для встреч на высшем уровне и VIP-гостей.",
          features: [
            { title: "Правительственные делегации", desc: "Безопасный транспорт, соответствующий протоколу." },
            { title: "Конференции и Форумы", desc: "Координация нескольких автомобилей для масштабных мероприятий." },
            { title: "Корпоративные встречи", desc: "Седаны и минивэны бизнес-класса для руководителей." }
          ],
          services: ["Встреча в аэропорту", "Трансферы в отель", "Шаттл-сервис", "Организация кортежей"]
        },
        transfers: {
          title: "Трансферы",
          subtitle: "Профессиональная встреча и проводы по всему Узбекистану.",
          text: "Мы предоставляем пунктуальные и надежные трансферы из всех основных аэропортов и железнодорожных вокзалов, включая Ташкент, Самарканд, Бухару и Ургенч. Наши водители встретят вас с табличкой, помогут с багажом и обеспечат комфортную поездку."
        },
        projects: {
          title: "Реализованные проекты",
          subtitle: "Реальный операционный опыт в различных секторах.",
          items: [
            { name: "Проект развития солнечной энергетики", region: "Навои и Сурхандарья", duration: "14 дней", vehicles: "Тяжелые внедорожники" },
            { name: "Оценка водных ресурсов", region: "Каракалпакстан", duration: "7 дней", vehicles: "Кроссоверы и минивэны" },
            { name: "Международная конференция", region: "Ташкент и Самарканд", duration: "5 дней", vehicles: "Премиум минивэны и автобусы" },
            { name: "Геологоразведка", region: "Навои", duration: "21 день", vehicles: "Внедорожники 4WD" }
          ]
        },
        industry: {
          title: "Решения для турбизнеса",
          subtitle: "Ваш надежный местный транспортный партнер.",
          text: "Мы сотрудничаем с международными туристическими агентствами, туроператорами, DMC и отелями для обеспечения бесперебойной логистики для их клиентов.",
          partners: ["Туристические агентства", "Туроператоры", "DMC компании", "Отели и консьерж-сервисы", "Менеджеры по корпоративным поездкам"]
        },
        about: {
          title: "О GoLuxTrip",
          subtitle: "Цифровой штаб полевой логистики в Узбекистане.",
          text: "GoLuxTrip — это не такси. Мы специализированный поставщик логистических услуг, обеспечивающий надежную транспортировку для самых сложных задач.",
          pillars: [
            { title: "Контроль качества водителей", desc: "Тщательный отбор, регулярное обучение и строгое соблюдение протоколов безопасности." },
            { title: "Стандарты качества авто", desc: "Современный автопарк, подготовленный как для города, так и для бездорожья." },
            { title: "Круглосуточная координация", desc: "Наша команда диспетчеров контролирует все поездки 24/7." },
            { title: "Региональная сеть", desc: "Работаем во всех 14 регионах Узбекистана, от Ташкента до Нукуса." }
          ]
        }
      },
      application: {
        kicker: "Контакты",
        title: "Заказать транспортные услуги",
        text: "Оставьте заявку. Наша команда координаторов подготовит для вас индивидуальное предложение.",
        rows: ["Корпоративные запросы", "Долгосрочное обслуживание", "Координация нескольких авто"],
        fields: {
          name: "Контактное лицо",
          email: "Электронная почта",
          phone: "Телефон / WhatsApp",
          dates: "Даты поездки",
          route: "Регионы / Города",
          message: "Дополнительная информация (Необязательно)",
          organization: "Организация",
          service: "Требуемая услуга",
          passengers: "Количество пассажиров"
        },
        placeholders: {
          name: "Ваше имя",
          email: "name@organization.org",
          phone: "+998 ...",
          dates: "12-20 мая, 2026",
          route: "Ташкент - Навои - Бухара",
          message: "Детали маршрута, особые требования, условия и т.д.",
          organization: "World Bank, UN и т.д.",
          service: "Полевая миссия, Делегация...",
          passengers: "Кол-во человек"
        },
        submit: "Отправить заявку",
        sending: "Отправка...",
        success: "Заявка отправлена. Наша команда свяжется с вами в ближайшее время.",
        invalid: "Пожалуйста, заполните все обязательные поля.",
        errors: {
          name: "Введите имя",
          email: "Введите корректный email",
          phone: "Введите номер телефона",
          car: "Выберите категорию автомобиля",
          dates: "Укажите даты поездки",
          route: "Укажите маршрут",
          organization: "Укажите организацию",
          service: "Укажите услугу",
          passengers: "Укажите количество пассажиров"
        }
      },
      footer: "GoLuxTrip - Официальный партнер по транспорту и полевой логистике в Узбекистане."
    }
  },
  uz: {
    translation: {
      nav: {
        home: "Bosh sahifa",
        fieldMissions: "Dala missiyalari",
        delegations: "Delegatsiyalar va tadbirlar",
        transfers: "Transferlar",
        fleet: "Avtopark",
        projects: "Loyihalar",
        industry: "Turizm uchun",
        about: "Biz haqimizda",
        contact: "Aloqa",
        apply: "Transport buyurtma qilish",
        toggle: "Menyuni ochish"
      },
      hero: {
        badge: "Transport va logistika hamkoringiz",
        title: "Yo'l tugagan joyda biz davom etamiz.",
        text: "O'zbekiston bo'ylab xalqaro tashkilotlar, rivojlanish loyihalari, rasmiy delegatsiyalar va korporativ mijozlar uchun ishonchli transport va dala logistikasi.",
        cta: "Transport so'rash",
        secondary: "Avtoparkni ko'rish",
        stats: ["Dala missiyalari", "Rasmiy delegatsiyalar", "Aeroport va vokzal transferlari"]
      },
      fleet: {
        kicker: "Avtopark",
        title: "Hududiy va loyiha safarlari uchun maxsus avtomobillar.",
        text: "Bizning avtoparkimiz Komfort, Premium va Biznes toifasidagi sedanlar, SUVlar, 4WDlar, minivenlar va avtobuslardan iborat.",
        request: "Ushbu avtomobilga buyurtma",
        cars: [
          {
            id: "cobalt",
            name: "Chevrolet Cobalt",
            category: "Komfort Sedan",
            price: "Narxi so'rov bo'yicha",
            seats: "3-4 yo'lovchi",
            transmission: "Avtomat",
            range: "Shahar va hududlararo safarlar",
            image: "https://chevrolet.uz/assets/images/cobalt/colours/1.png"
          },
          {
            id: "tracker",
            name: "Chevrolet Tracker",
            category: "Kompakt Krossover",
            price: "Narxi so'rov bo'yicha",
            seats: "3-4 yo'lovchi",
            transmission: "Avtomat",
            range: "Shahar va yengil yo'ltanlamas",
            image: "https://chevrolet.uz/assets/images/tracker/colors/07.png"
          },
          {
            id: "k5",
            name: "Kia K5",
            category: "Premium Sedan",
            price: "Narxi so'rov bo'yicha",
            seats: "3-4 yo'lovchi",
            transmission: "Avtomat",
            range: "VIP va Korporativ shaharlararo safarlar",
            image: "https://cdn.motor1.com/images/mgl/bgBOz6/s1/2025-kia-k5.jpg"
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            category: "Premium Miniven",
            price: "Narxi so'rov bo'yicha",
            seats: "7-9 yo'lovchi",
            transmission: "Avtomat",
            range: "Delegatsiyalar, guruhlar, transferlar",
            image: "https://cdn.motor1.com/images/mgl/POJEW/s3/2021-hyundai-staria.jpg"
          },
          {
            id: "lc250",
            name: "Toyota Land Cruiser",
            category: "Og'ir 4WD yo'ltanlamas",
            price: "Narxi so'rov bo'yicha",
            seats: "4 yo'lovchi",
            transmission: "Avtomat",
            range: "Dala missiyalari, uzoq obyektlar",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtfC1YAPQ5kcKFQ6ABBoLEAsWXxhCpqcx0LiWSiHFGFj_A6nC8n8pBXD2&s=10"
          },
          {
            id: "coaster",
            name: "Mikroavtobus",
            category: "Guruh tashish",
            price: "Narxi so'rov bo'yicha",
            seats: "15-20 yo'lovchi",
            transmission: "Avtomat / Mexanika",
            range: "Konferensiyalar va tadbirlar",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV4fuqp4oj5NGDEL0o0VArGsXtXGddOyQbdzO_vcEzwo1G-Lmog25vWpU&s=10"
          }
        ]
      },
      pages: {
        fieldMissions: {
          title: "Dala missiyalari",
          subtitle: "Uzoq va murakkab loyihalar uchun ishonchli transport.",
          features: [
            { title: "Rivojlanish loyihalari", desc: "Xalqaro moliya institutlari va loyihalar uchun logistika." },
            { title: "Energetika va Infratuzilma", desc: "Quyosh va shamol elektr stansiyalariga xavfsiz borish." },
            { title: "Texnik missiyalar", desc: "Geologiya-qidiruv ishlari va muhandislik tekshiruvlari." },
            { title: "Qishloq xo'jaligi", desc: "Olis hududlar bo'ylab navigatsiya." }
          ],
          highlights: ["Yo'ltanlamaslar va 4WD", "Tajribali haydovchilar", "Hududiy tajriba", "Ko'p kunlik missiyalar", "24/7 qo'llab-quvvatlash"]
        },
        delegations: {
          title: "Rasmiy Delegatsiyalar",
          subtitle: "Oliy darajadagi uchrashuvlar va VIP mehmonlar uchun premium transport.",
          features: [
            { title: "Hukumat delegatsiyalari", desc: "Protokolga muvofiq xavfsiz transport." },
            { title: "Konferensiya va Forumlar", desc: "Katta tadbirlar uchun transportlarni muvofiqlashtirish." },
            { title: "Korporativ uchrashuvlar", desc: "Rahbarlar uchun biznes toifasidagi sedan va minivenlar." }
          ],
          services: ["Aeroportda kutib olish", "Mehmonxonaga transferlar", "Shattl-servis", "Kortejlarni tashkil qilish"]
        },
        transfers: {
          title: "Transferlar",
          subtitle: "O'zbekiston bo'ylab professional kutib olish va kuzatish.",
          text: "Biz Toshkent, Samarqand, Buxoro va Urganch kabi barcha asosiy aeroport va poyezd vokzallaridan o'z vaqtida va ishonchli transferlarni taqdim etamiz. Haydovchilarimiz sizni belgi bilan kutib oladi, yuklaringizga yordam beradi va mehmonxonangizgacha qulay borishni ta'minlaydi."
        },
        projects: {
          title: "Amalga oshirilgan loyihalar",
          subtitle: "Turli sohalardagi haqiqiy operatsion tajriba.",
          items: [
            { name: "Quyosh energetikasini rivojlantirish", region: "Navoiy va Surxondaryo", duration: "14 kun", vehicles: "Og'ir yo'ltanlamaslar" },
            { name: "Suv resurslarini baholash", region: "Qoraqalpog'iston", duration: "7 kun", vehicles: "Krossover va minivenlar" },
            { name: "Xalqaro konferensiya", region: "Toshkent va Samarqand", duration: "5 kun", vehicles: "Premium miniven va avtobuslar" },
            { name: "Geologiya-qidiruv ishlari", region: "Navoiy", duration: "21 kun", vehicles: "4WD yo'ltanlamaslar" }
          ]
        },
        industry: {
          title: "Turizm biznesi uchun yechimlar",
          subtitle: "Sizning ishonchli mahalliy transport hamkoringiz.",
          text: "Biz xalqaro sayyohlik agentliklari, turoperatorlar, DMClar va mehmonxonalar bilan hamkorlik qilib, ularning mijozlari uchun uzluksiz logistikani ta'minlaymiz.",
          partners: ["Sayyohlik agentliklari", "Turoperatorlar", "DMC kompaniyalar", "Mehmonxona va konsyerj xizmatlari", "Korporativ sayohat menejerlari"]
        },
        about: {
          title: "GoLuxTrip haqida",
          subtitle: "O'zbekistonda dala logistikasi bo'yicha raqamli shtab.",
          text: "GoLuxTrip taksi emas. Biz eng murakkab vazifalar uchun ishonchli transportni ta'minlaydigan ixtisoslashgan logistika provayderimiz.",
          pillars: [
            { title: "Haydovchilar sifati", desc: "Jiddiy tanlov, muntazam treninglar va xavfsizlik protokollariga qat'iy rioya qilish." },
            { title: "Avtomobillar sifati", desc: "Shahar va yo'ltanlamas hududlar uchun tayyorlangan zamonaviy avtopark." },
            { title: "24/7 Muvofiqlashtirish", desc: "Dispetcherlar jamoamiz barcha safarlarni tunu kun nazorat qiladi." },
            { title: "Hududiy tarmoq", desc: "Toshkentdan Nukusgacha bo'lgan barcha 14 ta hududda ishlaymiz." }
          ]
        }
      },
      application: {
        kicker: "Aloqa",
        title: "Transport xizmatlariga buyurtma",
        text: "So'rovingizni qoldiring. Bizning jamoamiz siz uchun individual taklif tayyorlaydi.",
        rows: ["Korporativ so'rovlar", "Uzoq muddatli xizmat", "Bir nechta avtomobillarni muvofiqlashtirish"],
        fields: {
          name: "Aloqa qiluvchi shaxs",
          email: "Elektron pochta",
          phone: "Telefon / WhatsApp",
          dates: "Safar sanalari",
          route: "Hududlar / Shaharlar",
          message: "Qo'shimcha ma'lumot (Majburiy emas)",
          organization: "Tashkilot",
          service: "Kerakli xizmat",
          passengers: "Yo'lovchilar soni"
        },
        placeholders: {
          name: "Ismingiz",
          email: "name@organization.org",
          phone: "+998 ...",
          dates: "12-20 May, 2026",
          route: "Toshkent - Navoiy - Buxoro",
          message: "Marshrut tafsilotlari, maxsus talablar va h.k.",
          organization: "World Bank, UN va h.k.",
          service: "Dala missiyasi, Delegatsiya...",
          passengers: "Odamlar soni"
        },
        submit: "So'rov yuborish",
        sending: "Yuborilmoqda...",
        success: "So'rov yuborildi. Tez orada siz bilan bog'lanamiz.",
        invalid: "Iltimos, barcha majburiy maydonlarni to'ldiring.",
        errors: {
          name: "Ismingizni kiriting",
          email: "To'g'ri email kiriting",
          phone: "Telefon raqamini kiriting",
          car: "Avtomobil toifasini tanlang",
          dates: "Safar sanalarini kiriting",
          route: "Marshrutni kiriting",
          organization: "Tashkilotni kiriting",
          service: "Xizmatni kiriting",
          passengers: "Yo'lovchilar sonini kiriting"
        }
      },
      footer: "GoLuxTrip - O'zbekistonda transport va dala logistikasi bo'yicha rasmiy hamkor."
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
