/** Hoạ tiết hoa sen cách điệu — hợp thiệp cưới Á Đông / trang trọng. */
export default function LotusMotif({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
      style={{ color: "var(--tpl-primary)" }}
    >
      <g fill="currentColor" opacity="0.9">
        <path d="M50 82C50 60 50 40 50 30C50 40 50 60 50 82Z" />
        <path d="M50 80C40 66 34 52 40 40C48 50 52 66 50 80Z" />
        <path d="M50 80C60 66 66 52 60 40C52 50 48 66 50 80Z" />
        <path d="M50 82C34 74 22 62 24 48C40 56 50 68 50 82Z" opacity="0.75" />
        <path d="M50 82C66 74 78 62 76 48C60 56 50 68 50 82Z" opacity="0.75" />
      </g>
      <g stroke="currentColor" strokeWidth="2" opacity="0.6">
        <path d="M50 84C50 90 46 94 40 96" fill="none" />
        <path d="M50 84C50 90 54 94 60 96" fill="none" />
      </g>
    </svg>
  );
}
