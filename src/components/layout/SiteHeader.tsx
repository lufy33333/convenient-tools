import { Compass, LayoutDashboard, Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/tools", label: "工具台" },
  { to: "/about", label: "关于" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link className="flex items-center gap-3 text-white" to="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <Compass className="h-5 w-5 text-cyan-200" />
          </div>
          <div>
            <p className="font-display text-lg tracking-wide text-white">NetWise Tools</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Vercel-ready network utilities</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white",
                  isActive && "bg-white text-slate-950",
                )
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:-translate-y-0.5 hover:bg-cyan-300/25"
          to="/tools"
        >
          <LayoutDashboard className="h-4 w-4" />
          进入工具台
          <Sparkles className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
