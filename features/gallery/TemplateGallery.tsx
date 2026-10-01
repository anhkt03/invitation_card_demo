"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type TemplateCategory,
} from "@/components/templates/types";
import {
  thumbFallback,
  thumbPhotoFallback,
} from "@/features/compose/thumbnails";
import { cn } from "@/lib/cn";

export type GalleryItem = {
  key: string;
  name: string;
  category: TemplateCategory;
  description: string;
  thumbnail: string;
};

type Filter = TemplateCategory | "all";

const CATEGORY_BADGE: Record<TemplateCategory, string> = {
  wedding: "bg-pink-100 text-pink-700",
  graduation: "bg-indigo-100 text-indigo-700",
  birthday: "bg-amber-100 text-amber-700",
  "grand-opening": "bg-cyan-100 text-cyan-700",
};

export default function TemplateGallery({
  templates,
}: {
  templates: GalleryItem[];
}) {
  const [active, setActive] = useState<Filter>("all");

  const countOf = (c: TemplateCategory) =>
    templates.filter((t) => t.category === c).length;

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tất cả", count: templates.length },
    ...CATEGORY_ORDER.map((c) => ({
      id: c as Filter,
      label: CATEGORY_LABELS[c],
      count: countOf(c),
    })),
  ];

  const visible =
    active === "all"
      ? templates
      : templates.filter((t) => t.category === active);

  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {chips.map((chip) => {
          const disabled = chip.count === 0;
          const isActive = active === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              disabled={disabled}
              onClick={() => setActive(chip.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-brand-gradient border-transparent text-white shadow-md shadow-fuchsia-500/25"
                  : disabled
                    ? "cursor-not-allowed border-violet-100 text-violet-200"
                    : "border-violet-200 bg-white text-violet-800 hover:border-violet-400",
              )}
            >
              {chip.label}
              {chip.id === "all"
                ? ` (${chip.count})`
                : disabled
                  ? " — sắp có"
                  : ` (${chip.count})`}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <div
            key={item.key}
            className="group overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/60"
          >
            <Link
              href={`/templates/${item.key}`}
              className="block overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ảnh thumbnail (hotlink stock / file tự bỏ vào) */}
              <img
                src={item.thumbnail}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  // Tầng 1: ảnh chủ đề lỗi → ảnh thật Picsum; tầng 2 → SVG dự phòng.
                  const el = e.currentTarget;
                  const step = el.dataset.step ?? "0";
                  if (step === "0") {
                    el.dataset.step = "1";
                    el.src = thumbPhotoFallback(item.key);
                  } else if (step === "1") {
                    el.dataset.step = "2";
                    el.src = thumbFallback(item.category, item.name);
                  }
                }}
                className="aspect-[3/4] w-full bg-violet-50 object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </Link>
            <div className="p-4">
              <p
                className={cn(
                  "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  CATEGORY_BADGE[item.category],
                )}
              >
                {CATEGORY_LABELS[item.category]}
              </p>
              <h2 className="mt-1 text-lg font-bold text-violet-950">
                {item.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-violet-900/60">
                {item.description}
              </p>
              <Link
                href={`/templates/${item.key}`}
                className="bg-brand-gradient mt-4 inline-block rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Nhập thử &amp; Xem trước
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
