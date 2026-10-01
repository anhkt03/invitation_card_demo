import Link from "next/link";
import { Heart } from "lucide-react";
import LegalFooter from "@/components/shared/sections/LegalFooter";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-violet-100 bg-white shadow-sm shadow-violet-100/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="bg-brand-gradient grid size-9 place-items-center rounded-xl text-white shadow-md shadow-fuchsia-500/30">
              <Heart className="size-4.5 fill-white" aria-hidden />
            </span>
            <span className="text-[17px] font-bold tracking-tight text-violet-950">
              Thiệp Mời <span className="text-gradient">Online</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium text-violet-900/70">
            <Link
              href="/#mau-thiep"
              className="rounded-full px-4 py-2 transition hover:bg-violet-100 hover:text-violet-950"
            >
              Mẫu thiệp
            </Link>
            <Link
              href="/#cach-hoat-dong"
              className="hidden rounded-full px-4 py-2 transition hover:bg-violet-100 hover:text-violet-950 sm:block"
            >
              Cách hoạt động
            </Link>
            <Link
              href="/login"
              className="bg-brand-gradient ml-2 rounded-full px-5 py-2 text-white shadow-md shadow-fuchsia-500/25 transition hover:brightness-110"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer pháp lý bắt buộc trên mọi trang public (FR-73) */}
      <div className="border-t border-violet-100 bg-white">
        <LegalFooter />
      </div>
    </div>
  );
}
