import AOS from "aos";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header, Footer } from "./components/Layout";

import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";

// Placeholder pages for others
function Placeholder({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32 lg:px-8 text-center min-h-[60vh] grid place-items-center">
      <div>
        <h1 className="text-4xl font-black text-ink mb-4">{title}</h1>
        <p className="text-lg text-asphalt">More details about our {title.toLowerCase()} services will be added soon.</p>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 850, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-ink flex flex-col">
      <Toaster position="top-center" toastOptions={{ duration: 4200 }} />
      <Header />
      
      <main className="flex-1 mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/field-missions" element={<Placeholder title="Field Missions" />} />
          <Route path="/delegations" element={<Placeholder title="Official Delegations & Events" />} />
          <Route path="/transfers" element={<Placeholder title="Airport & Railway Station Transfers" />} />
          <Route path="/projects" element={<Placeholder title="Projects" />} />
          <Route path="/industry-solutions" element={<Placeholder title="Travel Industry Solutions" />} />
          <Route path="/about" element={<Placeholder title="About Us" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
