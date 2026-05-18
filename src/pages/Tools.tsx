import { useEffect } from "react";
import { LayoutPanelLeft, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import ToolCardGrid from "@/components/tools/ToolCardGrid";
import ToolRenderer from "@/components/tools/ToolRenderer";
import ToolSidebar from "@/components/tools/ToolSidebar";
import { findToolById, getToolsByCategory, toolCategories, toolCounts } from "@/data/toolCatalog";
import { useToolStore } from "@/store/useToolStore";

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = useToolStore((state) => state.currentCategory);
  const currentToolId = useToolStore((state) => state.currentToolId);
  const setCategory = useToolStore((state) => state.setCategory);
  const setTool = useToolStore((state) => state.setTool);
  const syncSelection = useToolStore((state) => state.syncSelection);

  useEffect(() => {
    syncSelection(searchParams.get("category"), searchParams.get("tool"));
  }, [searchParams, syncSelection]);

  const currentTools = getToolsByCategory(currentCategory);
  const currentTool = findToolById(currentToolId) ?? currentTools[0];

  const updateSearch = (category: string, tool: string) => {
    setSearchParams({ category, tool });
  };

  const handleSelectCategory = (categoryId: typeof currentCategory) => {
    setCategory(categoryId);
    const nextToolId = getToolsByCategory(categoryId)[0]?.id;

    if (nextToolId) {
      updateSearch(categoryId, nextToolId);
    }
  };

  const handleSelectTool = (toolId: string) => {
    setTool(toolId);
    updateSearch(currentCategory, toolId);
  };

  return (
    <section className="px-6 py-10 pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">
                <LayoutPanelLeft className="h-4 w-4" />
                工具工作台
              </div>
              <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">在一个面板里完成高频网络与开发工具操作。</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                当前版本优先覆盖本地即可完成的处理型工具，操作直接、无跳转、无广告；后续网络查询型能力将逐步接入 Vercel Serverless。
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 px-5 py-4 text-sm text-emerald-50">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="h-4 w-4 text-emerald-300" />
                当前已上线 9 项 MVP 工具
              </div>
              <p className="mt-2 leading-7">所有结果都在浏览器本地完成计算，部署方式适配 Vercel。</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ToolSidebar
            categories={toolCategories}
            counts={toolCounts}
            currentCategory={currentCategory}
            onSelectCategory={handleSelectCategory}
          />

          <div className="grid gap-6">
            <ToolCardGrid currentToolId={currentToolId} onSelectTool={handleSelectTool} tools={currentTools} />
            {currentTool ? <ToolRenderer tool={currentTool} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
