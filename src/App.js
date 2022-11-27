import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import "./scss/main.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { TabsProvider } from "./components/DiscDir";
function App() {
  let loc = useLocation();
  return (
    <div className="app">
      <TabsProvider>
        <Routes location={loc} key={loc.pathname}>
          <Route path="/" element={<Home />} />
        </Routes>
      </TabsProvider>
    </div>
  );
}
export default App;
