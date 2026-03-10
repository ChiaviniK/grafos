import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LFASyllabus } from "./pages/LFASyllabus";
import { LFALesson4 } from "./pages/LFALesson4";
import { SegurancaSyllabus } from "./pages/SegurancaSyllabus";
import SegurancaLesson5 from "./pages/SegurancaLesson5";
import { RedesSyllabus } from "./pages/RedesSyllabus";
import { RedesLesson5 } from "./pages/RedesLesson5";
import { Fisica1Syllabus } from "./pages/Fisica1Syllabus";
import { Fisica2Syllabus } from "./pages/Fisica2Syllabus";
import { Fisica3Syllabus } from "./pages/Fisica3Syllabus";

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
        <Route path="/fisica1" element={<Fisica1Syllabus />} />
        <Route path="/fisica2" element={<Fisica2Syllabus />} />
        <Route path="/fisica3" element={<Fisica3Syllabus />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
