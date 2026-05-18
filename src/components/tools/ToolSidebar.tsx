import type { ToolCategory, ToolCategoryId } from "@/types/tool";

import { cn } from "@/lib/utils";

type ToolSidebarProps = {
  categories: ToolCategory[];
  counts: Record<ToolCategoryId, number>;
  currentCategory: ToolCategoryId;
  onSelectCategory: (categoryId: ToolCategoryId) => void;
};

export default function ToolSidebar({
  categories,
  counts,
  currentCategory,
  onSelectCategory,
}: ToolSidebarProps) {
  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 lg:sticky lg:top-24">
      <p className="px-3 pb-3 text-xs uppercase tracking-[0.28em] text-slate-400">分类导航</p>
      <div className="grid gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const active = currentCategory === category.id;

          return (
            <button
              key={category.id}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition",
                active
                  ? "border-cyan-300/30 bg-cyan-300/10 text-white"
                  : "border-white/10 bg-slate-950/50 text-slate-300 hover:border-white/20 hover:bg-white/5",
              )}
              onClick={() => onSelectCategory(category.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{category.summary}</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">{counts[category.id]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
