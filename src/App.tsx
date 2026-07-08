import AOS from "aos";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header, Footer } from "./components/Layout";

import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";
import FieldMissions from "./pages/FieldMissions";
import Delegations from "./pages/Delegations";
import Transfers from "./pages/Transfers";
import Projects from "./pages/Projects";
import IndustrySolutions from "./pages/IndustrySolutions";
import About from "./pages/About";

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
          <Route path="/field-missions" element={<FieldMissions />} />
          <Route path="/delegations" element={<Delegations />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/industry-solutions" element={<IndustrySolutions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
