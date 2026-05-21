const principles = [
  "先做高频工具，把产品入口搭稳。",
  "优先前端本地计算，降低部署与维护成本。",
  "需要远程能力时，统一落到 Vercel Serverless。",
  "以简洁、安静、可信赖的体验为长期设计方向。",
];

const roadmap = [
  "增加真实 IP、DNS、端口与 HTTP 状态工具。",
  "加入最近使用、收藏与历史记录。",
  "支持 URL 参数分享和多语言界面。",
  "根据反馈考虑账号体系与团队协作能力。",
];

export default function About() {
  return (
    <section className="px-6 py-10 pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">项目定位</p>
          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">让网络工具回归效率，而不是让用户去适应杂乱页面。</h1>
          <p className="mt-6 text-base leading-8 text-slate-300">
            NetWise Tools 的目标不是一次性塞进大量能力，而是先建立一个可信赖的起点：界面安静、分类明确、结果直观、部署轻量，后续再稳步增加远程网络诊断能力。
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-7">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">产品原则</p>
          <div className="mt-6 grid gap-3">
            {principles.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7 lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">后续规划</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {roadmap.map((item, index) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">阶段 0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
