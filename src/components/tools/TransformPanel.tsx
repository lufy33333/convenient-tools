import { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";

import { copyToClipboard } from "@/utils/copy";
import { decodeBase64, decodeUrl, encodeBase64, encodeUrl } from "@/utils/toolLogic";

type TransformPanelProps = {
  toolId: string;
  primaryLabel: string;
  secondaryLabel?: string;
};

export default function TransformPanel({ toolId, primaryLabel, secondaryLabel }: TransformPanelProps) {
  const [input, setInput] = useState("hello@netwise.tools");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handlers = useMemo(() => {
    if (toolId === "base64") {
      return {
        primary: encodeBase64,
        secondary: decodeBase64,
      };
    }

    return {
      primary: encodeUrl,
      secondary: decodeUrl,
    };
  }, [toolId]);

  const runAction = (mode: "primary" | "secondary") => {
    try {
      const next = handlers[mode](input);
      setOutput(next);
      setError("");
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "转换失败，请检查输入内容。");
      setOutput("");
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
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">输入内容</p>
          <textarea
            className="mt-4 h-56 w-full resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-slate-500"
            onChange={(event) => setInput(event.target.value)}
            placeholder="请输入待处理的文本内容"
            value={input}
          />
        </label>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">输出结果</p>
            <button
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:bg-white/10"
              onClick={handleCopy}
              type="button"
            >
              {copied ? "已复制" : "复制结果"}
            </button>
          </div>
          <pre className="mt-4 h-56 overflow-auto whitespace-pre-wrap break-all text-sm leading-7 text-cyan-100">{output || "执行转换后，这里会展示结果。"}</pre>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
          onClick={() => runAction("primary")}
          type="button"
        >
          {primaryLabel}
        </button>
        {secondaryLabel ? (
          <button
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            onClick={() => runAction("secondary")}
            type="button"
          >
            {secondaryLabel}
          </button>
        ) : null}
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          type="button"
        >
          <RefreshCcw className="h-4 w-4" />
          清空
        </button>
      </div>

      {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}
