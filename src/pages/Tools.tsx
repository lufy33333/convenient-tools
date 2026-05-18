import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ToolRenderer from "@/components/tools/ToolRenderer";
import ToolSidebar from "@/components/tools/ToolSidebar";
import { findToolById, getToolsByCategory, toolCategories, tools } from "@/data/toolCatalog";
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
    const tool = findToolById(toolId);
    updateSearch(tool?.category ?? currentCategory, toolId);
  };

  return (
    <section className="px-6 py-8 pb-20 lg:px-10 lg:py-10 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <ToolSidebar
            categories={toolCategories}
            currentCategory={currentCategory}
            currentToolId={currentToolId}
            onSelectCategory={handleSelectCategory}
            onSelectTool={handleSelectTool}
            tools={tools}
          />
          <div className="min-w-0">
            {currentTool ? <ToolRenderer tool={currentTool} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
