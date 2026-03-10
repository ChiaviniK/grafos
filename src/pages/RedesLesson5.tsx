import { useState, useCallback, useEffect } from "react";
import { Layout } from "../components/Layout";

import { RedesSlide1 } from "../components/slides/RedesSlide1";
import { RedesSlide2 } from "../components/slides/RedesSlide2";
import { RedesSlide3 } from "../components/slides/RedesSlide3";
import { RedesSlide4 } from "../components/slides/RedesSlide4";
import { RedesSlide5 } from "../components/slides/RedesSlide5";
import { RedesSlide6 } from "../components/slides/RedesSlide6";
import { RedesSlide7 } from "../components/slides/RedesSlide7";
import { RedesSlide8 } from "../components/slides/RedesSlide8";
import { RedesSlide9 } from "../components/slides/RedesSlide9";
import { RedesSlide10 } from "../components/slides/RedesSlide10";
import { RedesSlide11 } from "../components/slides/RedesSlide11";
import { RedesSlide12 } from "../components/slides/RedesSlide12";

const SLIDES = [
    RedesSlide1,
    RedesSlide2,
    RedesSlide3,
    RedesSlide4,
    RedesSlide5,
    RedesSlide6,
    RedesSlide7,
    RedesSlide8,
    RedesSlide9,
    RedesSlide10,
    RedesSlide11,
    RedesSlide12,
];

export function RedesLesson5() {
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
            courseMenuUrl="/redes"
            currentSlide={currentSlide}
            totalSlides={SLIDES.length}
            onNext={nextSlide}
            onPrev={prevSlide}
        >
            <div
                className="flex-1 relative flex flex-col w-full rounded-3xl overflow-hidden min-h-[600px]"
                style={{ backgroundImage: "radial-gradient(ellipse at bottom, #0a0f1e 0%, #020617 100%)" }}
            >
                <div className="flex-1 overflow-y-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-12">
                    <div className="min-h-full flex flex-col justify-center">
                        <CurrentSlideComponent />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
