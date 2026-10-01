import type { ReactNode } from "react";
import SectionIntro from "@/components/shared/blocks/SectionIntro";
import RevealOnScroll from "@/components/shared/effects/RevealOnScroll";
import { cn } from "@/lib/cn";
import type { Motion } from "./motion";

/** Nền xen kẽ giữa các section — suy ra từ bg + muted của palette. */
export const BAND = "color-mix(in srgb, var(--tpl-bg) 88%, var(--tpl-muted))";

/** Vỏ chung của một section: đệm hai bên + (tuỳ chọn) nền xen kẽ. */
export function Section({
  band,
  className,
  children,
}: {
  band?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn("flex flex-col gap-7 px-5 py-14", className)}
      style={band ? { background: BAND } : undefined}
    >
      {children}
    </section>
  );
}

/** Đầu section (kicker + tiêu đề + mô tả) xuất hiện theo kiểu `m.heading`. */
export function Heading({
  kicker,
  title,
  description,
  m,
}: {
  kicker: string;
  title: string;
  description?: string;
  m: Motion;
}) {
  return (
    <RevealOnScroll variant={m.heading}>
      <SectionIntro kicker={kicker} title={title} description={description || undefined} />
    </RevealOnScroll>
  );
}
