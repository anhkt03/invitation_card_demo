"use client";

import { useId } from "react";
import type { FieldDef } from "@/components/templates/types";

type Props = {
  field: Extract<FieldDef, { type: "image" }>;
  value: string;
  onChange: (value: string) => void;
};

/**
 * Ảnh chỉ được đọc cục bộ bằng Object URL, không upload lên server (FR-15).
 * Object URL cũ được revoke khi thay/xóa để tránh rò rỉ bộ nhớ.
 */
export default function ImageField({ field, value, onChange }: Props) {
  const inputId = useId();
  const preview = value || field.default;

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (value.startsWith("blob:")) URL.revokeObjectURL(value);
    onChange(URL.createObjectURL(file));
  }

  function handleClear() {
    if (value.startsWith("blob:")) URL.revokeObjectURL(value);
    onChange("");
  }

  return (
    <div>
      <span className="mb-1 block text-[13px] font-medium text-zinc-700">
        {field.label}
        {field.optional && (
          <span className="ml-1 font-normal text-zinc-400">(tùy chọn)</span>
        )}
      </span>
      <div className="flex items-center gap-3">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- ảnh blob cục bộ, không qua tối ưu server
          <img
            src={preview}
            alt={field.label}
            className="h-20 w-16 rounded-lg border border-zinc-200 object-cover"
          />
        ) : (
          <div className="flex h-20 w-16 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-zinc-300">
            +
          </div>
        )}
        <div className="flex flex-col items-start gap-1.5">
          <label
            htmlFor={inputId}
            className="cursor-pointer rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            {value ? "Đổi ảnh" : "Chọn ảnh"}
          </label>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-zinc-400 underline-offset-2 hover:text-zinc-600 hover:underline"
            >
              Dùng lại ảnh mẫu
            </button>
          )}
        </div>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {field.hint && (
        <span className="mt-1 block text-xs text-zinc-400">{field.hint}</span>
      )}
    </div>
  );
}
