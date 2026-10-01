"use client";

import type { ToggleFieldDef } from "@/components/templates/types";

type Props = {
  field: ToggleFieldDef;
  /** "true" | "false"; chuỗi rỗng = chưa chạm tới, dùng giá trị mặc định. */
  value: string;
  onChange: (value: string) => void;
};

export default function ToggleField({ field, value, onChange }: Props) {
  const on = (value || field.default) === "true";
  return (
    <div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(on ? "false" : "true")}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left transition hover:border-zinc-300"
      >
        <span className="text-[13px] font-medium text-zinc-700">{field.label}</span>
        <span
          className={`relative h-5 w-9 shrink-0 rounded-full transition ${
            on ? "bg-zinc-800" : "bg-zinc-300"
          }`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${
              on ? "left-[18px]" : "left-0.5"
            }`}
          />
        </span>
      </button>
      {field.hint && (
        <span className="mt-1 block text-xs text-zinc-400">{field.hint}</span>
      )}
    </div>
  );
}
