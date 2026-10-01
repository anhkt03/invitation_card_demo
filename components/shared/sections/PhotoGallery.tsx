type Props = {
  images: string[];
  heading?: string;
};

/**
 * Album ảnh dạng lưới: ảnh đầu mỗi cụm 3 chiếm cả hàng cho nhịp bố cục.
 * Dùng <img> thường để hiển thị được cả ảnh blob cục bộ ở trang nhập thử.
 */
export default function PhotoGallery({ images, heading }: Props) {
  const list = images.filter(Boolean);
  if (list.length === 0) return null;

  return (
    <section className="px-6">
      {heading && (
        <h2
          className="tpl-script mb-5 text-center text-3xl"
          style={{ color: "var(--tpl-primary)" }}
        >
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-2.5">
        {list.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ
          <img
            key={`${i}-${src}`}
            src={src}
            alt={`Ảnh ${i + 1}`}
            loading="lazy"
            className={`w-full rounded-xl object-cover ${
              i % 3 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
