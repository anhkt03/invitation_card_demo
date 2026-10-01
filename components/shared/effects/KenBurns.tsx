import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt?: string;
  /** object-position CSS, vd "center 30%". */
  focus?: string;
  /** "in": từ từ phóng to · "out": từ từ thu nhỏ. */
  direction?: "in" | "out";
  className?: string;
};

/**
 * Ảnh nền "thở": phóng to/thu nhỏ rất chậm vô hạn (hiệu ứng Ken Burns) để bìa
 * thiệp luôn có chuyển động nhẹ. Bọc trong khung overflow-hidden; kích thước
 * khung do `className` quyết định.
 */
export default function KenBurns({
  src,
  alt = "",
  focus = "center",
  direction = "in",
  className = "",
}: Props) {
  if (!src) return null;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh có thể là URL ngoài do người tạo thiệp gửi */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          direction === "in" ? "kenburns-in" : "kenburns-out",
        )}
        style={{ objectPosition: focus }}
      />
    </div>
  );
}
