type Props = {
  heading?: string;
  /** Nội dung bức thư ngỏ; xuống dòng được giữ nguyên. */
  body: string;
  /** Câu mời in nghiêng nhấn mạnh cuối thư. */
  invitation?: string;
};

/** Bức thư mở đầu — lời ngỏ của gia đình/chủ sự kiện gửi người xem thiệp. */
export default function OpeningLetter({
  heading = "Lời ngỏ",
  body,
  invitation,
}: Props) {
  return (
    <section className="px-6">
      <div
        className="rounded-2xl border p-[6px]"
        style={{ borderColor: "color-mix(in srgb, var(--tpl-primary) 35%, transparent)" }}
      >
        <div
          className="rounded-xl border px-6 py-8 text-center"
          style={{
            borderColor: "color-mix(in srgb, var(--tpl-primary) 20%, transparent)",
            backgroundColor: "var(--tpl-surface)",
          }}
        >
          <h2
            className="tpl-script mb-4 text-3xl"
            style={{ color: "var(--tpl-primary)" }}
          >
            {heading}
          </h2>
          <p className="whitespace-pre-line text-[length:calc(15px*var(--tpl-scale,1))] leading-7" style={{ color: "var(--tpl-text)" }}>
            {body}
          </p>
          {invitation && (
            <p
              className="tpl-heading mt-5 text-lg italic leading-7"
              style={{ color: "var(--tpl-accent)" }}
            >
              {invitation}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
