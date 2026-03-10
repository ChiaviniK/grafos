import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LFASyllabus } from "./pages/LFASyllabus";
import { LFALesson4 } from "./pages/LFALesson4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lfa" element={<LFASyllabus />} />
        <Route path="/lfa/aula4" element={<LFALesson4 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
