import { Routes, Route, Navigate } from "react-router-dom";

/* 🔐 AUTH GUARD */
import AdminRoute from "./routes/AdminRoute";

/* 🧱 ADMIN LAYOUT */
import AdminLayout from "./layouts/AdminLayouts";

/* 🛠️ ADMIN PAGES */
import Dashboard from "./pages/admin/Dashboard";
import Enquiries from "./pages/admin/Enquiries";
import Gallery from "./pages/admin/Gallery";
import Login from "./pages/admin/Login";
import ResetPassword from "./pages/admin/ResetPassword";
/* 🌐 PUBLIC WEBSITE */
import Home from "./pages/website/Home";
import About from "./pages/website/About";
import Projects from "./pages/website/Projects";
import Events from "./pages/website/Events";
import Contact from "./pages/website/Contact";
import ForgotPassword from "./pages/admin/ForgotPassword";
const App = () => {
  return (
    <Routes>
      {/* 🌐 PUBLIC WEBSITE ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔑 ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route
  path="/admin/reset-password/:token"
  element={<ResetPassword />}
/>

      {/* 🔒 PROTECTED ADMIN ROUTES */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/gallery" element={<Gallery />} />
        </Route>
      </Route>

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
