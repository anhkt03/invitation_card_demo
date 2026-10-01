import InvitationPage from '@/features/InvitationPage/InvitationPage';

// Theo như SRS (fallback: blocking, on-demand revalidation, không build trước toàn bộ slugs)
// Mặc định Next.js App Router dynamic routing mà không có generateStaticParams 
// sẽ render lazy on-demand (tương tự fallback: blocking).
// Có thể thêm cấu hình này để ép cache tĩnh nếu cần:
// export const dynamic = 'force-static';
// export const revalidate = 86400; // Hoặc dùng time-based ISR ở level page

export default InvitationPage;
