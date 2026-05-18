import { create } from "zustand";

import {
  findToolById,
  getCategoryById,
  getDefaultToolId,
  getToolsByCategory,
  toolCategories,
} from "@/data/toolCatalog";
import type { ToolCategoryId } from "@/types/tool";

type ToolStore = {
  currentCategory: ToolCategoryId;
  currentToolId: string;
  setCategory: (categoryId: ToolCategoryId) => void;
  setTool: (toolId: string) => void;
  syncSelection: (categoryId?: string | null, toolId?: string | null) => void;
};

export const useToolStore = create<ToolStore>((set, get) => ({
  currentCategory: toolCategories[0].id,
  currentToolId: getDefaultToolId(toolCategories[0].id),
  setCategory: (categoryId) => {
    const nextToolId = getDefaultToolId(categoryId);
    set({ currentCategory: categoryId, currentToolId: nextToolId });
  },
  setTool: (toolId) => {
    const tool = findToolById(toolId);

    if (!tool) {
      return;
    }

    set({ currentCategory: tool.category, currentToolId: tool.id });
  },
  syncSelection: (categoryId, toolId) => {
    const fallbackCategory = get().currentCategory;
    const resolvedCategory = getCategoryById(categoryId ?? fallbackCategory).id;
    const categoryTools = getToolsByCategory(resolvedCategory);
    const matchedTool = categoryTools.find((tool) => tool.id === toolId);

    set({
      currentCategory: resolvedCategory,
      currentToolId: matchedTool?.id ?? categoryTools[0]?.id ?? getDefaultToolId(resolvedCategory),
    });
  },
}));
