import AdminLayout from '@/features/Layout/AdminLayout';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
