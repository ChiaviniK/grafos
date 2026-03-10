import { useState } from "react";
import { Layout } from "../components/Layout";
import { Slide1 } from "../components/slides/Slide1";
import { Slide2 } from "../components/slides/Slide2";
import { Slide3 } from "../components/slides/Slide3";
import { Slide4 } from "../components/slides/Slide4";
import { Slide5 } from "../components/slides/Slide5";
import { Slide6 } from "../components/slides/Slide6";
import { Slide7 } from "../components/slides/Slide7";
import { Slide8 } from "../components/slides/Slide8";
import { Slide9 } from "../components/slides/Slide9";
import { Slide10 } from "../components/slides/Slide10";
import { Slide11 } from "../components/slides/Slide11";
import { Slide12 } from "../components/slides/Slide12";
import { Slide13 } from "../components/slides/Slide13";
import { Slide14 } from "../components/slides/Slide14";
import { Slide15 } from "../components/slides/Slide15";

const SLIDES = [
  <Slide1 key="slide1" />,
  <Slide2 key="slide2" />,
  <Slide3 key="slide3" />,
  <Slide4 key="slide4" />,
  <Slide5 key="slide5" />,
  <Slide6 key="slide6" />,
  <Slide7 key="slide7" />,
  <Slide8 key="slide8" />,
  <Slide9 key="slide9" />,
  <Slide10 key="slide10" />,
  <Slide11 key="slide11" />,
  <Slide12 key="slide12" />,
  <Slide13 key="slide13" />,
  <Slide14 key="slide14" />,
  <Slide15 key="slide15" />,
];

export function LFALesson4() {
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
