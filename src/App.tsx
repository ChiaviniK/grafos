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
import { Fisica1Lesson1 } from "./pages/Fisica1Lesson1";
import { Fisica1Lesson2 } from "./pages/Fisica1Lesson2";
import { Fisica1Lesson3 } from "./pages/Fisica1Lesson3";
import { Fisica1Lesson4 } from "./pages/Fisica1Lesson4";
import { Fisica1Lesson5 } from "./pages/Fisica1Lesson5";
import { Fisica1Lesson6 } from "./pages/Fisica1Lesson6";
import { Fisica1Lesson7 } from "./pages/Fisica1Lesson7";
import { Fisica1Lesson8 } from "./pages/Fisica1Lesson8";
import { Fisica1Lesson9 } from "./pages/Fisica1Lesson9";
import { Fisica1Lesson10 } from "./pages/Fisica1Lesson10";
import { Fisica1Lesson11 } from "./pages/Fisica1Lesson11";
import { Fisica1Lesson12 } from "./pages/Fisica1Lesson12";

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
        <Route path="/fisica1/aula1" element={<Fisica1Lesson1 />} />
        <Route path="/fisica1/aula2" element={<Fisica1Lesson2 />} />
        <Route path="/fisica1/aula3" element={<Fisica1Lesson3 />} />
        <Route path="/fisica1/aula4" element={<Fisica1Lesson4 />} />
        <Route path="/fisica1/aula5" element={<Fisica1Lesson5 />} />
        <Route path="/fisica1/aula6" element={<Fisica1Lesson6 />} />
        <Route path="/fisica1/aula7" element={<Fisica1Lesson7 />} />
        <Route path="/fisica1/aula8" element={<Fisica1Lesson8 />} />
        <Route path="/fisica1/aula9" element={<Fisica1Lesson9 />} />
        <Route path="/fisica1/aula10" element={<Fisica1Lesson10 />} />
        <Route path="/fisica1/aula11" element={<Fisica1Lesson11 />} />
        <Route path="/fisica1/aula12" element={<Fisica1Lesson12 />} />
        <Route path="/fisica2" element={<Fisica2Syllabus />} />
        <Route path="/fisica3" element={<Fisica3Syllabus />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
