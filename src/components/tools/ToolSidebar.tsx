import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import type { ToolCategory, ToolCategoryId, ToolDefinition } from "@/types/tool";

import { cn } from "@/lib/utils";

type ToolSidebarProps = {
  categories: ToolCategory[];
  currentCategory: ToolCategoryId;
  currentToolId: string;
  tools: ToolDefinition[];
  onSelectCategory: (categoryId: ToolCategoryId) => void;
  onSelectTool: (toolId: string) => void;
};

export default function ToolSidebar({
  categories,
  currentCategory,
  currentToolId,
  tools,
  onSelectCategory,
  onSelectTool,
}: ToolSidebarProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const counts = useMemo(() => {
    return tools.reduce<Record<ToolCategoryId, number>>(
      (accumulator, tool) => {
        accumulator[tool.category] = (accumulator[tool.category] ?? 0) + 1;
        return accumulator;
      },
      {
        info: 0,
        encode: 0,
        data: 0,
        dev: 0,
      },
    );
  }, [tools]);

  const filteredTools = useMemo(() => {
    if (!normalizedQuery) {
      return tools;
    }

    return tools.filter((tool) => {
      const haystack = `${tool.name} ${tool.description} ${tool.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, tools]);

  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索工具 / 标签"
          value={query}
        />
        {query ? (
          <button
            className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300 transition hover:bg-white/10"
            onClick={() => setQuery("")}
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <p className="px-3 pb-3 text-xs uppercase tracking-[0.28em] text-slate-400">
        {normalizedQuery ? "搜索结果" : "分类导航"}
      </p>

      <div className="grid gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const active = currentCategory === category.id;
          const categoryTools = filteredTools.filter((tool) => tool.category === category.id);
          const expanded = normalizedQuery ? categoryTools.length > 0 : active;

          if (normalizedQuery && categoryTools.length === 0) {
            return null;
          }

          return (
            <div key={category.id} className="rounded-[1.5rem] border border-white/10 bg-slate-950/40">
              <button
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-[1.5rem] px-4 py-4 text-left transition",
                  active ? "bg-white/5 text-white" : "text-slate-300 hover:bg-white/5",
                )}
                onClick={() => onSelectCategory(category.id)}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-2xl border p-2",
                      active ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/5 text-slate-200",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{category.summary}</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200">
                  {counts[category.id]}
                </span>
              </button>

              {expanded ? (
                <div className="grid gap-1 px-3 pb-3">
                  {categoryTools.map((tool) => {
                    const toolActive = tool.id === currentToolId;
                    const ToolIcon = tool.icon;

                    return (
                      <button
                        key={tool.id}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
                          toolActive
                            ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-50"
                            : "border border-transparent text-slate-200 hover:border-white/10 hover:bg-white/5",
                        )}
                        onClick={() => onSelectTool(tool.id)}
                        type="button"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <ToolIcon className="h-4 w-4 text-cyan-200" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{tool.name}</p>
                          <p className="mt-1 truncate text-xs text-slate-400">{tool.tags[0]}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
