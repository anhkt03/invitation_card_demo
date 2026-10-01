import Monogram from "@/components/shared/motifs/Monogram";
import { cn } from "@/lib/cn";

type Props = {
  left: string;
  right: string;
  /** inline: "A & B" một dòng · stacked: xếp dọc có "and" · monogram: chữ lồng + tên. */
  layout?: "inline" | "stacked" | "monogram";
  connector?: string;
  /** Override size/style tự do. */
  className?: string;
};

/** Khối hiển thị tên đôi — nhiều cách bố trí, ghép được vào bìa/section. */
export default function NamesDisplay({
  left,
  right,
  layout = "inline",
  connector = "&",
  className = "",
}: Props) {
  if (layout === "stacked") {
    return (
      <div className={cn("text-center", className)}>
        <p className="tpl-heading text-4xl leading-tight" style={{ color: "var(--tpl-primary)" }}>
          {left}
        </p>
        <p className="tpl-script my-1 text-2xl" style={{ color: "var(--tpl-accent)" }}>
          {connector === "&" ? "and" : connector}
        </p>
        <p className="tpl-heading text-4xl leading-tight" style={{ color: "var(--tpl-primary)" }}>
          {right}
        </p>
      </div>
    );
  }

  if (layout === "monogram") {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <Monogram left={left} right={right} />
        <p className="tpl-heading text-2xl" style={{ color: "var(--tpl-primary)" }}>
          {left} {connector} {right}
        </p>
      </div>
    );
  }

  return (
    <p
      className={cn("tpl-heading text-4xl leading-tight sm:text-5xl", className)}
      style={{ color: "var(--tpl-primary)" }}
    >
      {left} {connector} {right}
    </p>
  );
}
