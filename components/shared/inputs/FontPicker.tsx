"use client";

import type { TemplateFontOption } from "@/components/templates/types";

type Props = {
  fonts: TemplateFontOption[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
};

export default function FontPicker({
  fonts,
  value,
  onChange,
  label = "Phông chữ tiêu đề",
}: Props) {
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-zinc-700">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {fonts.map((font) => (
          <button
            key={font.id}
            type="button"
            onClick={() => onChange(font.id)}
            style={{ fontFamily: font.cssValue }}
            className={`rounded-lg border px-3 py-1.5 text-sm transition ${
              font.id === value
                ? "border-zinc-800 bg-zinc-50 text-zinc-900"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
            }`}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  );
}
