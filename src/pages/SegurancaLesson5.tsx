import { useState, useCallback, useEffect } from "react";
import { Layout } from "../components/Layout";

import { DevSecSlide1 } from "../components/slides/DevSecSlide1";
import { DevSecSlide2 } from "../components/slides/DevSecSlide2";
import { DevSecSlide3 } from "../components/slides/DevSecSlide3";
import { DevSecSlide4 } from "../components/slides/DevSecSlide4";
import { DevSecSlide5 } from "../components/slides/DevSecSlide5";
import { DevSecSlide6 } from "../components/slides/DevSecSlide6";
import { DevSecSlide7 } from "../components/slides/DevSecSlide7";
import { DevSecSlide8 } from "../components/slides/DevSecSlide8";
import { DevSecSlide9 } from "../components/slides/DevSecSlide9";
import { DevSecSlide10 } from "../components/slides/DevSecSlide10";
import { DevSecSlide11 } from "../components/slides/DevSecSlide11";
import { DevSecSlide12 } from "../components/slides/DevSecSlide12";
import { DevSecSlide13 } from "../components/slides/DevSecSlide13";
import { DevSecSlide14 } from "../components/slides/DevSecSlide14";
import { DevSecSlide15 } from "../components/slides/DevSecSlide15";

const SLIDES = [
  DevSecSlide1,
  DevSecSlide2,
  DevSecSlide3,
  DevSecSlide4,
  DevSecSlide5,
  DevSecSlide6,
  DevSecSlide7,
  DevSecSlide8,
  DevSecSlide9,
  DevSecSlide10,
  DevSecSlide11,
  DevSecSlide12,
  DevSecSlide13,
  DevSecSlide14,
  DevSecSlide15,
];

export default function SegurancaLesson5() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <Layout 
      courseMenuUrl="/seguranca"
      currentSlide={currentSlide}
      totalSlides={SLIDES.length}
      onNext={nextSlide}
      onPrev={prevSlide}
    >
       <div className="flex-1 overflow-hidden relative" style={{ backgroundImage: "radial-gradient(ellipse at bottom, #0f172a 0%, #020617 100%)" }}>
         {/* Slide Content Area */}
         <div className="absolute inset-x-8 top-16 bottom-8 md:inset-x-24 md:top-24 md:bottom-12 flex items-center justify-center">
             <CurrentSlideComponent />
         </div>
       </div>
    </Layout>
  );
}
