import type { LucideIcon } from "lucide-react";

export type ToolCategoryId = "info" | "encode" | "data" | "dev";

export type ToolPanelType =
  | "info"
  | "transform"
  | "json"
  | "timestamp"
  | "hash"
  | "uuid";

export type ToolDefinition = {
  id: string;
  name: string;
  category: ToolCategoryId;
  description: string;
  tags: string[];
  featured?: boolean;
  icon: LucideIcon;
  panel: ToolPanelType;
  actionLabels?: {
    primary: string;
    secondary?: string;
  };
};

export type ToolCategory = {
  id: ToolCategoryId;
  name: string;
  summary: string;
  description: string;
  accent: string;
  icon: LucideIcon;
};
