import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DartsApp from './darts/DartsApp';
import Login from './darts/Login';
import ProtectedRoute from './darts/ProtectedRoute';
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="neon-top" />
      <div className="neon-right" />
      <Router>
        <Routes>
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

<Route path="/darts/login" element={<Login />} />
<Route path="/darts" element={
  <ProtectedRoute>
    <DartsApp />
  </ProtectedRoute>
} />        </Routes>
      </Router>
    </div>
  );
}

export default App;
