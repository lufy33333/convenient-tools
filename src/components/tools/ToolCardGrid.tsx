import type { ToolDefinition } from "@/types/tool";

import { cn } from "@/lib/utils";

type ToolCardGridProps = {
  tools: ToolDefinition[];
  currentToolId: string;
  onSelectTool: (toolId: string) => void;
};

export default function ToolCardGrid({ tools, currentToolId, onSelectTool }: ToolCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const active = tool.id === currentToolId;

        return (
          <button
            key={tool.id}
            className={cn(
              "rounded-[1.5rem] border p-5 text-left transition",
              active
                ? "border-cyan-300/30 bg-cyan-300/10 shadow-[0_20px_40px_rgba(34,211,238,0.08)]"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
            )}
            onClick={() => onSelectTool(tool.id)}
            type="button"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70">
                <Icon className="h-5 w-5 text-cyan-200" />
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                {tool.tags[0]}
              </div>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{tool.name}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{tool.description}</p>
          </button>
        );
      })}
    </div>
  );
}
