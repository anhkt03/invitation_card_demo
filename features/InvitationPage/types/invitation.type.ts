import type {
  TemplateData,
  TemplateStyleConfig,
} from '@/components/templates/types';

/**
 * Dữ liệu một thiệp để render: chọn template theo `templateCode` (= Template.ComponentKey),
 * rồi đưa `data` (Invitation.ContentData) và `style` (Invitation.StyleConfig) vào props của template.
 */
export interface InvitationData {
    templateCode: string;
    data: TemplateData;
    style: TemplateStyleConfig;
}
