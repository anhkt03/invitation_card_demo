import Link from "next/link";
import { CONTACT, CONTACT_TEL_URL } from "@/lib/contact";

/**
 * Footer pháp lý — bắt buộc xuất hiện trên mọi trang public,
 * kể cả trang thiệp khách mời xem (FR-72, FR-73).
 */
export default function LegalFooter({ muted = false }: { muted?: boolean }) {
  return (
    <footer
      className="space-y-1 py-6 text-center text-xs"
      style={muted ? { color: "var(--tpl-muted)" } : undefined}
    >
      <p className={muted ? "" : "text-zinc-400"}>
        <Link
          href="/chinh-sach-bao-mat"
          className="underline-offset-2 hover:underline"
        >
          Chính sách bảo mật
        </Link>
        <span className="mx-2">·</span>
        <Link
          href="/dieu-khoan-su-dung"
          className="underline-offset-2 hover:underline"
        >
          Điều khoản sử dụng
        </Link>
      </p>
      <p className={muted ? "opacity-90" : "text-zinc-400"}>
        Liên hệ:{" "}
        <a
          href={CONTACT_TEL_URL}
          className="font-medium underline-offset-2 hover:underline"
        >
          {CONTACT.phone}
        </a>
        <span className="mx-2">·</span>
        Thiết kế bởi {CONTACT.author}
      </p>
      <p className={muted ? "opacity-80" : "text-zinc-300"}>
        © 2026 Thiệp Mời Online
      </p>
    </footer>
  );
}
