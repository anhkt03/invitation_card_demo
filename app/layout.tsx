import type { Metadata } from "next";
import { Toast } from "@heroui/react";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Thiệp Mời Online — Thiệp cưới, sinh nhật, khai trương",
    template: "%s · Thiệp Mời Online",
  },
  description:
    "Chọn mẫu thiệp mời online đẹp, nhập thử thông tin và xem trước ngay. Thiệp cưới, tốt nghiệp, sinh nhật, khai trương.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toast.Provider placement="top end" />
      </body>
    </html>
  );
}
