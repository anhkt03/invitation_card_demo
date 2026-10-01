// PRNG có seed (mulberry32) — KHÔNG dùng Math.random để recipe sinh ra tất định:
// cùng seed luôn cho cùng template, không lệch giữa server/client (hydration).

export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

/** Chọn một phần tử ngẫu nhiên. */
export function pick<T>(rng: Rng, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/** Xác suất trả về true theo tỉ lệ p (0..1). */
export function chance(rng: Rng, p: number): boolean {
  return rng() < p;
}

/** Trộn mảng (Fisher–Yates) — trả về mảng mới. */
export function shuffle<T>(rng: Rng, arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Số nguyên trong [min, max]. */
export function int(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}
