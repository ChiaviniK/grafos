import type { ReactNode } from "react";
import { ChevronRight, ChevronLeft, GraduationCap, Linkedin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  courseMenuUrl?: string;
}

export function Layout({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  courseMenuUrl,
}: LayoutProps) {
  return (
    <div 
      className="min-h-screen flex flex-col font-sans overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* Header */}
      <header 
        className="h-16 border-b flex items-center justify-between px-6 shrink-0 backdrop-blur-sm z-10 relative"
        style={{ backgroundColor: "var(--bg-header)", borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-4">
          
          {courseMenuUrl && (
            <Link 
              to={courseMenuUrl}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors text-sm font-medium"
              style={{ 
                backgroundColor: "var(--bg-card-hover)", 
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)"
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
               <ArrowLeft className="w-4 h-4" />
               Voltar
            </Link>
          )}

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="font-semibold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
              Introdução a Grafos
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className="text-sm font-medium px-3 py-1 rounded-full border"
            style={{ 
                backgroundColor: "var(--bg-card-hover)", 
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)"
            }}
          >
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 w-full z-20" style={{ backgroundColor: "var(--border-color)" }}>
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
      <footer 
        className="h-20 border-t flex items-center justify-between px-6 shrink-0 backdrop-blur-md z-10 relative"
        style={{ backgroundColor: "var(--bg-header)", borderColor: "var(--border-color)" }}
      >
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all active:scale-95",
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-500"
              : "text-white ring-1 shadow-lg"
          )}
          style={currentSlide === 0 ? {} : { 
            backgroundColor: "var(--bg-card)", 
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
            boxShadow: "0 4px 6px var(--shadow-color)"
          }}
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        <div 
            className="absolute left-1/2 -translate-x-1/2 text-sm hidden sm:flex items-center gap-2 px-4 py-2 border rounded-full"
            style={{ 
                backgroundColor: "var(--bg-card-hover)", 
                borderColor: "var(--border-color)",
                color: "var(--text-muted)"
            }}
        >
          <span>Criado por <strong>Luiz Chiavini</strong></span>
          <span className="opacity-40">•</span>
          <a href="https://linkedin.com/in/luizchiavini" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition-colors">
            <Linkedin className="w-4 h-4" />
            @luizchiavini
          </a>
        </div>

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
