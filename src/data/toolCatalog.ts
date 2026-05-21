import {
  Binary,
  Clock3,
  FileJson2,
  Fingerprint,
  Globe2,
  Hash,
  Link2,
  type LucideIcon,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import type { ToolCategory, ToolCategoryId, ToolDefinition } from "@/types/tool";

export const toolCategories: ToolCategory[] = [
  {
    id: "info",
    name: "信息查询",
    summary: "环境信息与联网状态说明",
    description: "聚合浏览器可直接提供的信息，并为后续接入真实网络查询能力预留位置。",
    accent: "from-cyan-400/30 to-sky-500/10",
    icon: Globe2,
  },
  {
    id: "encode",
    name: "编解码",
    summary: "处理编码、转义与粘贴格式",
    description: "覆盖日常最常用的文本编码转换，减少在多个网站之间来回跳转。",
    accent: "from-emerald-400/30 to-teal-500/10",
    icon: Binary,
  },
  {
    id: "data",
    name: "数据处理",
    summary: "结构化文本与时间转换",
    description: "面向开发和排障场景的高频格式化、校验和转换能力。",
    accent: "from-violet-400/30 to-indigo-500/10",
    icon: FileJson2,
  },
  {
    id: "dev",
    name: "开发辅助",
    summary: "哈希、标识符与调试常用项",
    description: "让常见开发工具集中在一个工作台里，保持操作连贯。",
    accent: "from-amber-300/30 to-orange-500/10",
    icon: Sparkles,
  },
];

export const tools: ToolDefinition[] = [
  {
    id: "ip-insight",
    name: "IP 信息占位",
    category: "info",
    description: "当前版本展示浏览器侧可用信息，并说明 Vercel 静态版的网络能力边界。",
    tags: ["前端静态版", "后续接入 Serverless", "浏览器信息"],
    featured: true,
    icon: Network,
    panel: "info",
  },
  {
    id: "base64",
    name: "Base64 编码 / 解码",
    category: "encode",
    description: "支持 UTF-8 文本的 Base64 双向转换，适合接口调试和数据整理。",
    tags: ["UTF-8", "双向转换", "复制结果"],
    featured: true,
    icon: Binary,
    panel: "transform",
    actionLabels: {
      primary: "编码为 Base64",
      secondary: "从 Base64 解码",
    },
  },
  {
    id: "url",
    name: "URL 编码 / 解码",
    category: "encode",
    description: "快速处理参数、中文链接和重定向地址中的编码内容。",
    tags: ["URI", "参数处理", "链接排障"],
    icon: Link2,
    panel: "transform",
    actionLabels: {
      primary: "执行 URL 编码",
      secondary: "执行 URL 解码",
    },
  },
  {
    id: "json-format",
    name: "JSON 格式化与校验",
    category: "data",
    description: "对 JSON 文本进行美化、压缩和语法校验，并给出清晰错误提示。",
    tags: ["格式化", "校验", "压缩"],
    featured: true,
    icon: FileJson2,
    panel: "json",
  },
  {
    id: "timestamp",
    name: "时间戳转换",
    category: "data",
    description: "在秒级、毫秒级时间戳和日期时间之间快速互转。",
    tags: ["秒", "毫秒", "日期转换"],
    icon: Clock3,
    panel: "timestamp",
  },
  {
    id: "hash-md5",
    name: "MD5 生成",
    category: "dev",
    description: "用于兼容老系统校验场景的 MD5 文本摘要生成。",
    tags: ["MD5", "摘要", "兼容系统"],
    icon: Hash,
    panel: "hash",
  },
  {
    id: "hash-sha1",
    name: "SHA-1 生成",
    category: "dev",
    description: "快速得到 SHA-1 摘要，适合老接口或签名联调。",
    tags: ["SHA-1", "签名", "调试"],
    icon: ShieldCheck,
    panel: "hash",
  },
  {
    id: "hash-sha256",
    name: "SHA-256 生成",
    category: "dev",
    description: "提供更常用的 SHA-256 摘要，适合安全校验和内容指纹。",
    tags: ["SHA-256", "内容校验", "安全"],
    featured: true,
    icon: Fingerprint,
    panel: "hash",
  },
  {
    id: "uuid",
    name: "UUID 生成",
    category: "dev",
    description: "生成单个或批量 UUID，适合测试数据、对象标识和联调示例。",
    tags: ["UUID", "批量生成", "复制"],
    icon: Sparkles,
    panel: "uuid",
  },
];

export const featuredTools = tools.filter((tool) => tool.featured);

export const toolCounts = toolCategories.reduce<Record<ToolCategoryId, number>>(
  (accumulator, category) => {
    accumulator[category.id] = tools.filter((tool) => tool.category === category.id).length;
    return accumulator;
  },
  {
    info: 0,
    encode: 0,
    data: 0,
    dev: 0,
  },
);

export function getToolsByCategory(categoryId: ToolCategoryId) {
  return tools.filter((tool) => tool.category === categoryId);
}

export function getDefaultToolId(categoryId: ToolCategoryId) {
  return getToolsByCategory(categoryId)[0]?.id ?? tools[0].id;
}

export function findToolById(toolId: string | null | undefined) {
  return tools.find((tool) => tool.id === toolId) ?? null;
}

export function getCategoryById(categoryId: string | null | undefined) {
  return toolCategories.find((category) => category.id === categoryId) ?? toolCategories[0];
}

export function getIconLabel(Icon: LucideIcon) {
  return Icon.displayName ?? "工具图标";
}
