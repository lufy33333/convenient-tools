export async function copyToClipboard(value: string) {
  if (!navigator?.clipboard?.writeText) {
    throw new Error("当前浏览器环境不支持复制能力。");
  }

  await navigator.clipboard.writeText(value);
}
