"use client";

import {
  SCALE_OPTIONS,
  type ScaleId,
} from "@/components/templates/style-options";

type Props = {
  value: string;
  onChange: (id: ScaleId) => void;
};

export default function SizePicker({ value, onChange }: Props) {
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-zinc-700">
        Cỡ chữ
      </span>
      <div className="flex gap-2">
        {SCALE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`rounded-lg border px-4 py-1.5 text-sm transition ${
              opt.id === value
                ? "border-zinc-800 bg-zinc-50 text-zinc-900"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
