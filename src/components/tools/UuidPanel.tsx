import { useState } from "react";

import { copyToClipboard } from "@/utils/copy";
import { generateUuidBatch } from "@/utils/toolLogic";

export default function UuidPanel() {
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    try {
      setResult(generateUuidBatch(count));
      setError("");
    } catch (runError) {
      setResult([]);
      setError(runError instanceof Error ? runError.message : "生成失败。");
    }
  };

  const handleCopy = async () => {
    if (result.length === 0) {
      return;
    }

    try {
      await copyToClipboard(result.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (copyError) {
      setError(copyError instanceof Error ? copyError.message : "复制失败。");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">批量数量</p>
        <input
          className="mt-4 w-full accent-cyan-300"
          max={8}
          min={1}
          onChange={(event) => setCount(Number(event.target.value))}
          type="range"
          value={count}
        />
        <p className="mt-3 text-sm text-slate-300">当前生成数量：{count}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950" onClick={run} type="button">
            生成 UUID
          </button>
          <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white" onClick={handleCopy} type="button">
            {copied ? "已复制" : "复制全部"}
          </button>
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">结果列表</p>
        <div className="mt-4 grid gap-3">
          {result.length > 0 ? result.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cyan-100">
              {item}
            </div>
          )) : <p className="text-sm leading-7 text-slate-400">点击“生成 UUID”后，这里会展示结果列表。</p>}
        </div>
      </div>
      {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}
