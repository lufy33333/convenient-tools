import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { featuredTools } from "@/data/toolCatalog";

export default function FeaturedTools() {
  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">推荐工具</p>
            <h2 className="mt-3 font-display text-3xl text-white">先从最常用的几个入口开始。</h2>
          </div>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100" to="/tools">
            查看全部工具
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 transition hover:border-cyan-300/30 hover:bg-slate-900"
                to={`/tools?category=${tool.category}&tool=${tool.id}`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-cyan-200" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{tool.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{tool.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
