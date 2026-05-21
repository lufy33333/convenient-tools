const rows = [
  {
    label: "运行形态",
    value: "Vercel 静态前端 / 本地浏览器计算",
  },
  {
    label: "当前能力",
    value: "展示浏览器侧可得信息与联网状态说明",
  },
  {
    label: "下一阶段",
    value: "接入 Vercel Serverless 查询真实公网 IP 与 DNS 等能力",
  },
];

function getBrowserDetails() {
  if (typeof window === "undefined") {
    return [];
  }

  return [
    { label: "当前语言", value: navigator.language },
    { label: "时区", value: Intl.DateTimeFormat().resolvedOptions().timeZone },
    { label: "在线状态", value: navigator.onLine ? "在线" : "离线" },
    { label: "User Agent", value: navigator.userAgent },
  ];
}

export default function InfoPanel() {
  const browserDetails = getBrowserDetails();

  return (
    <div className="grid gap-4">
      <div className="rounded-[1.75rem] border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50">
        当前 MVP 部署在 Vercel 静态站点上，不直接暴露真实公网 IP 查询接口。这里先展示浏览器端可读信息，并为后续 Serverless API 扩展保留说明位。
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...rows, ...browserDetails].map((item) => (
          <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
            <p className="mt-3 break-all text-sm leading-7 text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
