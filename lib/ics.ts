function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Định dạng "floating local time" — sự kiện diễn ra theo giờ địa phương của người xem. */
function formatLocal(d: Date): string {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  );
}

function escapeText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/[,;]/g, (m) => `\\${m}`);
}

/**
 * Sinh file .ics và tải về ngay trên trình duyệt — không gọi server,
 * phù hợp ràng buộc trang preview stateless (FR-14).
 */
export function downloadIcs(opts: {
  title: string;
  start: Date;
  durationMinutes?: number;
  location?: string;
}): void {
  const end = new Date(
    opts.start.getTime() + (opts.durationMinutes ?? 180) * 60_000,
  );
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InvitationCard//VI",
    "BEGIN:VEVENT",
    `UID:${opts.start.getTime()}@invitation-card`,
    `DTSTART:${formatLocal(opts.start)}`,
    `DTEND:${formatLocal(end)}`,
    `SUMMARY:${escapeText(opts.title)}`,
    opts.location ? `LOCATION:${escapeText(opts.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "su-kien.ics";
  a.click();
  URL.revokeObjectURL(url);
}
