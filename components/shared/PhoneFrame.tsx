import type { ReactNode } from "react";

/**
 * Khung mô phỏng iPhone 15 Pro Max — tỉ lệ 9:19.5, Dynamic Island, nút cạnh
 * titan, thanh cuộn ẩn. Dùng chung cho trang nhập thử và màn Admin tạo thiệp.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[9/19.5] w-[330px] max-w-full rounded-[3rem] bg-gradient-to-b from-zinc-600 to-zinc-800 p-[3px] shadow-2xl">
      {/* Nút cạnh trái: Action + tăng/giảm âm lượng */}
      <span className="absolute -left-[2px] top-[14%] h-[3.5%] w-[3px] rounded-l bg-zinc-500" />
      <span className="absolute -left-[2px] top-[20%] h-[6%] w-[3px] rounded-l bg-zinc-500" />
      <span className="absolute -left-[2px] top-[28%] h-[6%] w-[3px] rounded-l bg-zinc-500" />
      {/* Nút cạnh phải: nguồn */}
      <span className="absolute -right-[2px] top-[23%] h-[9%] w-[3px] rounded-r bg-zinc-500" />

      <div className="h-full w-full rounded-[2.85rem] bg-black p-[10px]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-white">
          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
          <div className="no-scrollbar h-full w-full overflow-y-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
