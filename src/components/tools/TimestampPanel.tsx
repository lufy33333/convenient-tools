import { useState } from "react";

import { convertTimestamp, createTimestampFromDate } from "@/utils/toolLogic";

export default function TimestampPanel() {
  const [timestampInput, setTimestampInput] = useState("1716000000");
  const [dateInput, setDateInput] = useState("2026-05-18 08:30:00");
  const [error, setError] = useState("");
  const [timestampResult, setTimestampResult] = useState<ReturnType<typeof convertTimestamp> | null>(null);
  const [dateResult, setDateResult] = useState<ReturnType<typeof createTimestampFromDate> | null>(null);

  const convertFromTimestamp = () => {
    try {
      setTimestampResult(convertTimestamp(timestampInput));
      setError("");
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "转换失败。");
    }
  };

  const convertFromDate = () => {
    try {
      setDateResult(createTimestampFromDate(dateInput));
      setError("");
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "转换失败。");
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">时间戳转日期</p>
        <input
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          onChange={(event) => setTimestampInput(event.target.value)}
          placeholder="输入 10 位或 13 位时间戳"
          value={timestampInput}
        />
        <button className="mt-4 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950" onClick={convertFromTimestamp} type="button">
          开始转换
        </button>
        <div className="mt-4 grid gap-3">
          {timestampResult ? (
            <>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">ISO: {timestampResult.iso}</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">本地时间: {timestampResult.local}</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">秒级: {timestampResult.seconds}</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">毫秒级: {timestampResult.milliseconds}</div>
            </>
          ) : null}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">日期转时间戳</p>
        <input
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          onChange={(event) => setDateInput(event.target.value)}
          placeholder="例如 2026-05-18 08:30:00"
          value={dateInput}
        />
        <button className="mt-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white" onClick={convertFromDate} type="button">
          生成时间戳
        </button>
        <div className="mt-4 grid gap-3">
          {dateResult ? (
            <>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">秒级时间戳: {dateResult.seconds}</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">毫秒级时间戳: {dateResult.milliseconds}</div>
            </>
          ) : null}
        </div>
      </div>

      {error ? <p className="xl:col-span-2 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
    </div>
  );
}
