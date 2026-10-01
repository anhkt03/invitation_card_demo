"use client";

import { useRef } from "react";
import type { GalleryFieldDef } from "@/components/templates/types";

type Props = {
  field: GalleryFieldDef;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
};

/**
 * Album nhiều ảnh theo slot: slot trống hiển thị ảnh mẫu của template.
 * Ảnh chỉ đọc cục bộ bằng Object URL, không upload lên server (FR-15).
 */
export default function GalleryField({ field, value, onChange }: Props) {
  const slotInputRef = useRef<HTMLInputElement>(null);
  const pendingSlot = useRef(0);

  const slots = Array.from({ length: field.max }, (_, i) => value?.[i] ?? "");

  function updateSlot(index: number, url: string) {
    const next = [...slots];
    if (next[index].startsWith("blob:")) URL.revokeObjectURL(next[index]);
    next[index] = url;
    onChange(next);
  }

  return (
    <div>
      <span className="mb-1 block text-[13px] font-medium text-zinc-700">
        {field.label}
      </span>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot, i) => {
          const preview = slot || field.default[i] || "";
          return (
            <div
              key={i}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-zinc-200"
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element -- ảnh blob cục bộ, không qua tối ưu server
                <img
                  src={preview}
                  alt={`Ảnh ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl text-zinc-300">
                  +
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  pendingSlot.current = i;
                  slotInputRef.current?.click();
                }}
                className="absolute inset-0 flex items-end justify-center bg-black/0 pb-1.5 text-[11px] font-medium text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100"
              >
                {slot ? "Đổi ảnh" : "Chọn ảnh"}
              </button>
              {slot && (
                <button
                  type="button"
                  aria-label={`Bỏ ảnh ${i + 1}`}
                  onClick={() => updateSlot(i, "")}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] text-white transition hover:bg-black/70"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
      <input
        ref={slotInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) updateSlot(pendingSlot.current, URL.createObjectURL(file));
          e.target.value = "";
        }}
      />
      <span className="mt-1.5 block text-xs text-zinc-400">
        {field.hint ??
          "Ảnh chỉ hiển thị trên máy bạn để xem thử, không được tải lên máy chủ."}
      </span>
    </div>
  );
}
