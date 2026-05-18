import { useEffect, useState } from "react";

import { copyToClipboard } from "@/utils/copy";
import { hashText, type HashAlgorithm } from "@/utils/toolLogic";

const algorithmMap: Record<string, HashAlgorithm> = {
  "hash-md5": "MD5",
  "hash-sha1": "SHA-1",
  "hash-sha256": "SHA-256",
};

const algorithms: HashAlgorithm[] = ["MD5", "SHA-1", "SHA-256"];

type HashPanelProps = {
  toolId: string;
};

export default function HashPanel({ toolId }: HashPanelProps) {
  const [input, setInput] = useState("netwise-tools");
  const [activeAlgorithm, setActiveAlgorithm] = useState<HashAlgorithm>(algorithmMap[toolId] ?? "SHA-256");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveAlgorithm(algorithmMap[toolId] ?? "SHA-256");
    setResult("");
    setError("");
  }, [toolId]);

  const run = async (algorithm: HashAlgorithm) => {
    setActiveAlgorithm(algorithm);

    try {
      const next = await hashText(input, algorithm);
      setResult(next);
      setError("");
    } catch (runError) {
      setResult("");
      setError(runError instanceof Error ? runError.message : "哈希生成失败。");
    }
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    try {
      await copyToClipboard(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (copyError) {
      setError(copyError instanceof Error ? copyError.message : "复制失败。");
    }
  };

  return (
    <div className="grid gap-4">
      <label className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">原始文本</p>
        <textarea
          className="mt-4 h-48 w-full resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-slate-500"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        {algorithms.map((algorithm) => (
          <button
            key={algorithm}
            className={algorithm === activeAlgorithm ? "rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950" : "rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"}
            onClick={() => {
              void run(algorithm);
            }}
            type="button"
          >
            {algorithm}
          </button>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">摘要结果</p>
          <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:bg-white/10" onClick={handleCopy} type="button">
            {copied ? "已复制" : "复制结果"}
          </button>
        </div>
        <pre className="mt-4 whitespace-pre-wrap break-all text-sm leading-7 text-cyan-100">{result || "选择算法后将在这里展示摘要结果。"}</pre>
      </div>

      {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}
