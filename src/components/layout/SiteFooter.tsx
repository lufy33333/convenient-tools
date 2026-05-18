import { CloudCog, Rocket } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 text-sm text-slate-400 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <p className="font-display text-xl text-white">NetWise Tools</p>
          <p className="mt-3 max-w-2xl leading-7">
            一个为开发者与高频互联网用户准备的轻量网络工具站，先用纯前端 MVP 建立稳定体验，再逐步扩展到 Vercel Serverless 能力。
          </p>
        </div>
        <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3 text-white">
            <CloudCog className="h-4 w-4 text-cyan-300" />
            静态站点部署到 Vercel
          </div>
          <div className="flex items-center gap-3 text-white">
            <Rocket className="h-4 w-4 text-emerald-300" />
            下一步扩展 Serverless 查询服务
          </div>
        </div>
      </div>
    </footer>
  );
}
