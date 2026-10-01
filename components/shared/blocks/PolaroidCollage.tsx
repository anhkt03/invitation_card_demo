type Polaroid = { src: string; alt?: string; caption?: string; focus?: string };

type Props = {
  first: Polaroid;
  second: Polaroid;
  index: string;
  /** Câu trích cạnh ảnh đầu (góc trên phải). */
  quote: string;
  /** Lời hứa ở góc dưới trái. */
  promise: string;
  promiseLabel?: string;
};

function Frame({
  photo,
  className,
  rotate,
}: {
  photo: Polaroid;
  className: string;
  rotate: number;
}) {
  return (
    <div
      className={`absolute box-border bg-white px-2 pb-[30px] pt-2 shadow-[0_10px_24px_rgba(46,43,37,.14)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {photo.src && (
        // eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ
        <img
          src={photo.src}
          alt={photo.alt ?? ""}
          className="block h-full w-full object-cover"
          style={{ objectPosition: photo.focus ?? "center" }}
        />
      )}
      {photo.caption && (
        <div
          className="tpl-script absolute inset-x-0 bottom-1.5 truncate px-1 text-center text-base"
          style={{ color: "var(--tpl-primary)" }}
        >
          {photo.caption}
        </div>
      )}
    </div>
  );
}

/** Hai ảnh Polaroid xếp chéo, xen kẽ hai đoạn chữ — bố cục "album dán". */
export default function PolaroidCollage({
  first,
  second,
  index,
  quote,
  promise,
  promiseLabel = "LỜI HỨA",
}: Props) {
  return (
    <div className="relative mx-auto aspect-[350/500] w-full">
      <Frame photo={first} rotate={-4} className="left-0 top-0 aspect-[214/300] w-[61%]" />
      <div className="absolute right-0 top-[7%] w-[34%] text-right">
        <div
          className="tpl-heading text-[40px] leading-none [font-variant-numeric:lining-nums]"
          style={{ color: "var(--tpl-primary)" }}
        >
          {index}
        </div>
        <p
          className="tpl-heading mt-2.5 text-[17px] italic leading-[1.35]"
          style={{ color: "var(--tpl-text)" }}
        >
          {quote}
        </p>
      </div>
      <div className="absolute bottom-[7%] left-[1%] w-[34%]">
        <p
          className="tpl-heading text-[17px] italic leading-[1.35]"
          style={{ color: "var(--tpl-text)" }}
        >
          {promise}
        </p>
        <div
          className="mt-2.5 text-[10px] uppercase tracking-[2px]"
          style={{ color: "var(--tpl-muted)" }}
        >
          {promiseLabel}
        </div>
      </div>
      <Frame photo={second} rotate={5} className="bottom-0 right-[1%] aspect-[206/290] w-[59%]" />
    </div>
  );
}
