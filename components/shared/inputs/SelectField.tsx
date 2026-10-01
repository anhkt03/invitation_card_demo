"use client";

import type { SelectFieldDef } from "@/components/templates/types";

type Props = {
  field: SelectFieldDef;
  /** Chuỗi rỗng = chưa chọn, dùng giá trị mặc định. */
  value: string;
  onChange: (value: string) => void;
};

export default function SelectField({ field, value, onChange }: Props) {
  const current = value || field.default;
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-zinc-700">
        {field.label}
        {field.optional && (
          <span className="ml-1 font-normal text-zinc-400">(tùy chọn)</span>
        )}
      </span>
      <div className="flex flex-wrap gap-2">
        {field.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border px-4 py-1.5 text-sm transition ${
              opt.value === current
                ? "border-zinc-800 bg-zinc-50 text-zinc-900"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {field.hint && (
        <span className="mt-1 block text-xs text-zinc-400">{field.hint}</span>
      )}
    </div>
  );
}
