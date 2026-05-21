import { ArrowRight, PanelsTopLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  { label: "MVP 工具", value: "9" },
  { label: "工具分类", value: "4" },
  { label: "部署方式", value: "Vercel" },
];

export default function HeroSection() {
  return (
    <section className="px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">
            <Sparkles className="h-4 w-4" />
            网络工具站 MVP
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            把常用网络工具
            <span className="block text-cyan-300">收拢进一个安静、顺手的工作台。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            从 Base64、JSON、时间戳到哈希与 UUID，先用前端即可完成的高频工具构建 MVP，后续逐步接入 Vercel Serverless 扩展真实网络查询能力。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
              to="/tools"
            >
              立即使用工具台
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              to="/about"
            >
              查看迭代路线
              <PanelsTopLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{metric.label}</p>
                <p className="mt-3 font-display text-3xl text-white">{metric.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5 text-sm leading-7 text-emerald-50">
            <div className="mb-3 flex items-center gap-2 font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              当前 MVP 策略
            </div>
            先采用静态前端实现高频工具，保证部署轻量、响应直接；涉及公网查询的能力统一留给后续 Vercel Serverless API 扩展。
          </div>
        </div>
      </div>
    </section>
  );
}
