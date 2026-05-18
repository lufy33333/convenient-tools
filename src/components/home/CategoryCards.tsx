import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { toolCategories, toolCounts } from "@/data/toolCatalog";

export default function CategoryCards() {
  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">工具分类</p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">按照使用场景梳理，而不是把工具堆在一起。</h2>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          {toolCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/10"
                to={`/tools?category=${category.id}`}
              >
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${category.accent} p-3`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="font-display text-2xl text-white">{category.name}</h3>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-200" />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{category.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
                  <span>{category.summary}</span>
                  <span>{toolCounts[category.id]} 项</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
