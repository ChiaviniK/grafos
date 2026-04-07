import { useState } from "react";
import { Layout } from "../components/Layout";
import { LFASlide8_1 } from "../components/slides/LFALesson8/LFASlide8_1";
import { LFASlide8_2 } from "../components/slides/LFALesson8/LFASlide8_2";
import { LFASlide8_3 } from "../components/slides/LFALesson8/LFASlide8_3";
import { LFASlide8_4 } from "../components/slides/LFALesson8/LFASlide8_4";
import { LFASlide8_5 } from "../components/slides/LFALesson8/LFASlide8_5";
import { LFASlide8_6 } from "../components/slides/LFALesson8/LFASlide8_6";
import { LFASlide8_7 } from "../components/slides/LFALesson8/LFASlide8_7";
import { LFASlide8_Topics1to3 } from "../components/slides/LFALesson8/LFASlide8_8";
import { LFASlide8_Topics4to6 } from "../components/slides/LFALesson8/LFASlide8_9";
import { LFASlide8_Topics7to9 } from "../components/slides/LFALesson8/LFASlide8_10";
import { LFASlide8_Topics10to12 } from "../components/slides/LFALesson8/LFASlide8_11";
import { LFASlide8_12 } from "../components/slides/LFALesson8/LFASlide8_12";

const SLIDES = [
  <LFASlide8_1 key="s1" />,
  <LFASlide8_2 key="s2" />,
  <LFASlide8_3 key="s3" />,
  <LFASlide8_4 key="s4" />,
  <LFASlide8_5 key="s5" />,
  <LFASlide8_6 key="s6" />,
  <LFASlide8_7 key="s7" />,
  <LFASlide8_Topics1to3 key="s8" />,
  <LFASlide8_Topics4to6 key="s9" />,
  <LFASlide8_Topics7to9 key="s10" />,
  <LFASlide8_Topics10to12 key="s11" />,
  <LFASlide8_12 key="s12" />,
];

export function LFALesson8() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Layout
      currentSlide={currentSlide}
      totalSlides={SLIDES.length}
      onNext={handleNext}
      onPrev={handlePrev}
      courseMenuUrl="/lfa"
    >
      {SLIDES[currentSlide]}
    </Layout>
  );
}
