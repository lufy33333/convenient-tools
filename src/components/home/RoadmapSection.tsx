const roadmap = [
  {
    stage: "MVP",
    title: "高频本地工具集",
    description: "先把编码、JSON、时间戳、哈希、UUID 这些能在浏览器直接完成的工具打磨好。",
  },
  {
    stage: "Next",
    title: "接入 Serverless 查询能力",
    description: "通过 Vercel Functions 补齐真实 IP、DNS、HTTP 状态与网络诊断类工具。",
  },
  {
    stage: "Later",
    title: "形成个人效率工具箱",
    description: "加入历史记录、收藏、分享链接、多语言与账号体系，形成长期使用入口。",
  },
];

export default function RoadmapSection() {
  return (
    <section className="px-6 py-10 pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">迭代路线</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">先做一个稳定的入口，再逐步让能力向外生长。</h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {roadmap.map((item, index) => (
            <article key={item.stage} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">0{index + 1} · {item.stage}</p>
              <h3 className="mt-4 font-display text-2xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
