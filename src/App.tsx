import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalHeader } from "./components/GlobalHeader";
import { Home } from "./pages/Home";
import { LFASyllabus } from "./pages/LFASyllabus";
import { LFALesson4 } from "./pages/LFALesson4";
import { SegurancaSyllabus } from "./pages/SegurancaSyllabus";
import SegurancaLesson5 from "./pages/SegurancaLesson5";
import { RedesSyllabus } from "./pages/RedesSyllabus";
import { RedesLesson5 } from "./pages/RedesLesson5";
import { RedesLesson6 } from "./pages/RedesLesson6";
import { Fisica1Syllabus } from "./pages/Fisica1Syllabus";
import { Fisica2Syllabus } from "./pages/Fisica2Syllabus";
import { Fisica3Syllabus } from "./pages/Fisica3Syllabus";
import { Fisica2Lesson1 } from "./pages/Fisica2Lesson1";
import { Fisica2Lesson2 } from "./pages/Fisica2Lesson2";
import { Fisica2Lesson3 } from "./pages/Fisica2Lesson3";
import { Fisica2Lesson4 } from "./pages/Fisica2Lesson4";
import { Fisica2Lesson5 } from "./pages/Fisica2Lesson5";
import { Fisica2Lesson6 } from "./pages/Fisica2Lesson6";
import { Fisica2Lesson7 } from "./pages/Fisica2Lesson7";
import { Fisica2Lesson8 } from "./pages/Fisica2Lesson8";
import { Fisica2Lesson9, Fisica2Lesson10 } from "./pages/Fisica2Lessons9and10";
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
import { Fisica3Lesson1 } from "./pages/Fisica3Lesson1";
import { Fisica3Lesson2 } from "./pages/Fisica3Lesson2";
import { Fisica3Lesson3, Fisica3Lesson4 } from "./pages/Fisica3Lessons3and4";
import { Fisica3Lesson5, Fisica3Lesson6 } from "./pages/Fisica3Lessons5and6";
import { Fisica3Lesson7, Fisica3Lesson8 } from "./pages/Fisica3Lessons7and8";
import { Fisica2NewLesson1, Fisica2NewLesson2, Fisica2NewLesson3, Fisica2NewLesson4 } from "./pages/Fisica2NewLessons1to4";
import { Fisica2NewLesson5, Fisica2NewLesson6, Fisica2NewLesson7, Fisica2NewLesson8 } from "./pages/Fisica2NewLessons5to8";
import { UnimaxLecture } from "./pages/UnimaxLecture";
import { UnimaxLectureV2 } from "./pages/UnimaxLectureV2";
import { TccOrientation } from "./pages/TccOrientation";
import { AFDLesson } from "./pages/AFDLesson";
import { CryptoClassicLesson } from "./pages/CryptoClassicLesson";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <GlobalHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lfa" element={<LFASyllabus />} />
          <Route path="/lfa/aula4" element={<LFALesson4 />} />
          <Route path="/lfa/aula6" element={<AFDLesson />} />
          <Route path="/seguranca" element={<SegurancaSyllabus />} />
          <Route path="/seguranca/aula5" element={<SegurancaLesson5 />} />
          <Route path="/seguranca/aula7" element={<CryptoClassicLesson />} />
          <Route path="/redes" element={<RedesSyllabus />} />
          <Route path="/redes/aula5" element={<RedesLesson5 />} />
          <Route path="/redes/aula6" element={<RedesLesson6 />} />
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
          <Route path="/fisica2/aula1" element={<Fisica2Lesson1 />} />
          <Route path="/fisica2/aula2" element={<Fisica2Lesson2 />} />
          <Route path="/fisica2/aula3" element={<Fisica2Lesson3 />} />
          <Route path="/fisica2/aula4" element={<Fisica2Lesson4 />} />
          <Route path="/fisica2/aula5" element={<Fisica2Lesson5 />} />
          <Route path="/fisica2/aula6" element={<Fisica2Lesson6 />} />
          <Route path="/fisica2/aula7" element={<Fisica2Lesson7 />} />
          <Route path="/fisica2/aula8" element={<Fisica2Lesson8 />} />
          <Route path="/fisica2/aula9" element={<Fisica2Lesson9 />} />
          <Route path="/fisica2/aula10" element={<Fisica2Lesson10 />} />
          <Route path="/fisica2/sem1" element={<Fisica2NewLesson1 />} />
          <Route path="/fisica2/sem2" element={<Fisica2NewLesson2 />} />
          <Route path="/fisica2/sem3" element={<Fisica2NewLesson3 />} />
          <Route path="/fisica2/sem4" element={<Fisica2NewLesson4 />} />
          <Route path="/fisica2/sem5" element={<Fisica2NewLesson5 />} />
          <Route path="/fisica2/sem6" element={<Fisica2NewLesson6 />} />
          <Route path="/fisica2/sem7" element={<Fisica2NewLesson7 />} />
          <Route path="/fisica2/sem8" element={<Fisica2NewLesson8 />} />
          <Route path="/fisica3" element={<Fisica3Syllabus />} />
          <Route path="/fisica3/sem1" element={<Fisica3Lesson1 />} />
          <Route path="/fisica3/sem2" element={<Fisica3Lesson2 />} />
          <Route path="/fisica3/sem3" element={<Fisica3Lesson3 />} />
          <Route path="/fisica3/sem4" element={<Fisica3Lesson4 />} />
          <Route path="/fisica3/sem5" element={<Fisica3Lesson5 />} />
          <Route path="/fisica3/sem6" element={<Fisica3Lesson6 />} />
          <Route path="/fisica3/sem7" element={<Fisica3Lesson7 />} />
          <Route path="/fisica3/sem8" element={<Fisica3Lesson8 />} />
          <Route path="/unimax-ia-energetica" element={<UnimaxLecture />} />
          <Route path="/unimax-palestra-v2" element={<UnimaxLectureV2 />} />
          <Route path="/unimax-tcc" element={<TccOrientation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
