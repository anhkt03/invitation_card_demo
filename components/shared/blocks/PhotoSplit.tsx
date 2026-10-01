import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt?: string;
  /** Số thứ tự lớn (vd "01"). */
  index: string;
  quote: string;
  label?: string;
  /** Vị trí cột chữ so với ảnh. */
  textSide?: "left" | "right";
  /** object-position CSS của ảnh. */
  focus?: string;
  className?: string;
};

/**
 * Bố cục 3–7: một cột chữ hẹp (số thứ tự + câu trích + nhãn) đứng cạnh ảnh to.
 * textSide="right" đảo thành 7–3, chữ căn phải.
 */
export default function PhotoSplit({
  src,
  alt = "",
  index,
  quote,
  label,
  textSide = "left",
  focus = "center",
  className = "",
}: Props) {
  const right = textSide === "right";
  const text = (
    <div
      className={cn(
        "col-span-3 flex flex-col justify-between py-1.5",
        right && "items-end text-right",
      )}
    >
      <div
        className="tpl-heading text-[40px] leading-none [font-variant-numeric:lining-nums]"
        style={{ color: "var(--tpl-primary)" }}
      >
        {index}
      </div>
      <div className={cn("flex flex-col gap-2.5", right && "items-end")}>
        <span className="h-px w-7" style={{ background: "#B9A57C" }} />
        <p
          className="tpl-heading text-[17px] italic leading-[1.35]"
          style={{ color: "var(--tpl-text)" }}
        >
          {quote}
        </p>
      </div>
      <div className="text-[10px] uppercase tracking-[2px]" style={{ color: "var(--tpl-muted)" }}>
        {label}
      </div>
    </div>
  );

  const photo = (
    <div className="col-span-7 overflow-hidden rounded-[4px]">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ
        <img
          src={src}
          alt={alt}
          className="block h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      )}
    </div>
  );

  return (
    <div
      className={cn("grid h-[380px] grid-cols-10 gap-x-3", className)}
    >
      {right ? (
        <>
          {photo}
          {text}
        </>
      ) : (
        <>
          {text}
          {photo}
        </>
      )}
    </div>
  );
}
