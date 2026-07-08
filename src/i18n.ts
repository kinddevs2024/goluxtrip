import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        fleet: "Fleet",
        process: "How it works",
        routes: "Routes",
        request: "Request",
        apply: "Apply now",
        toggle: "Toggle navigation"
      },
      hero: {
        badge: "Self-drive car rental for Uzbekistan trips",
        title: "GoLuxTrip",
        text: "Reliable cars for European travelers who want to explore Uzbekistan independently, with clear terms, local support, and routes built around real travel plans.",
        cta: "Leave a request",
        secondary: "View cars",
        stats: ["24/7 support", "Clean contracts", "Flexible routes"]
      },
      fleet: {
        kicker: "Fleet",
        title: "Choose the car first. We shape the route around it.",
        text: "Compact sedans for city-to-city travel, crossovers for mountain roads, and vans for family or group trips.",
        request: "Request this car",
        cars: [
          {
            id: "cobalt",
            name: "Chevrolet Cobalt",
            category: "Smart city sedan",
            price: "from $35/day",
            seats: "5 seats",
            transmission: "Automatic",
            range: "Tashkent, Samarkand, Bukhara",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Chevrolet-Cobalt-Sedan.jpg"
          },
          {
            id: "tracker",
            name: "Chevrolet Tracker",
            category: "Compact crossover",
            price: "from $55/day",
            seats: "5 seats",
            transmission: "Automatic",
            range: "Mountain roads and long routes",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Chevrolet-Trax_white_side-view_IAA-2013_LWS2801.jpg"
          },
          {
            id: "k5",
            name: "Kia K5",
            category: "Business class",
            price: "from $75/day",
            seats: "5 seats",
            transmission: "Automatic",
            range: "Premium intercity travel",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Kia_K5_side_view.jpg"
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            category: "Family van",
            price: "from $110/day",
            seats: "7-9 seats",
            transmission: "Automatic",
            range: "Groups, luggage, airport pickup",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Hyundai_Staria_1X7A6771.jpg"
          }
        ]
      },
      process: {
        kicker: "Process",
        title: "A simple rental flow for travelers landing in Uzbekistan.",
        text: "The page keeps the request short, then the team handles the details by email.",
        steps: [
          ["Choose", "Pick a car class and share dates, route, luggage, and driver details."],
          ["Confirm", "GoLuxTrip confirms availability, deposit, pickup point, and required documents."],
          ["Drive", "Start from Tashkent or another agreed city and keep support contact for the route."]
        ]
      },
      routes: {
        kicker: "Routes",
        title: "Built for independent road trips, not generic transfers.",
        text: "Visitors can describe their own route or use popular destinations as a starting point.",
        cta: "Plan my route",
        routeIdea: "Route idea:",
        items: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Chimgan", "Fergana Valley"]
      },
      trust: {
        kicker: "Why GoLuxTrip",
        title: "Premium enough to trust. Simple enough to book.",
        items: [
          ["Transparent terms", "Rental details, deposit, driver documents, and pickup plan are confirmed before arrival."],
          ["Traveler-first support", "Best for guests who want freedom, but still need a local operator on call."],
          ["Flexible car match", "The team can suggest a better class if the planned road, group, or luggage requires it."]
        ]
      },
      application: {
        kicker: "Application",
        title: "Tell us what you need. The team will reply with availability.",
        text: "All requests are sent to charityhends@gmail.com with the selected car, dates, route, and contact details.",
        rows: ["Email request delivery", "Phone or messenger contact", "Travel dates and custom route"],
        fields: {
          name: "Name",
          email: "Email",
          phone: "Phone / WhatsApp",
          dates: "Travel dates",
          route: "Route",
          message: "Message"
        },
        placeholders: {
          name: "Your name",
          email: "name@email.com",
          phone: "+998 ...",
          dates: "May 12-20, 2026",
          route: "Tashkent - Samarkand - Bukhara",
          message: "Driver age, luggage, child seats, pickup time, or any special request"
        },
        submit: "Send application",
        sending: "Sending...",
        success: "Request sent. GoLuxTrip and your email will receive confirmation.",
        invalid: "Please complete the highlighted fields.",
        errors: {
          name: "Enter your name",
          email: "Enter a valid email",
          phone: "Enter a phone number",
          car: "Choose a car",
          dates: "Add travel dates",
          route: "Tell us your route"
        }
      },
      footer: "GoLuxTrip self-drive rental requests are delivered to charityhends@gmail.com."
    }
  },
  ru: {
    translation: {
      nav: {
        fleet: "Автопарк",
        process: "Как работает",
        routes: "Маршруты",
        request: "Заявка",
        apply: "Оставить заявку",
        toggle: "Открыть меню"
      },
      hero: {
        badge: "Аренда авто без водителя для поездок по Узбекистану",
        title: "GoLuxTrip",
        text: "Надежные автомобили для европейских путешественников, которые хотят самостоятельно изучать Узбекистан: понятные условия, локальная поддержка и маршруты под реальный план поездки.",
        cta: "Оставить заявку",
        secondary: "Смотреть авто",
        stats: ["Поддержка 24/7", "Понятные договоры", "Гибкие маршруты"]
      },
      fleet: {
        kicker: "Автопарк",
        title: "Сначала выберите авто. Маршрут подстроим под поездку.",
        text: "Седаны для городов, кроссоверы для горных дорог и минивэны для семейных или групповых маршрутов.",
        request: "Запросить это авто",
        cars: [
          {
            id: "cobalt",
            name: "Chevrolet Cobalt",
            category: "Умный городской седан",
            price: "от $35/день",
            seats: "5 мест",
            transmission: "Автомат",
            range: "Ташкент, Самарканд, Бухара",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Chevrolet-Cobalt-Sedan.jpg"
          },
          {
            id: "tracker",
            name: "Chevrolet Tracker",
            category: "Компактный кроссовер",
            price: "от $55/день",
            seats: "5 мест",
            transmission: "Автомат",
            range: "Горы и длинные маршруты",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Chevrolet-Trax_white_side-view_IAA-2013_LWS2801.jpg"
          },
          {
            id: "k5",
            name: "Kia K5",
            category: "Бизнес-класс",
            price: "от $75/день",
            seats: "5 мест",
            transmission: "Автомат",
            range: "Комфортные междугородние поездки",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Kia_K5_side_view.jpg"
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            category: "Семейный минивэн",
            price: "от $110/день",
            seats: "7-9 мест",
            transmission: "Автомат",
            range: "Группы, багаж, встреча в аэропорту",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Hyundai_Staria_1X7A6771.jpg"
          }
        ]
      },
      process: {
        kicker: "Процесс",
        title: "Простая аренда для путешественников, которые прилетают в Узбекистан.",
        text: "На сайте заявка короткая, а детали команда уточняет по email.",
        steps: [
          ["Выбор", "Выберите класс авто и укажите даты, маршрут, багаж и данные водителя."],
          ["Подтверждение", "GoLuxTrip подтверждает наличие, депозит, точку выдачи и документы."],
          ["Поездка", "Стартуйте из Ташкента или другого города и держите контакт поддержки на маршруте."]
        ]
      },
      routes: {
        kicker: "Маршруты",
        title: "Для самостоятельных road trip, а не обычных трансферов.",
        text: "Гости могут описать свой маршрут или выбрать популярные направления как основу.",
        cta: "Спланировать маршрут",
        routeIdea: "Идея маршрута:",
        items: ["Ташкент", "Самарканд", "Бухара", "Хива", "Чимган", "Ферганская долина"]
      },
      trust: {
        kicker: "Почему GoLuxTrip",
        title: "Достаточно премиально, чтобы доверять. Достаточно просто, чтобы забронировать.",
        items: [
          ["Прозрачные условия", "Аренда, депозит, документы водителя и точка выдачи подтверждаются до прилета."],
          ["Поддержка для туристов", "Подходит гостям, которым нужна свобода поездки и локальный оператор на связи."],
          ["Подбор авто", "Команда предложит другой класс, если дорога, группа или багаж требуют больше возможностей."]
        ]
      },
      application: {
        kicker: "Заявка",
        title: "Расскажите, что нужно. Команда ответит по доступности.",
        text: "Все заявки отправляются на charityhends@gmail.com с выбранным авто, датами, маршрутом и контактами.",
        rows: ["Доставка заявки на email", "Контакт по телефону или мессенджеру", "Даты и индивидуальный маршрут"],
        fields: {
          name: "Имя",
          email: "Email",
          phone: "Телефон / WhatsApp",
          dates: "Даты поездки",
          route: "Маршрут",
          message: "Комментарий"
        },
        placeholders: {
          name: "Ваше имя",
          email: "name@email.com",
          phone: "+998 ...",
          dates: "12-20 мая 2026",
          route: "Ташкент - Самарканд - Бухара",
          message: "Возраст водителя, багаж, детские кресла, время выдачи или особые пожелания"
        },
        submit: "Отправить заявку",
        sending: "Отправляем...",
        success: "Заявка отправлена. GoLuxTrip и ваш email получат подтверждение.",
        invalid: "Заполните выделенные поля.",
        errors: {
          name: "Введите имя",
          email: "Введите корректный email",
          phone: "Введите телефон",
          car: "Выберите авто",
          dates: "Укажите даты",
          route: "Укажите маршрут"
        }
      },
      footer: "Заявки GoLuxTrip на аренду авто отправляются на charityhends@gmail.com."
    }
  },
  uz: {
    translation: {
      nav: {
        fleet: "Avtopark",
        process: "Qanday ishlaydi",
        routes: "Yo'nalishlar",
        request: "Ariza",
        apply: "Ariza qoldirish",
        toggle: "Menyuni ochish"
      },
      hero: {
        badge: "O'zbekiston bo'ylab safarlar uchun haydovchisiz avtomobil ijarasi",
        title: "GoLuxTrip",
        text: "O'zbekistonni mustaqil kezishni xohlaydigan yevropalik sayohatchilar uchun ishonchli avtomobillar: aniq shartlar, mahalliy yordam va safar rejasiga mos yo'nalishlar.",
        cta: "Ariza qoldirish",
        secondary: "Avtolarni ko'rish",
        stats: ["24/7 yordam", "Aniq shartnomalar", "Moslashuvchan yo'nalishlar"]
      },
      fleet: {
        kicker: "Avtopark",
        title: "Avval avtomobilni tanlang. Yo'nalishni safarga moslaymiz.",
        text: "Shaharlararo safarlar uchun sedanlar, tog' yo'llari uchun krossoverlar va oilaviy yoki guruh safarlari uchun minivenlar.",
        request: "Shu avtoni so'rash",
        cars: [
          {
            id: "cobalt",
            name: "Chevrolet Cobalt",
            category: "Shahar uchun sedan",
            price: "$35/kun dan",
            seats: "5 o'rin",
            transmission: "Avtomat",
            range: "Toshkent, Samarqand, Buxoro",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Chevrolet-Cobalt-Sedan.jpg"
          },
          {
            id: "tracker",
            name: "Chevrolet Tracker",
            category: "Kompakt krossover",
            price: "$55/kun dan",
            seats: "5 o'rin",
            transmission: "Avtomat",
            range: "Tog' yo'llari va uzoq safarlar",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Chevrolet-Trax_white_side-view_IAA-2013_LWS2801.jpg"
          },
          {
            id: "k5",
            name: "Kia K5",
            category: "Biznes klass",
            price: "$75/kun dan",
            seats: "5 o'rin",
            transmission: "Avtomat",
            range: "Qulay shaharlararo safarlar",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Kia_K5_side_view.jpg"
          },
          {
            id: "staria",
            name: "Hyundai Staria",
            category: "Oilaviy miniven",
            price: "$110/kun dan",
            seats: "7-9 o'rin",
            transmission: "Avtomat",
            range: "Guruhlar, yuklar, aeroportdan kutib olish",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Hyundai_Staria_1X7A6771.jpg"
          }
        ]
      },
      process: {
        kicker: "Jarayon",
        title: "O'zbekistonga kelayotgan sayohatchilar uchun oddiy ijara jarayoni.",
        text: "Saytda ariza qisqa, keyin tafsilotlarni jamoa email orqali aniqlashtiradi.",
        steps: [
          ["Tanlash", "Avto klassini tanlang, sanalar, yo'nalish, yuk va haydovchi ma'lumotlarini yozing."],
          ["Tasdiqlash", "GoLuxTrip mavjudlik, depozit, topshirish joyi va hujjatlarni tasdiqlaydi."],
          ["Safar", "Toshkentdan yoki kelishilgan shahardan yo'lga chiqing va yordam aloqasini saqlang."]
        ]
      },
      routes: {
        kicker: "Yo'nalishlar",
        title: "Oddiy transfer emas, mustaqil road trip uchun.",
        text: "Mehmonlar o'z yo'nalishini yozishi yoki mashhur manzillarni asos qilib olishi mumkin.",
        cta: "Yo'nalishni rejalash",
        routeIdea: "Yo'nalish g'oyasi:",
        items: ["Toshkent", "Samarqand", "Buxoro", "Xiva", "Chimyon", "Farg'ona vodiysi"]
      },
      trust: {
        kicker: "Nega GoLuxTrip",
        title: "Ishonch uchun premium. Buyurtma uchun sodda.",
        items: [
          ["Shaffof shartlar", "Ijara, depozit, haydovchi hujjatlari va topshirish joyi oldindan tasdiqlanadi."],
          ["Sayohatchilar uchun yordam", "Erkin safar va aloqadagi mahalliy operator kerak bo'lgan mehmonlar uchun."],
          ["Mos avto tanlovi", "Yo'l, guruh yoki yuk ko'proq imkoniyat talab qilsa, jamoa boshqa klassni taklif qiladi."]
        ]
      },
      application: {
        kicker: "Ariza",
        title: "Nima kerakligini yozing. Jamoa mavjudlik bo'yicha javob beradi.",
        text: "Barcha arizalar charityhends@gmail.com manziliga tanlangan avto, sanalar, yo'nalish va kontaktlar bilan yuboriladi.",
        rows: ["Ariza emailga yuboriladi", "Telefon yoki messenjer orqali aloqa", "Sanalar va individual yo'nalish"],
        fields: {
          name: "Ism",
          email: "Email",
          phone: "Telefon / WhatsApp",
          dates: "Safar sanalari",
          route: "Yo'nalish",
          message: "Izoh"
        },
        placeholders: {
          name: "Ismingiz",
          email: "name@email.com",
          phone: "+998 ...",
          dates: "2026 yil 12-20 may",
          route: "Toshkent - Samarqand - Buxoro",
          message: "Haydovchi yoshi, yuk, bolalar o'rindig'i, topshirish vaqti yoki maxsus so'rov"
        },
        submit: "Arizani yuborish",
        sending: "Yuborilmoqda...",
        success: "Ariza yuborildi. GoLuxTrip va emailingiz tasdiq xatini oladi.",
        invalid: "Belgilanggan maydonlarni to'ldiring.",
        errors: {
          name: "Ismingizni kiriting",
          email: "To'g'ri email kiriting",
          phone: "Telefon raqamini kiriting",
          car: "Avto tanlang",
          dates: "Sanalarni kiriting",
          route: "Yo'nalishni yozing"
        }
      },
      footer: "GoLuxTrip avto ijarasi arizalari charityhends@gmail.com manziliga yuboriladi."
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
