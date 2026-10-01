type Family = {
  /** Nhãn thẻ, vd "Nhà trai". */
  label: string;
  /** Tên bố mẹ, mỗi dòng một người. */
  names: string;
  address?: string;
  /** Vai trò, vd "Trưởng nam". */
  role?: string;
  /** Tên cô dâu/chú rể hiển thị chữ viết tay. */
  person: string;
};

/** Hai thẻ song song giới thiệu gia đình nhà trai – nhà gái. */
export default function FamilyCards({ families }: { families: [Family, Family] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {families.map((f) => (
        <div
          key={f.label}
          className="flex flex-col items-center gap-2.5 rounded-md px-3.5 py-[22px] text-center"
          style={{ background: "var(--tpl-surface)" }}
        >
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--tpl-primary)" }}
          >
            {f.label}
          </div>
          <p
            className="tpl-heading whitespace-pre-line text-[17px] leading-[1.45]"
            style={{ color: "var(--tpl-text)" }}
          >
            {f.names}
          </p>
          {f.address && (
            <p
              className="whitespace-pre-line text-[11px] leading-relaxed"
              style={{ color: "var(--tpl-text)", opacity: 0.7 }}
            >
              {f.address}
            </p>
          )}
          <span className="my-1 h-px w-7" style={{ background: "#B9A57C" }} />
          {f.role && (
            <div
              className="text-[10px] uppercase tracking-[3px]"
              style={{ color: "var(--tpl-muted)" }}
            >
              {f.role}
            </div>
          )}
          <div
            className="tpl-script text-[30px] leading-[1.1]"
            style={{ color: "var(--tpl-text)" }}
          >
            {f.person}
          </div>
        </div>
      ))}
    </div>
  );
}
