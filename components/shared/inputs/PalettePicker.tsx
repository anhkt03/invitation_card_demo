"use client";

import type { TemplatePalette } from "@/components/templates/types";

type Props = {
  palettes: TemplatePalette[];
  value: number;
  onChange: (index: number) => void;
};

export default function PalettePicker({ palettes, value, onChange }: Props) {
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-zinc-700">
        Màu chủ đạo
      </span>
      <div className="flex flex-wrap gap-2">
        {palettes.map((palette, i) => (
          <button
            key={palette.name}
            type="button"
            title={palette.name}
            onClick={() => onChange(i)}
            className={`flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs transition ${
              i === value
                ? "border-zinc-800 bg-zinc-50 font-medium text-zinc-800"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
            }`}
          >
            <span className="flex -space-x-1">
              {[
                palette.colors.primary,
                palette.colors.accent,
                palette.colors.bg,
              ].map((color, j) => (
                <span
                  key={j}
                  className="h-4 w-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
            {palette.name}
          </button>
        ))}
      </div>
    </div>
  );
}
