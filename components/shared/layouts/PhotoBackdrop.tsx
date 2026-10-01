import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Cách xử lý ảnh nền để chữ phía trên luôn đọc được:
 * - dark   ảnh phủ tối, chữ trắng, thẻ nội dung (lịch...) thành kính mờ
 * - light  ảnh phủ lớp kem rất nhạt, giữ nguyên màu chữ của palette
 * - mono   ảnh đen trắng + lớp trắng mờ (kiểu lịch đặt trên ảnh đen trắng)
 */
export type BackdropTone = "dark" | "light" | "mono";

/** Biến màu cho phần nội dung bên trong — để các section dùng lại được mà không cần sửa. */
export function backdropVars(tone: BackdropTone): CSSProperties {
  if (tone === "dark") {
    return {
      "--tpl-text": "#ffffff",
      "--tpl-muted": "rgba(255,255,255,.78)",
      "--tpl-primary": "#ffffff",
      "--tpl-surface": "rgba(8,10,16,.5)",
    } as CSSProperties;
  }
  if (tone === "mono") {
    return { "--tpl-surface": "rgba(255,255,255,.72)" } as CSSProperties;
  }
  return {};
}

const OVERLAY: Record<BackdropTone, string> = {
  dark: "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.42))",
  light: "color-mix(in srgb, var(--tpl-bg) 80%, transparent)",
  mono: "rgba(255,255,255,.5)",
};

type Props = {
  /** Ảnh nền; để trống thì chỉ còn nền màu của palette (nội dung vẫn hiển thị bình thường). */
  src: string;
  tone?: BackdropTone;
  /** Ảnh nền chuyển động nhẹ (phóng to/thu nhỏ chậm). */
  kenburns?: boolean;
  /** object-position CSS của ảnh. */
  focus?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Bọc một hoặc nhiều section lên trên ảnh nền. Section con nên để nền trong suốt
 * (không dùng `band`) để ảnh lộ ra.
 */
export default function PhotoBackdrop({
  src,
  tone = "dark",
  kenburns = false,
  focus = "center",
  className = "",
  children,
}: Props) {
  if (!src) return <>{children}</>;
  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={backdropVars(tone)}
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi */}
        <img
          src={src}
          alt=""
          loading="lazy"
          className={cn("h-full w-full object-cover", kenburns && "kenburns-in")}
          style={{
            objectPosition: focus,
            filter: tone === "mono" ? "grayscale(1) contrast(1.05)" : undefined,
          }}
        />
        <div className="absolute inset-0" style={{ background: OVERLAY[tone] }} />
      </div>
      {children}
    </div>
  );
}
