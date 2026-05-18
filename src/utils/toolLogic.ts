import { md5 } from "@/utils/md5";

export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256";

export type TimestampResult = {
  iso: string;
  local: string;
  seconds: string;
  milliseconds: string;
};

function bytesToBase64(bytes: Uint8Array) {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    let binary = "";

    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return window.btoa(binary);
  }

  return Buffer.from(bytes).toString("base64");
}

function base64ToBytes(value: string) {
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    const binary = window.atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  }

  return Uint8Array.from(Buffer.from(value, "base64"));
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function encodeBase64(value: string) {
  return bytesToBase64(new TextEncoder().encode(value));
}

export function decodeBase64(value: string) {
  return new TextDecoder().decode(base64ToBytes(value));
}

export function encodeUrl(value: string) {
  return encodeURIComponent(value);
}

export function decodeUrl(value: string) {
  return decodeURIComponent(value);
}

export function formatJson(value: string) {
  return JSON.stringify(JSON.parse(value), null, 2);
}

export function minifyJson(value: string) {
  return JSON.stringify(JSON.parse(value));
}

export function convertTimestamp(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("请输入时间戳或日期文本。");
  }

  let date: Date;

  if (/^\d{10}$/.test(trimmed)) {
    date = new Date(Number(trimmed) * 1000);
  } else if (/^\d{13}$/.test(trimmed)) {
    date = new Date(Number(trimmed));
  } else {
    date = new Date(trimmed);
  }

  if (Number.isNaN(date.getTime())) {
    throw new Error("无法识别当前输入，请使用秒级、毫秒级时间戳或标准日期字符串。");
  }

  return {
    iso: date.toISOString(),
    local: new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
    seconds: Math.floor(date.getTime() / 1000).toString(),
    milliseconds: date.getTime().toString(),
  } satisfies TimestampResult;
}

export function createTimestampFromDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("请输入有效日期，例如 2026-05-18 08:30:00。");
  }

  return {
    seconds: Math.floor(date.getTime() / 1000).toString(),
    milliseconds: date.getTime().toString(),
  };
}

export async function hashText(value: string, algorithm: HashAlgorithm) {
  if (algorithm === "MD5") {
    return md5(value);
  }

  if (!globalThis.crypto?.subtle) {
    throw new Error("当前环境不支持 Web Crypto，无法生成所选哈希值。");
  }

  const digest = await globalThis.crypto.subtle.digest(
    algorithm,
    new TextEncoder().encode(value),
  );

  return toHex(digest);
}

export function generateUuidBatch(count: number) {
  const total = Math.max(1, Math.min(8, Math.floor(count)));

  return Array.from({ length: total }, () => {
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = Math.floor(Math.random() * 16);
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  });
}
