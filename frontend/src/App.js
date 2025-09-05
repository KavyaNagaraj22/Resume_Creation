import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";
import ResumeForm from "./pages/ResumeForm";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext"; // ✅
import ResumeViewer from "./pages/ResumeViewer";

const App = () => (
  <AuthProvider> {/* ✅ Wrap outside of Routes */}
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume" element={<ResumeForm />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/editor/:id" element={<ResumeForm />} />
        <Route path="/resume-form" element={<PrivateRoute><ResumeForm /></PrivateRoute>} />
        <Route path="/resume-form/:id" element={<PrivateRoute><ResumeForm /></PrivateRoute>} />
        <Route path="/view/:id" element={<ResumeViewer />} />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
