import { useState } from "react";

import { copyToClipboard } from "@/utils/copy";
import { formatJson, minifyJson } from "@/utils/toolLogic";

const sample = '{"name":"NetWise","status":"mvp","tools":["json","hash","uuid"]}';

export default function JsonPanel() {
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (mode: "format" | "minify" | "validate") => {
    try {
      if (mode === "validate") {
        JSON.parse(input);
        setOutput("JSON 校验通过，结构合法。");
      } else if (mode === "format") {
        setOutput(formatJson(input));
      } else {
        setOutput(minifyJson(input));
      }
      setError("");
    } catch (runError) {
      setOutput("");
      setError(runError instanceof Error ? runError.message : "JSON 处理失败。");
    }
  };

  const handleCopy = async () => {
    if (!output) {
      return;
    }

    try {
      await copyToClipboard(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (copyError) {
      setError(copyError instanceof Error ? copyError.message : "复制失败。");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-2">
        <label className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">原始 JSON</p>
          <textarea
            className="mt-4 h-64 w-full resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-slate-500"
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
        </label>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">处理结果</p>
            <button
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:bg-white/10"
              onClick={handleCopy}
              type="button"
            >
              {copied ? "已复制" : "复制结果"}
            </button>
          </div>
          <pre className="mt-4 h-64 overflow-auto whitespace-pre-wrap break-all text-sm leading-7 text-cyan-100">{output || "格式化、美化或校验结果会展示在这里。"}</pre>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950" onClick={() => run("format")} type="button">
          美化 JSON
        </button>
        <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white" onClick={() => run("minify")} type="button">
          压缩 JSON
        </button>
        <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white" onClick={() => run("validate")} type="button">
          校验 JSON
        </button>
      </div>
      {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}
