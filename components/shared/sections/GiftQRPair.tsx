type Recipient = {
  /** Nhãn thẻ, vd "Chú rể". */
  label: string;
  /** Ảnh QR thật; để trống thì hiển thị mã minh hoạ. */
  qrImage?: string;
  holder: string;
  /** Thông tin ngân hàng, mỗi dòng một ý. */
  bank?: string;
  /** Hạt giống sinh mã QR minh hoạ (ổn định giữa các lần render). */
  seed: number;
};

const N = 25;

/** Sinh ma trận QR giả deterministic (có 3 ô định vị) — chỉ để minh hoạ khi chưa có QR thật. */
function fakeQrCells(seed: number): boolean[][] {
  let s = seed;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const g: boolean[][] = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => rnd() > 0.52),
  );
  const finder = (R: number, C: number) => {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const yy = R + y;
        const xx = C + x;
        if (yy < 0 || xx < 0 || yy >= N || xx >= N) continue;
        const inBox = y >= 0 && y <= 6 && x >= 0 && x <= 6;
        g[yy][xx] =
          inBox &&
          (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4));
      }
    }
  };
  finder(0, 0);
  finder(0, N - 7);
  finder(N - 7, 0);
  for (let i = 8; i < N - 8; i++) {
    g[6][i] = i % 2 === 0;
    g[i][6] = i % 2 === 0;
  }
  return g;
}

function FakeQr({ seed }: { seed: number }) {
  const cells = fakeQrCells(seed);
  const d = cells
    .flatMap((row, r) => row.map((on, c) => (on ? `M${c} ${r}h1v1h-1z` : "")))
    .join("");
  return (
    <svg viewBox={`0 0 ${N} ${N}`} className="block size-[125px]" aria-label="Mã QR minh hoạ">
      <path d={d} fill="#2E2B25" />
    </svg>
  );
}

/** Hai thẻ QR mừng cưới (chú rể / cô dâu) — ảnh QR do khách cung cấp, chỉ hiển thị. */
export default function GiftQRPair({ items }: { items: [Recipient, Recipient] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex flex-col items-center gap-2.5 rounded-md border px-3 py-[18px] text-center"
          style={{
            background: "var(--tpl-surface)",
            borderColor: "color-mix(in srgb, var(--tpl-muted) 28%, transparent)",
          }}
        >
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--tpl-primary)" }}
          >
            {it.label}
          </div>
          <div className="rounded bg-white p-2">
            {it.qrImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ
              <img src={it.qrImage} alt="Mã QR chuyển khoản" className="block size-[125px] object-contain" />
            ) : (
              <FakeQr seed={it.seed} />
            )}
          </div>
          <div className="text-[13px] font-semibold" style={{ color: "var(--tpl-text)" }}>
            {it.holder}
          </div>
          {it.bank && (
            <p
              className="whitespace-pre-line text-[11px] leading-relaxed"
              style={{ color: "var(--tpl-text)", opacity: 0.72 }}
            >
              {it.bank}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
