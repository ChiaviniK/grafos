import { useState } from "react";
import { Layout } from "../components/Layout";

// Import the specific slides for this module
import { DevSecSlide1 } from "../components/slides/DevSecSlide1";
import { DevSecSlide2 } from "../components/slides/DevSecSlide2";
import { DevSecSlide3 } from "../components/slides/DevSecSlide3";
import { DevSecSlide4 } from "../components/slides/DevSecSlide4";
import { DevSecSlide5 } from "../components/slides/DevSecSlide5";

const SLIDES = [
  <DevSecSlide1 key="slide1" />,
  <DevSecSlide2 key="slide2" />,
  <DevSecSlide3 key="slide3" />,
  <DevSecSlide4 key="slide4" />,
  <DevSecSlide5 key="slide5" />,
];

export function SegurancaLesson5() {
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
      courseMenuUrl="/seguranca"
    >
      {SLIDES[currentSlide]}
    </Layout>
  );
}
