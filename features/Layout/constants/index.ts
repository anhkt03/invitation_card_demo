import {
  BarChart3,
  FileText,
  Heart,
  LayoutDashboard,
  Users,
} from 'lucide-react';

export const ADMIN_NAVIGATION = [
  { href: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/invitations', label: 'Thiệp mời', icon: Heart },
  { href: '/templates', label: 'Mẫu thiệp', icon: FileText },
  { href: '/customers', label: 'Khách hàng', icon: Users },
  { href: '/analytics', label: 'Thống kê', icon: BarChart3 },
] as const;

export const ADMIN_SETTINGS = [
  { href: '/legal', label: 'Trang pháp lý' },
  { href: '/accounts', label: 'Tài khoản' },
] as const;
