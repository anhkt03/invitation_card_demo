"use client";

type Props = {
  backgrounds: string[];
  value: number;
  onChange: (index: number) => void;
};

/** Chọn ảnh nền có sẵn của template (dạng lưới thumbnail). */
export default function BackgroundPicker({
  backgrounds,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-zinc-700">
        Phông nền
      </span>
      <div className="grid grid-cols-4 gap-2">
        {backgrounds.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            aria-label={`Nền ${i + 1}`}
            className={`overflow-hidden rounded-lg border-2 transition ${
              i === value
                ? "border-zinc-800"
                : "border-transparent hover:border-zinc-300"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail nền tĩnh */}
            <img
              src={src}
              alt=""
              className="aspect-[9/16] w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
