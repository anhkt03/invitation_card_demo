'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/features/Auth/hooks/useAuth';
import { ADMIN_NAVIGATION, ADMIN_SETTINGS } from '../constants';

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-full w-72 flex-col border-r border-violet-100 bg-white p-4 shadow-xl shadow-violet-950/5 lg:w-64 lg:shadow-none">
      <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2" onClick={onNavigate}>
        <span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-white shadow-md shadow-fuchsia-500/25">
          <Heart className="size-5 fill-white" aria-hidden />
        </span>
        <span className="font-bold tracking-tight text-violet-950">
          Thiệp Mời <span className="text-gradient">Online</span>
        </span>
      </Link>

      <nav className="mt-9 space-y-1" aria-label="Điều hướng quản trị">
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-900/35">Quản lý</p>
        {ADMIN_NAVIGATION.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-violet-950/60 hover:bg-violet-50 hover:text-violet-950'
              }`}
            >
              <Icon className="size-[18px]" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-violet-100 pt-6">
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-900/35">Hệ thống</p>
        {ADMIN_SETTINGS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-violet-950/60 transition hover:bg-violet-50 hover:text-violet-950"
          >
            {label}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        ))}
      </div>

      <div className="mt-auto rounded-2xl bg-violet-50 p-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-violet-200 text-sm font-bold text-violet-700">A</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-violet-950">Quản trị viên</p>
            <p className="truncate text-xs text-violet-900/50">admin@thiepmoi.vn</p>
          </div>
          <button type="button" onClick={logout} className="rounded-lg p-1.5 text-violet-900/45 transition hover:bg-white hover:text-violet-950" aria-label="Đăng xuất">
            <LogOut className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </aside>
  );
}
