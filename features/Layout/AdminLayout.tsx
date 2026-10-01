'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import {
  setupAuthInterceptor,
  teardownAuthInterceptor,
} from '@/features/Auth/utils/authInterceptor';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setupAuthInterceptor();
    return teardownAuthInterceptor;
  }, []);

  if (pathname === '/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-brand-50 lg:flex">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex">
        <AdminSidebar />
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-violet-950/25"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Đóng menu"
          />
          <div className="relative h-full">
            <AdminSidebar onNavigate={() => setIsMenuOpen(false)} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 left-76 rounded-lg p-2 text-violet-950"
              aria-label="Đóng menu"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-violet-100 bg-white/85 px-4 backdrop-blur sm:px-7">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="rounded-xl p-2 text-violet-900 lg:hidden"
            aria-label="Mở menu"
          >
            <Menu className="size-5" aria-hidden />
          </button>
          <p className="hidden text-sm font-medium text-violet-950/55 lg:block">
            Trang quản trị
          </p>
          <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-violet-950">
            <span className="grid size-8 place-items-center rounded-full bg-violet-100 text-xs text-violet-700">
              A
            </span>
            <span className="hidden sm:block">Quản trị viên</span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
