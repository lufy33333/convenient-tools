import type { ToolDefinition } from "@/types/tool";

import HashPanel from "@/components/tools/HashPanel";
import InfoPanel from "@/components/tools/InfoPanel";
import JsonPanel from "@/components/tools/JsonPanel";
import TimestampPanel from "@/components/tools/TimestampPanel";
import TransformPanel from "@/components/tools/TransformPanel";
import UuidPanel from "@/components/tools/UuidPanel";

type ToolRendererProps = {
  tool: ToolDefinition;
};

export default function ToolRenderer({ tool }: ToolRendererProps) {
  const Icon = tool.icon;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/70">
            <Icon className="h-6 w-6 text-cyan-200" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">当前工具</p>
            <h2 className="mt-2 font-display text-3xl text-white">{tool.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">{tool.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {tool.panel === "info" ? <InfoPanel /> : null}
      {tool.panel === "transform" ? (
        <TransformPanel
          primaryLabel={tool.actionLabels?.primary ?? "执行转换"}
          secondaryLabel={tool.actionLabels?.secondary}
          toolId={tool.id}
        />
      ) : null}
      {tool.panel === "json" ? <JsonPanel /> : null}
      {tool.panel === "timestamp" ? <TimestampPanel /> : null}
      {tool.panel === "hash" ? <HashPanel toolId={tool.id} /> : null}
      {tool.panel === "uuid" ? <UuidPanel /> : null}
    </section>
  );
}
