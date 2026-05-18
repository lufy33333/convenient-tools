import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppShell from "@/components/layout/AppShell";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Tools />} path="/tools" />
          <Route element={<About />} path="/about" />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
