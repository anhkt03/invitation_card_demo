import FallingParticles from "../effects/FallingParticles";

type Props = {
  photo: string;
  /** Dòng chữ script nhỏ phía trên tiêu đề, vd "Trân trọng báo tin". */
  kicker?: string;
  title: string;
  subtitle?: string;
  dateLabel?: string;
  particles?: boolean;
};

/** Màn bìa mở đầu: ảnh nền + tiêu đề — dùng chung cho mọi loại sự kiện. */
export default function CoverHero({
  photo,
  kicker,
  title,
  subtitle,
  dateLabel,
  particles = true,
}: Props) {
  return (
    <div className="relative aspect-[3/4] max-h-[760px] w-full overflow-hidden">
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element -- hỗ trợ cả ảnh blob cục bộ ở trang nhập thử
        <img
          src={photo}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
      {particles && <FallingParticles />}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-12 text-center text-white">
        {kicker && (
          <p className="tpl-script text-2xl opacity-95 drop-shadow-sm">
            {kicker}
          </p>
        )}
        <h1 className="tpl-heading text-4xl leading-tight tracking-wide drop-shadow-md sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] uppercase tracking-[0.3em] opacity-90">
            {subtitle}
          </p>
        )}
        {dateLabel && (
          <p className="mt-1 rounded-full border border-white/70 px-5 py-1.5 text-sm tracking-widest">
            {dateLabel}
          </p>
        )}
      </div>
    </div>
  );
}
