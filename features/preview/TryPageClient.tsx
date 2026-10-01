"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import SchemaForm from "@/components/shared/inputs/SchemaForm";
import ContactCTA from "@/components/shared/sections/ContactCTA";
import { getTemplate } from "@/components/templates";
import { applyDefaults, CATEGORY_LABELS } from "@/components/templates/types";
import { isDirty, usePreviewStore } from "./preview-store";

function PreviewFrame({ children }: { children: ReactNode }) {
  // Khung mô phỏng iPhone 15 Pro Max — tỉ lệ 9:19.5, Dynamic Island, nút cạnh titan.
  return (
    <div className="relative mx-auto h-[var(--ph)] w-[calc(var(--ph)*9/19.5)] max-w-full [--ph:clamp(440px,calc(100vh-12.5rem),680px)] rounded-[3rem] bg-gradient-to-b from-zinc-600 to-zinc-800 p-[3px] shadow-2xl">
      {/* Nút cạnh trái: Action + tăng/giảm âm lượng */}
      <span className="absolute -left-[2px] top-[14%] h-[3.5%] w-[3px] rounded-l bg-zinc-500" />
      <span className="absolute -left-[2px] top-[20%] h-[6%] w-[3px] rounded-l bg-zinc-500" />
      <span className="absolute -left-[2px] top-[28%] h-[6%] w-[3px] rounded-l bg-zinc-500" />
      {/* Nút cạnh phải: nguồn */}
      <span className="absolute -right-[2px] top-[23%] h-[9%] w-[3px] rounded-r bg-zinc-500" />

      <div className="h-full w-full rounded-[2.85rem] bg-black p-[10px]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-white">
          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
          <div className="no-scrollbar h-full w-full overflow-y-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Trang nhập thử + preview real-time (FR-10 → FR-17) — hoàn toàn stateless:
 * dữ liệu chỉ nằm trong store bộ nhớ, không có bất kỳ request ghi nào lên server.
 */
export default function TryPageClient({ templateKey }: { templateKey: string }) {
  // Trang server đã validate key tồn tại trước khi render component này.
  const entry = getTemplate(templateKey)!;
  const { meta, Component } = entry;

  const data = usePreviewStore((s) => s.data);
  const style = usePreviewStore((s) => s.style);
  const saved = usePreviewStore((s) => s.saved);
  const init = usePreviewStore((s) => s.init);
  const setField = usePreviewStore((s) => s.setField);
  const setStyle = usePreviewStore((s) => s.setStyle);
  const setSaved = usePreviewStore((s) => s.setSaved);

  const [mobilePane, setMobilePane] = useState<"form" | "preview">("form");

  useEffect(() => {
    init(templateKey, meta.defaultStyle);
  }, [templateKey, meta.defaultStyle, init]);

  // Cảnh báo xác nhận khi rời trang lúc đã nhập dữ liệu (FR-16).
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty(usePreviewStore.getState().data)) e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Ô bỏ trống → dùng nội dung mẫu (chỉ ở trang xem thử; thiệp thật thiếu gì thì để trống).
  const previewData = useMemo(() => applyDefaults(meta, data), [meta, data]);
  const card = <Component data={previewData} style={style} />;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* Banner cảnh báo không lưu trữ — luôn hiển thị (FR-16, FR-14) */}
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-5 text-amber-800">
        <span aria-hidden>⚠️</span>
        <p>
          Dữ liệu bạn nhập <strong>chỉ để xem thử</strong> và{" "}
          <strong>không được lưu lại</strong> — tải lại hay đóng trang là mất.
          Ảnh chỉ hiển thị trên máy bạn, không tải lên máy chủ. Ưng mẫu này?
          Bấm <strong>&ldquo;Liên hệ đặt thiệp&rdquo;</strong> để đội ngũ tạo
          thiệp thật cho bạn.
        </p>
      </div>

      {/* Thanh công cụ */}
      <div className="sticky top-16 z-30 bg-white shadow-sm shadow-violet-100/50 -mx-4 mt-3 flex items-center justify-between gap-3 border-b border-violet-100 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-sm text-zinc-400 transition hover:text-zinc-700"
          >
            ‹ Chọn mẫu khác
          </Link>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {meta.name}
            </p>
            <p className="text-xs text-zinc-400">
              {CATEGORY_LABELS[meta.category]}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved ? (
            <button
              type="button"
              onClick={() => {
                setSaved(false);
                setMobilePane("form");
              }}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              ✎ Tiếp tục chỉnh sửa
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSaved(true);
                setMobilePane("preview");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-brand-gradient rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/25 transition hover:brightness-110"
            >
              Xem trước thiệp
            </button>
          )}
        </div>
      </div>

      {saved ? (
        /* ===== Chế độ xem trước toàn thiệp ===== */
        <div className="mt-6">
          <PreviewFrame>{card}</PreviewFrame>
        </div>
      ) : (
        /* ===== Chế độ nhập liệu: form + preview real-time ===== */
        <>
          {/* Tab chuyển form/preview trên màn hình nhỏ */}
          <div className="mt-3 flex rounded-lg border border-zinc-200 p-0.5 text-sm font-medium lg:hidden">
            {(
              [
                ["form", "✎ Nhập thông tin"],
                ["preview", "👁 Xem thiệp"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMobilePane(value)}
                className={`flex-1 rounded-md px-3 py-2 transition ${
                  mobilePane === value
                    ? "bg-brand-gradient text-white"
                    : "text-zinc-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 items-start gap-6 lg:flex">
            <div
              className={`w-full shrink-0 lg:block lg:w-[400px] ${
                mobilePane === "form" ? "" : "hidden"
              }`}
            >
              <SchemaForm
                meta={meta}
                data={data}
                style={style}
                onField={setField}
                onStyle={setStyle}
              />
              <p className="mt-3 text-center text-xs text-zinc-400">
                Bỏ trống ô nào thì thiệp dùng nội dung mẫu của ô đó.
              </p>
            </div>

            <div
              className={`min-w-0 flex-1 lg:block lg:self-stretch ${
                mobilePane === "preview" ? "" : "hidden lg:block"
              }`}
            >
              <div className="lg:sticky lg:top-36">
                <PreviewFrame>{card}</PreviewFrame>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CTA liên hệ đặt thiệp — chốt đơn ngoài hệ thống (FR-17) */}
      <ContactCTA />
    </div>
  );
}
