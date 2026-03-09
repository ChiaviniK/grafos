import type { ReactNode } from "react";
import { ChevronRight, ChevronLeft, GraduationCap } from "lucide-react";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Layout({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/50 backdrop-blur-sm z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-400" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">
            Introdução a Grafos
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full z-20">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col pt-6">
          <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative h-full">
             {children}
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="h-20 border-t border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/80 backdrop-blur-md z-10">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all active:scale-95",
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-500"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white ring-1 ring-slate-700/50"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all active:scale-95",
            currentSlide === totalSlides - 1
              ? "opacity-50 cursor-not-allowed bg-blue-500/50 text-white/50"
              : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] ring-1 ring-blue-500/50"
          )}
        >
          Próximo
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
