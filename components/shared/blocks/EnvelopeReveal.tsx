"use client";

import { useState, type ReactNode } from "react";
import ScaledStage from "@/components/shared/effects/ScaledStage";

const EASE = "cubic-bezier(.2,.7,.2,1)";

// Sắc phong bì suy ra từ bg + muted của palette để ăn theo màu template.
const tint = (pct: number) =>
  `color-mix(in srgb, var(--tpl-bg) ${pct}%, var(--tpl-muted))`;

type Props = {
  /** Nội dung mặt ngoài (trước khi mở): tên, ngày... — tự ẩn khi mở phong bì. */
  cover: ReactNode;
  /** Nội dung tấm thiệp trượt lên sau khi mở — nút "đóng" do component tự thêm. */
  card: ReactNode;
  /** Chữ trên con dấu sáp (vd "K&H"). */
  sealLabel: string;
  /** Chữ nhỏ trên tờ giấy lấp ló trong phong bì. */
  paperLabel?: string;
  hint?: string;
  closeLabel?: string;
  /** Mở sẵn khi vừa hiển thị. */
  defaultOpen?: boolean;
};

/**
 * Bìa "phong thư": chạm con dấu sáp để mở, tấm thiệp trượt lên. Dàn theo sân
 * khấu 390×844 rồi co theo bề rộng (ScaledStage). Nền tối lấy từ --tpl-dark.
 */
export default function EnvelopeReveal({
  cover,
  card,
  sealLabel,
  paperLabel = "SAVE THE DATE",
  hint = "Chạm vào con dấu để mở thiệp",
  closeLabel = "Đóng phong thư",
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((v) => !v);
  const delay = (s: string) => (open ? s : "0s");

  return (
    <ScaledStage
      width={390}
      height={844}
      className="w-full"
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ background: "var(--tpl-dark)" }}
      >
        <div
          className="absolute rounded-[4px] border"
          style={{
            inset: 16,
            borderColor: "color-mix(in srgb, var(--tpl-bg) 28%, transparent)",
          }}
        />

        {/* Mặt ngoài */}
        <div
          className="absolute inset-x-0 flex flex-col items-center text-center"
          style={{
            top: 88,
            transition: `opacity .5s ease, transform .6s ${EASE}`,
            ...(open
              ? { opacity: 0, transform: "translateY(-30px)", pointerEvents: "none" }
              : { opacity: 1 }),
          }}
        >
          {cover}
        </div>

        {/* Phong bì */}
        <div
          className="absolute"
          style={{
            left: 30,
            top: 430,
            width: 330,
            height: 220,
            perspective: 900,
            transition: `transform .9s ${EASE} ${delay(".45s")}, opacity .6s ease ${delay(".6s")}`,
            ...(open
              ? { transform: "translateY(460px)", opacity: 0, pointerEvents: "none" }
              : { opacity: 1 }),
          }}
        >
          <div className="absolute inset-0 rounded-[6px]" style={{ background: tint(88) }} />
          <div
            className="absolute flex flex-col items-center rounded-[3px] pt-[22px]"
            style={{
              left: 22,
              top: 14,
              width: 286,
              height: 190,
              background: "var(--tpl-surface)",
            }}
          >
            <span className="text-[10px] tracking-[4px]" style={{ color: "var(--tpl-muted)" }}>
              {paperLabel}
            </span>
          </div>
          <div
            className="absolute inset-0 rounded-[6px]"
            style={{ background: tint(82), clipPath: "polygon(0 0, 52% 56%, 0 100%)" }}
          />
          <div
            className="absolute inset-0 rounded-[6px]"
            style={{ background: tint(82), clipPath: "polygon(100% 0, 48% 56%, 100% 100%)" }}
          />
          <div
            className="absolute inset-0 rounded-[6px]"
            style={{ background: tint(78), clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}
          />
          <div
            className="absolute left-0 top-0 z-[4]"
            style={{
              width: 330,
              height: 140,
              background: tint(74),
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "top center",
              transition: "transform .6s ease",
              transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label="Mở thiệp"
            className="tpl-heading absolute left-1/2 z-[5] grid size-[68px] -translate-x-1/2 place-items-center rounded-full border-[3px] text-[22px] font-semibold text-white shadow-[0_3px_10px_rgba(0,0,0,.25)] transition-transform duration-200 hover:scale-105"
            style={{
              top: 104,
              background: "var(--tpl-accent)",
              borderColor: "color-mix(in srgb, var(--tpl-accent) 80%, #000)",
            }}
          >
            {sealLabel}
          </button>
        </div>

        <div
          className="absolute inset-x-0 text-center text-[13px] tracking-[.5px]"
          style={{
            top: 690,
            color: "color-mix(in srgb, var(--tpl-bg) 85%, transparent)",
            transition: "opacity .4s ease",
            opacity: open ? 0 : 1,
          }}
        >
          {hint}
        </div>

        {/* Tấm thiệp bên trong */}
        <div
          className="absolute inset-x-0 flex flex-col items-center"
          style={{
            top: 56,
            transition: `opacity .8s ease ${delay(".7s")}, transform 1s ${EASE} ${delay(".7s")}`,
            ...(open
              ? { opacity: 1 }
              : { opacity: 0, transform: "translateY(90px) scale(.92)", pointerEvents: "none" }),
          }}
        >
          {card}
          <button
            type="button"
            onClick={toggle}
            className="mt-[22px] min-h-11 rounded-full border px-[22px] text-[13px] transition hover:bg-white/10"
            style={{
              color: "var(--tpl-bg)",
              borderColor: "color-mix(in srgb, var(--tpl-bg) 50%, transparent)",
            }}
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </ScaledStage>
  );
}
