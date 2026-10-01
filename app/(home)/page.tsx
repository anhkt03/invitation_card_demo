import { Eye, Palette, PenLine, Send, Sparkles } from "lucide-react";
import { listTemplates } from "@/components/templates";
import TemplateGallery, {
  type GalleryItem,
} from "@/features/gallery/TemplateGallery";

const STEPS = [
  {
    icon: Palette,
    title: "Chọn mẫu",
    text: "Duyệt hàng chục mẫu theo từng dịp: cưới, tốt nghiệp, sinh nhật, khai trương.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: PenLine,
    title: "Nhập thử",
    text: "Điền tên, ngày giờ, địa điểm, ảnh — thiệp cập nhật ngay bên cạnh, không cần tài khoản.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Eye,
    title: "Xem trước",
    text: "Xem thiệp trên khung điện thoại hoặc máy tính, đổi màu, phông chữ, cỡ chữ thoải mái.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Send,
    title: "Đặt thiệp thật",
    text: "Ưng ý rồi, đội ngũ tạo thiệp với link riêng cho từng khách mời của bạn.",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function HomePage() {
  const templates: GalleryItem[] = listTemplates().map(({ meta }) => ({
    key: meta.key,
    name: meta.name,
    category: meta.category,
    description: meta.description,
    thumbnail: meta.thumbnail,
  }));

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 size-[420px] rounded-full bg-indigo-300/40 blur-[110px]" />
          <div className="absolute -right-20 top-10 size-[380px] rounded-full bg-pink-300/45 blur-[110px]" />
          <div className="absolute bottom-0 left-1/3 size-[300px] rounded-full bg-amber-200/50 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:pt-24">
          <div className="animate-rise-in mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
              <Sparkles className="size-3.5 text-fuchsia-500" aria-hidden />
              Miễn phí xem thử · Không cần tài khoản
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-violet-950 sm:text-6xl">
              Thiệp mời online
              <br />
              <span className="text-gradient">rực rỡ như ngày vui</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-violet-900/70 sm:text-lg">
              Chọn mẫu, nhập thông tin và xem thiệp thay đổi ngay trên trình
              duyệt. Ưng ý rồi, chúng tôi tạo thiệp thật với link riêng cho từng
              khách mời.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#mau-thiep"
                className="bg-brand-gradient rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Xem mẫu thiệp
              </a>
              <a
                href="#cach-hoat-dong"
                className="rounded-full border border-violet-200 bg-white px-7 py-3.5 text-sm font-semibold text-violet-800 transition hover:border-violet-400"
              >
                Cách hoạt động
              </a>
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3 text-center">
            {[
              [`${templates.length}+`, "Mẫu thiệp"],
              ["4", "Dịp sự kiện"],
              ["100%", "Xem thử miễn phí"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white bg-white/70 px-3 py-4 shadow-sm backdrop-blur"
              >
                <dt className="text-2xl font-extrabold text-gradient">
                  {value}
                </dt>
                <dd className="mt-1 text-xs font-medium text-violet-900/60">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section id="mau-thiep" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-violet-950 sm:text-4xl">
            Kho mẫu thiệp
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-violet-900/65">
            Lọc theo dịp và bấm vào mẫu bạn thích để nhập thử ngay.
          </p>
        </div>
        <TemplateGallery templates={templates} />
      </section>

      {/* ===== Cách hoạt động ===== */}
      <section
        id="cach-hoat-dong"
        className="scroll-mt-20 border-y border-violet-100 bg-white py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-violet-950 sm:text-4xl">
            Bốn bước có ngay thiệp đẹp
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text, color }, i) => (
              <li
                key={title}
                className="relative rounded-3xl border border-violet-100 bg-[#fbfaff] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/50"
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="absolute right-5 top-4 text-4xl font-black text-violet-100">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-violet-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-violet-900/65">
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
