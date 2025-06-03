import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from './darts/Login';
import ProtectedRoute from './darts/ProtectedRoute';
import AdminRoute from './darts/AdminRoute';
import AdvancedLeaderboard from './darts/components/AdvancedLeaderboard';
import Players from './darts/Players';
import DartsApp from './darts/DartsApp'; // ✅ You forgot to import this before
import "./App.css";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Auth state listener
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <div className="neon-top" />
      <div className="neon-right" />
      <Router>
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Header />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Login Page */}
          <Route
            path="/login"
            element={
              <div className="full-screen-center">
                <Login />
              </div>
            }
          />

          {/* Darts Game Page (protected) */}
          <Route
            path="/darts"
            element={
              <ProtectedRoute>
                <DartsApp />
              </ProtectedRoute>
            }
          />

          {/* Leaderboard (protected) */}
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <AdvancedLeaderboard />
              </ProtectedRoute>
            }
          />

          {/* Player Management (admin only) */}
          <Route
            path="/players"
            element={
              <AdminRoute>
                <Players />
              </AdminRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/darts" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
