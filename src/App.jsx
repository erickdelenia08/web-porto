import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background text-foreground transition-colors duration-300">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;