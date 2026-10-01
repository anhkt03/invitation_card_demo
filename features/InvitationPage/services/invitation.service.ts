import { API_BASE_URL, ENDPOINTS } from '@/shared/constants';
import { InvitationData } from '../types/invitation.type';

export const invitationService = {
    getEventBySlug: async (slug: string): Promise<InvitationData> => {
        const res = await fetch(`${API_BASE_URL}${ENDPOINTS.INVITATION.BY_SLUG(slug)}`, {
            // Cấu hình ISR & On-demand Revalidation bằng tags
            // Admin có thể gọi revalidateTag('invitation-${slug}') khi update thiệp
            next: {
                tags: ['invitations', `invitation-${slug}`],
                // revalidate: 3600 // Tuỳ chọn: Tự động invalidate sau 1 giờ, hoặc bỏ qua nếu chỉ dùng on-demand
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch event data for slug: ${slug}`);
        }

        return res.json();
    }
};
