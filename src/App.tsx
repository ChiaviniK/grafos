import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LFASyllabus } from "./pages/LFASyllabus";
import { LFALesson4 } from "./pages/LFALesson4";
import { SegurancaSyllabus } from "./pages/SegurancaSyllabus";
import SegurancaLesson5 from "./pages/SegurancaLesson5";
import { RedesSyllabus } from "./pages/RedesSyllabus";
import { RedesLesson5 } from "./pages/RedesLesson5";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lfa" element={<LFASyllabus />} />
        <Route path="/lfa/aula4" element={<LFALesson4 />} />
        <Route path="/seguranca" element={<SegurancaSyllabus />} />
        <Route path="/seguranca/aula5" element={<SegurancaLesson5 />} />
        <Route path="/redes" element={<RedesSyllabus />} />
        <Route path="/redes/aula5" element={<RedesLesson5 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
