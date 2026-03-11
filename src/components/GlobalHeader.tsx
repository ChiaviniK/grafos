import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react";

const NAV = [
  {
    label: "Física",
    color: "text-amber-400",
    activeBg: "bg-amber-950/30 border-amber-500/40",
    items: [
      { label: "Física 1 · Mecânica", href: "/fisica1", color: "text-rose-300", dot: "bg-rose-500" },
      { label: "Física 2 · Termodinâmica", href: "/fisica2", color: "text-orange-300", dot: "bg-orange-500" },
      { label: "Física 3 · Eletromagnetismo", href: "/fisica3", color: "text-amber-300", dot: "bg-amber-500" },
    ],
  },
  {
    label: "TI",
    color: "text-blue-400",
    activeBg: "bg-blue-950/30 border-blue-500/40",
    items: [
      { label: "LFA · Autômatos", href: "/lfa", color: "text-blue-300", dot: "bg-blue-500" },
      { label: "Segurança da Informação", href: "/seguranca", color: "text-emerald-300", dot: "bg-emerald-500" },
      { label: "Redes Convergentes", href: "/redes", color: "text-sky-300", dot: "bg-sky-500" },
    ],
  },
];

export function GlobalHeader() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  const isActive = (href: string) => loc.pathname.startsWith(href);
  const isHome = loc.pathname === "/";

  return (
    <>
      {/* ── Desktop Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" onClick={() => { setOpen(null); setMobileOpen(false); }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white text-sm hidden sm:block">Portal <span className="text-slate-500 font-normal">· Chiavini</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {/* Home link */}
            <Link to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isHome ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}>
              Início
            </Link>

            {NAV.map((group, gi) => (
              <div key={gi} className="relative">
                <button
                  onClick={() => setOpen(open === gi ? null : gi)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${open === gi ? group.activeBg + " border " + group.color : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}
                >
                  <span className={open === gi ? group.color : ""}>{group.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === gi ? "rotate-180 " + group.color : ""}`} />
                </button>

                {/* Dropdown */}
                {open === gi && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(null)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-slate-800 ${isActive(item.href) ? "bg-slate-800/60 " + item.color : "text-slate-300"}`}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${item.dot} ${isActive(item.href) ? "opacity-100" : "opacity-40"}`} />
                        {item.label}
                        {isActive(item.href) && <span className="ml-auto text-xs opacity-60">● Atual</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side indicator */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {[...NAV.flatMap(g => g.items)].find(i => isActive(i.href)) && (
              <span className="text-xs text-slate-500 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full">
                {[...NAV.flatMap(g => g.items)].find(i => isActive(i.href))?.label.split("·")[0].trim()}
              </span>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ── Mobile Menu ─────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 animate-in slide-in-from-top-2">
            <div className="px-4 py-3">
              <Link to="/" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 text-sm font-semibold text-slate-300 hover:text-white">
                🏠 Início
              </Link>
              {NAV.map((group, gi) => (
                <div key={gi} className="mt-2">
                  <div className={`text-xs font-black tracking-widest mb-1.5 ${group.color}`}>{group.label}</div>
                  {group.items.map(item => (
                    <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 py-2.5 px-2 rounded-lg text-sm transition-all ${isActive(item.href) ? item.color + " font-bold bg-slate-900" : "text-slate-400 hover:text-white"}`}>
                      <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Click outside to close */}
      {open !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(null)} />
      )}
    </>
  );
}
