type Props = {
  heading?: string;
  /**
   * Các mốc thời gian, mỗi dòng một mốc theo dạng "Tiêu đề — nội dung"
   * (chấp nhận cả "-" hoặc "–"). Dòng không có dấu phân cách thì hiển thị nguyên văn.
   */
  milestones: string;
};

function parseLine(line: string): { title: string; body: string } {
  const match = line.match(/^(.{1,40}?)\s*[—–-]\s+(.+)$/);
  if (match) return { title: match[1], body: match[2] };
  return { title: "", body: line };
}

/**
 * Dòng thời gian kể chuyện — tái sử dụng cho chuyện tình yêu (cưới),
 * hành trình học tập (tốt nghiệp) hay lịch sử thương hiệu (khai trương).
 */
export default function StoryTimeline({ heading, milestones }: Props) {
  const lines = milestones
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return null;

  return (
    <section className="px-6">
      {heading && (
        <h2
          className="tpl-script mb-6 text-center text-3xl"
          style={{ color: "var(--tpl-primary)" }}
        >
          {heading}
        </h2>
      )}
      <div
        className="ml-3 space-y-6 border-l pl-6"
        style={{
          borderColor: "color-mix(in srgb, var(--tpl-primary) 35%, transparent)",
        }}
      >
        {lines.map((line, i) => {
          const { title, body } = parseLine(line);
          return (
            <div key={i} className="relative">
              <span
                className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "var(--tpl-primary)" }}
              />
              {title && (
                <p
                  className="tpl-heading text-lg font-semibold"
                  style={{ color: "var(--tpl-accent)" }}
                >
                  {title}
                </p>
              )}
              <p
                className="text-[length:calc(15px*var(--tpl-scale,1))] leading-7"
                style={{ color: "var(--tpl-text)" }}
              >
                {body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
