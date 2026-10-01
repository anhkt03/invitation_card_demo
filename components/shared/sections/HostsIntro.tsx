type Host = {
  /** Nhãn nhóm, vd "NHÀ TRAI" / "NHÀ GÁI" / "GIA ĐÌNH". */
  label: string;
  /** Danh sách tên, mỗi dòng một người. */
  names: string;
};

type Props = {
  hosts: Host[];
  /** Dòng nhân vật chính, vd "Minh Quân & Thu Hà". */
  headline?: string;
};

/** Giới thiệu hai bên gia đình / chủ sự kiện — hỗ trợ 1 hoặc 2 cột. */
export default function HostsIntro({ hosts, headline }: Props) {
  return (
    <section className="px-6 text-center">
      <div
        className={
          hosts.length === 1 ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-4"
        }
      >
        {hosts.map((host) => (
          <div key={host.label}>
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "var(--tpl-muted)" }}
            >
              {host.label}
            </p>
            <p
              className="whitespace-pre-line text-[length:calc(15px*var(--tpl-scale,1))] font-medium leading-7"
              style={{ color: "var(--tpl-text)" }}
            >
              {host.names}
            </p>
          </div>
        ))}
      </div>
      {headline && (
        <p
          className="tpl-script mt-7 text-[length:calc(34px*var(--tpl-scale,1))] leading-snug"
          style={{ color: "var(--tpl-primary)" }}
        >
          {headline}
        </p>
      )}
    </section>
  );
}
