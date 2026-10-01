"use client";

import { revealProps } from "@/components/shared/effects/reveal";
import { useInView } from "@/components/shared/effects/useInView";
import PhotoFrame, { type FrameVariant } from "@/components/shared/frames/PhotoFrame";
import HeartMotif from "@/components/shared/motifs/HeartMotif";
import { cn } from "@/lib/cn";

type Person = {
  /** Tên hiển thị dưới ảnh (chữ viết tay). */
  name?: string;
  /** URL/đường dẫn ảnh chân dung. */
  photo?: string;
  /** Vai trò nhỏ phía trên tên, vd "Chú rể". */
  role?: string;
  focus?: string;
};

type Props = {
  /** Người đứng bên trái / bên phải — hai ảnh trượt từ hai mép vào giữa. */
  left: Person;
  right: Person;
  frame?: FrameVariant;
  /** Huy hiệu nảy lên ở giữa sau khi hai ảnh gặp nhau. */
  connector?: "heart" | "ampersand" | "none";
  className?: string;
};

/**
 * Hai ảnh chân dung (cô dâu – chú rể) được "kéo" từ hai bên vào giữa khi cuộn tới,
 * chồng nhẹ lên nhau; sau đó huy hiệu giữa nảy lên và tên hiện dần phía dưới.
 * Chỉ có một ảnh thì ảnh đó phóng to ra giữa; không có ảnh nào thì chỉ còn phần tên.
 */
export default function CoupleConverge({
  left,
  right,
  frame = "arch",
  connector = "heart",
  className = "",
}: Props) {
  const { ref, visible } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const both = Boolean(left.photo && right.photo);
  const single = !both ? left.photo || right.photo : "";
  const singlePerson = left.photo ? left : right;

  const badge = revealProps("zoomIn", visible, { delay: 1100, duration: 700 });

  const caption = (p: Person, delay: number) => {
    if (!p.name) return null;
    const rp = revealProps("up", visible, { delay });
    return (
      <div {...rp} className={cn(rp.className, "relative z-30 mt-3 text-center")}>
        {p.role && (
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "var(--tpl-muted)" }}
          >
            {p.role}
          </p>
        )}
        <p
          className="tpl-script text-3xl leading-tight"
          style={{ color: "var(--tpl-primary)" }}
        >
          {p.name}
        </p>
      </div>
    );
  };

  if (!both && !single) {
    // Không có ảnh: chỉ còn phần tên (nếu có).
    if (!left.name && !right.name) return null;
    return (
      <div ref={ref} className={cn("flex justify-center gap-8", className)}>
        {caption(left, 0)}
        {caption(right, 150)}
      </div>
    );
  }

  if (!both) {
    return (
      <div ref={ref} className={cn("mx-auto w-[62%]", className)}>
        <div {...revealProps("zoomIn", visible, { duration: 1000 })}>
          <PhotoFrame
            src={single!}
            variant={frame}
            focus={singlePerson.focus}
            alt={singlePerson.name}
          />
        </div>
        {caption(singlePerson, 500)}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden px-2 py-4", className)}>
      <div className="relative flex items-start justify-center">
        {/* Ảnh trái: trượt vào từ mép trái */}
        <div className="relative z-10 w-[49%] -mr-[2%]">
          <div {...revealProps("left", visible, { distance: "125%", duration: 1200 })}>
            <PhotoFrame
              src={left.photo!}
              variant={frame}
              focus={left.focus}
              alt={left.name}
              tilt={-4}
            />
          </div>
          {caption(left, 900)}
        </div>

        {/* Ảnh phải: trượt vào từ mép phải, thấp hơn một nhịp cho có chiều sâu */}
        <div className="relative z-20 mt-[16%] w-[49%] -ml-[2%]">
          <div {...revealProps("right", visible, { distance: "125%", duration: 1200 })}>
            <PhotoFrame
              src={right.photo!}
              variant={frame}
              focus={right.focus}
              alt={right.name}
              tilt={4}
            />
          </div>
          {caption(right, 1000)}
        </div>

        {/* Huy hiệu giữa — bọc 2 lớp vì lớp reveal có transform riêng */}
        {connector !== "none" && (
          <div className="absolute left-1/2 top-[42%] z-30 -translate-x-1/2 -translate-y-1/2">
            <div
              {...badge}
              className={cn(badge.className, "grid size-14 place-items-center rounded-full shadow-lg")}
              style={{
                ...badge.style,
                background: "var(--tpl-surface)",
                color: "var(--tpl-primary)",
              }}
            >
              {connector === "heart" ? (
                <HeartMotif size={26} filled className="!text-[color:var(--tpl-accent)]" />
              ) : (
                <span className="tpl-script text-3xl leading-none">&amp;</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
