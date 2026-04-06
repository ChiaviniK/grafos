import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV = [
  {
    label: "Física",
    color: "text-amber-400",
    activeBg: "bg-amber-950/30 border-amber-500/40",
    items: [
      { label: "Física 1 · Mecânica", href: "/fisica1", color: "text-rose-400", dot: "bg-rose-500" },
      { label: "Física 2 · Termodinâmica", href: "/fisica2", color: "text-orange-400", dot: "bg-orange-500" },
      { label: "Física 3 · Eletromagnetismo", href: "/fisica3", color: "text-amber-400", dot: "bg-amber-500" },
    ],
  },
  {
    label: "TI",
    color: "text-blue-400",
    activeBg: "bg-blue-950/30 border-blue-500/40",
    items: [
      { label: "LFA · Autômatos", href: "/lfa", color: "text-blue-400", dot: "bg-blue-500" },
      { label: "Segurança da Informação", href: "/seguranca", color: "text-emerald-400", dot: "bg-emerald-500" },
      { label: "Redes Convergentes", href: "/redes", color: "text-sky-400", dot: "bg-sky-500" },
    ],
  },
];

export function GlobalHeader() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => loc.pathname.startsWith(href);
  const isHome = loc.pathname === "/";

  return (
    <>
      {/* ── Desktop Header ──────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur border-b"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" onClick={() => { setOpen(null); setMobileOpen(false); }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-sm hidden sm:block" style={{ color: "var(--text-primary)" }}>
              Portal <span style={{ color: "var(--text-muted)" }} className="font-normal">· Chiavini</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {/* Home link */}
            <Link to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all`}
              style={{
                backgroundColor: isHome ? "var(--bg-card-hover)" : "transparent",
                color: isHome ? "var(--text-primary)" : "var(--text-secondary)",
              }}
              onMouseEnter={e => { if (!isHome) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-card-hover)"; }}
              onMouseLeave={e => { if (!isHome) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              Início
            </Link>

            {NAV.map((group, gi) => (
              <div key={gi} className="relative">
                <button
                  onClick={() => setOpen(open === gi ? null : gi)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${open === gi ? group.activeBg + " border " + group.color : ""}`}
                  style={open !== gi ? { color: "var(--text-secondary)" } : {}}
                >
                  <span className={open === gi ? group.color : ""}>{group.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === gi ? "rotate-180 " + group.color : ""}`} />
                </button>

                {/* Dropdown */}
                {open === gi && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      boxShadow: `0 25px 50px var(--shadow-color)`,
                    }}
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(null)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-all ${isActive(item.href) ? item.color : ""}`}
                        style={!isActive(item.href) ? { color: "var(--text-secondary)" } : {}}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-card-hover)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = isActive(item.href) ? "var(--bg-card-hover)" : "transparent"; }}
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

          {/* Right side: current page indicator + theme toggle */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {[...NAV.flatMap(g => g.items)].find(i => isActive(i.href)) && (
              <span
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                  color: "var(--text-muted)",
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                {[...NAV.flatMap(g => g.items)].find(i => isActive(i.href))?.label.split("·")[0].trim()}
              </span>
            )}

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
              className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: theme === "dark" ? "#fbbf24" : "#6366f1",
              }}
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Tema claro" : "Tema escuro"}
              className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: theme === "dark" ? "#fbbf24" : "#6366f1",
              }}
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg transition-all"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-card-hover)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ─────────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className="md:hidden border-t animate-in slide-in-from-top-2"
            style={{
              backgroundColor: "var(--bg-base)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="px-4 py-3">
              <Link to="/" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 text-sm font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                🏠 Início
              </Link>
              {NAV.map((group, gi) => (
                <div key={gi} className="mt-2">
                  <div className={`text-xs font-black tracking-widest mb-1.5 ${group.color}`}>{group.label}</div>
                  {group.items.map(item => (
                    <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 py-2.5 px-2 rounded-lg text-sm transition-all ${isActive(item.href) ? item.color + " font-bold" : ""}`}
                      style={!isActive(item.href) ? { color: "var(--text-secondary)" } : { backgroundColor: "var(--bg-card-hover)" }}
                    >
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
