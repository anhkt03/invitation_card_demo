import Kicker from "@/components/shared/primitives/Kicker";
import SectionHeading from "@/components/shared/primitives/SectionHeading";
import { cn } from "@/lib/cn";

/** Đầu section: dòng nhỏ in hoa + tiêu đề serif + đoạn mô tả tùy chọn, căn giữa. */
export default function SectionIntro({
  kicker,
  title,
  description,
  className = "",
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5 text-center", className)}>
      <Kicker className="tracking-[0.4em]">{kicker}</Kicker>
      <SectionHeading className="text-[34px] font-medium normal-case leading-tight tracking-normal">
        {title}
      </SectionHeading>
      {description && (
        <p
          className="mt-1.5 text-[13px] leading-[1.7]"
          style={{ color: "var(--tpl-text)", opacity: 0.75 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
