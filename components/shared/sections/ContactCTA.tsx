import { CONTACT_ZALO_URL } from "@/lib/contact";

/**
 * Nút liên hệ đặt thiệp cố định góc màn hình (FR-17) — kênh chốt đơn
 * nằm ngoài hệ thống (Zalo/hotline), web chỉ dẫn link. Số liên hệ khai báo ở lib/contact.ts.
 */
export default function ContactCTA() {
  return (
    <a
      href={CONTACT_ZALO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#0068FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-[#0052cc]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.6 1.3 4.9 3.4 6.5-.1.8-.5 2.2-1.4 3.3 0 0 2.5-.3 4.2-1.5 1.2.4 2.5.6 3.8.6 5.5 0 10-3.9 10-8.9S17.5 3 12 3Z" />
      </svg>
      Liên hệ đặt thiệp
    </a>
  );
}
