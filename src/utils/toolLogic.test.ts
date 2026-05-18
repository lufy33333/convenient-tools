import { describe, expect, it } from "vitest";

import {
  convertTimestamp,
  createTimestampFromDate,
  decodeBase64,
  decodeUrl,
  encodeBase64,
  encodeUrl,
  formatJson,
  generateUuidBatch,
  hashText,
  minifyJson,
} from "@/utils/toolLogic";

describe("toolLogic", () => {
  it("支持 UTF-8 Base64 编解码", () => {
    const encoded = encodeBase64("你好, NetWise");
    expect(encoded).toBe("5L2g5aW9LCBOZXRXaXNl");
    expect(decodeBase64(encoded)).toBe("你好, NetWise");
  });

  it("支持 URL 编解码", () => {
    const encoded = encodeUrl("https://example.com?q=中文 参数");
    expect(encoded).toContain("%E4%B8%AD%E6%96%87");
    expect(decodeUrl(encoded)).toBe("https://example.com?q=中文 参数");
  });

  it("支持 JSON 格式化与压缩", () => {
    expect(formatJson('{"a":1,"b":2}')).toContain('\n  "a": 1,');
    expect(minifyJson('{"a":1,"b":2}')).toBe('{"a":1,"b":2}');
  });

  it("支持时间戳转换", () => {
    const result = convertTimestamp("1716000000");
    expect(result.seconds).toBe("1716000000");
    expect(result.milliseconds).toBe("1716000000000");
  });

  it("支持日期转时间戳", () => {
    const result = createTimestampFromDate("2026-05-18T08:30:00Z");
    expect(result.seconds).toBe("1779093000");
    expect(result.milliseconds).toBe("1779093000000");
  });

  it("支持 MD5 与 SHA-256 生成", async () => {
    await expect(hashText("netwise-tools", "MD5")).resolves.toBe("86f3162ad5de8ae5e5865d6a4a464a44");
    await expect(hashText("netwise-tools", "SHA-256")).resolves.toBe("34a2120dc442c8e6064655e2326f3557531b2f4897546781dfe188fcdebdbb37");
  });

  it("支持批量 UUID 生成", () => {
    const result = generateUuidBatch(3);
    expect(result).toHaveLength(3);
    expect(result[0]).toMatch(/^[0-9a-f-]{36}$/);
  });
});
