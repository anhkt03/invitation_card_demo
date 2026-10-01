type Props = {
  heading?: string;
  message?: string;
  /** Chữ ký, vd tên cặp đôi / gia đình / thương hiệu. */
  signature?: string;
};

/** Lời cảm ơn khép lại tấm thiệp. */
export default function ThankYouFooter({
  heading = "Trân trọng cảm ơn!",
  message,
  signature,
}: Props) {
  return (
    <section className="px-6 pb-2 text-center">
      <h2
        className="tpl-script text-4xl"
        style={{ color: "var(--tpl-primary)" }}
      >
        {heading}
      </h2>
      {message && (
        <p
          className="mx-auto mt-4 max-w-[340px] whitespace-pre-line text-[length:calc(15px*var(--tpl-scale,1))] leading-7"
          style={{ color: "var(--tpl-text)" }}
        >
          {message}
        </p>
      )}
      {signature && (
        <p
          className="tpl-heading mt-5 text-xl italic"
          style={{ color: "var(--tpl-accent)" }}
        >
          {signature}
        </p>
      )}
    </section>
  );
}
