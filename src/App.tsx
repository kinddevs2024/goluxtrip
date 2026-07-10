import AOS from "aos";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header, Footer } from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminCars from "./pages/admin/AdminCars";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminContent from "./pages/admin/AdminContent";

import Fleet from "./pages/Fleet";
import FieldMissions from "./pages/FieldMissions";
import Delegations from "./pages/Delegations";
import Transfers from "./pages/Transfers";
import Projects from "./pages/Projects";
import IndustrySolutions from "./pages/IndustrySolutions";
import About from "./pages/About";
import RealMissions from "./pages/RealMissions";
import MissionDetails from "./pages/MissionDetails";

import AdminStats from "./pages/admin/AdminStats";
import AdminRealMissions from "./pages/admin/AdminRealMissions";
import AdminFleet from "./pages/admin/AdminFleet";

function App() {
  useEffect(() => {
    AOS.init({ duration: 850, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-ink flex flex-col">
      <Toaster position="top-center" toastOptions={{ duration: 4200 }} />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminApplications />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="fleet" element={<AdminFleet />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="real-missions" element={<AdminRealMissions />} />
        </Route>

        <Route path="*" element={
          <>
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/field-missions" element={<FieldMissions />} />
                <Route path="/delegations" element={<Delegations />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/industry-solutions" element={<IndustrySolutions />} />
                <Route path="/about" element={<About />} />
                <Route path="/real-missions" element={<RealMissions />} />
                <Route path="/real-missions/:id" element={<MissionDetails />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
