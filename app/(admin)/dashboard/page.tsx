import Link from 'next/link';
import { ArrowUpRight, CalendarHeart, Eye, FileText, Plus, Users } from 'lucide-react';

const STATS = [
  { label: 'Thiệp đã tạo', value: '0', detail: 'Tổng tất cả thiệp', icon: FileText, color: 'from-indigo-500 to-violet-500' },
  { label: 'Khách mời', value: '0', detail: 'Từ thiệp cá nhân hóa', icon: Users, color: 'from-fuchsia-500 to-pink-500' },
  { label: 'Lượt xem', value: '0', detail: 'Trong 30 ngày qua', icon: Eye, color: 'from-cyan-500 to-sky-500' },
  { label: 'Sự kiện sắp tới', value: '0', detail: 'Trong 30 ngày tới', icon: CalendarHeart, color: 'from-amber-500 to-orange-500' },
];

export default function DashboardPage() {
  return (
    <main className="p-4 sm:p-7 lg:p-9">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-violet-600">Tổng quan</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-violet-950 sm:text-3xl">Chào buổi sáng, Admin</h1>
            <p className="mt-2 text-sm text-violet-900/55">Theo dõi thiệp mời, khách mời và hoạt động gần đây.</p>
          </div>
          <Link href="/invitations/new" className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md shadow-fuchsia-500/25 transition hover:brightness-110">
            <Plus className="size-4" aria-hidden />
            Tạo thiệp mới
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map(({ label, value, detail, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
            >
              <span
                className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md`}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-3xl font-extrabold text-violet-950">{value}</p>
                  <p className="mt-1 text-sm font-semibold text-violet-900/70">{label}</p>
                </div>
                <p className="text-right text-xs leading-4 text-violet-900/45">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
          <section className="rounded-2xl border border-violet-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-violet-100 px-5 py-4">
              <div>
                <h2 className="font-bold text-violet-950">Thiệp mời gần đây</h2>
                <p className="mt-1 text-xs text-violet-900/50">Các thiệp bạn vừa tạo hoặc chỉnh sửa</p>
              </div>
              <Link href="/invitations" className="inline-flex items-center gap-1 text-sm font-bold text-violet-600 transition hover:text-violet-950">
                Xem tất cả <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-violet-50 text-violet-500"><FileText className="size-6" aria-hidden /></span>
              <h3 className="mt-4 font-bold text-violet-950">Chưa có thiệp mời nào</h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-violet-900/55">Bắt đầu bằng cách tạo thiệp đầu tiên cho khách hàng của bạn.</p>
              <Link href="/invitations/new" className="mt-5 text-sm font-bold text-violet-600 hover:text-violet-950">Tạo thiệp mới →</Link>
            </div>
          </section>

          <section className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-violet-950">Bắt đầu nhanh</h2>
            <p className="mt-1 text-xs text-violet-900/50">Quy trình tạo thiệp trong Admin Panel</p>
            <ol className="mt-5 space-y-4">
              {[
                ['1', 'Tạo thiệp mới', 'Nhập khách hàng và thông tin sự kiện', '/invitations/new'],
                ['2', 'Chọn mode', 'Cá nhân hóa hoặc một link dùng chung', '/invitations/new'],
                ['3', 'Phát hành', 'Xuất link và bàn giao cho khách hàng', '/invitations'],
              ].map(([number, title, description, href]) => (
                <li key={number} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-extrabold text-violet-700">{number}</span>
                  <div className="min-w-0">
                    <Link href={href} className="font-bold text-violet-950 hover:text-violet-600">{title}</Link>
                    <p className="mt-0.5 text-sm leading-5 text-violet-900/55">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
