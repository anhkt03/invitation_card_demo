"use client";

import type { FieldDef } from "@/components/templates/types";

type Props = {
  field: Extract<FieldDef, { type: "text" }>;
  value: string;
  onChange: (value: string) => void;
};

export default function TextField({ field, value, onChange }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-zinc-700">
        {field.label}
        {field.optional && (
          <span className="ml-1 font-normal text-zinc-400">(tùy chọn)</span>
        )}
      </span>
      <input
        type="text"
        value={value}
        maxLength={field.maxLength}
        placeholder={field.placeholder ?? field.default}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      />
      {field.hint && (
        <span className="mt-1 block text-xs text-zinc-400">{field.hint}</span>
      )}
    </label>
  );
}
