type Props = {
  heading?: string;
  /** Ảnh QR do khách hàng cung cấp — chỉ hiển thị, không xử lý thanh toán. */
  qrImage: string;
  note?: string;
};

/** Hộp mừng (mừng cưới/mừng khai trương) hiển thị QR chuyển khoản của chủ sự kiện. */
export default function GiftQR({ heading = "Hộp mừng", qrImage, note }: Props) {
  if (!qrImage) return null;

  return (
    <section className="px-6">
      <div
        className="rounded-2xl border px-6 py-7 text-center"
        style={{
          borderColor: "color-mix(in srgb, var(--tpl-primary) 25%, transparent)",
          backgroundColor: "var(--tpl-surface)",
        }}
      >
        <h2
          className="tpl-script mb-4 text-3xl"
          style={{ color: "var(--tpl-primary)" }}
        >
          {heading}
        </h2>
        {/* eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ */}
        <img
          src={qrImage}
          alt="Mã QR chuyển khoản"
          className="mx-auto h-40 w-40 rounded-xl border border-zinc-200 bg-white object-contain p-2"
        />
        {note && (
          <p
            className="mt-3 text-sm font-medium tracking-wide"
            style={{ color: "var(--tpl-text)" }}
          >
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
