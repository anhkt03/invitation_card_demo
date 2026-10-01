import ArchPhoto from "@/components/shared/blocks/ArchPhoto";

/** Lời cảm ơn khép thiệp trên nền tối: ảnh vòm, chữ viết tay "Thank you", lời nhắn, dòng ký tên. */
export default function ClosingCard({
  photo,
  heading = "Thank you",
  message,
  signature,
  focus,
}: {
  photo: string;
  heading?: string;
  message: string;
  signature: string;
  focus?: string;
}) {
  return (
    <section
      className="flex flex-col items-center gap-4 px-8 py-[72px] text-center"
      style={{ background: "var(--tpl-dark)", color: "var(--tpl-bg)" }}
    >
      <ArchPhoto src={photo} width={150} height={200} border={4} focus={focus ?? "50% 35%"} />
      <div className="tpl-script mt-1.5 text-[46px] leading-tight">{heading}</div>
      <p
        className="tpl-heading whitespace-pre-line text-lg italic leading-normal"
        style={{ color: "color-mix(in srgb, var(--tpl-bg) 88%, transparent)" }}
      >
        {message}
      </p>
      <div className="mt-2.5 text-[11px] uppercase tracking-[3px]" style={{ color: "#D9C9A3" }}>
        {signature}
      </div>
    </section>
  );
}
