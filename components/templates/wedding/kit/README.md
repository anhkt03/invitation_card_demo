# Wedding kit — thiệp cưới lắp từ component

Các mẫu `WeddingTemplate2…6` dùng chung **một bộ dữ liệu JSON phẳng**: đổi sang mẫu khác thì giữ nguyên file JSON.
Mẫu nào thiếu key nào thì phần tương ứng của thiệp **tự ẩn** — không bao giờ hiện nội dung mẫu.

## Truyền dữ liệu

```tsx
import WeddingTemplate3 from "@/components/templates/wedding/WeddingTemplate3";
import data from "./my-wedding.json";            // file người tạo thiệp gửi

<WeddingTemplate3 data={data} style={{ palette: 0, heading_font: "playfair" }} />
```

- `data` = `Record<string, string | string[]>` (đúng `Invitation.ContentData`).
- `style` = lựa chọn palette / font / cỡ chữ của thiệp (`Invitation.StyleConfig`).
- [`sample.json`](./sample.json) là dữ liệu mẫu đầy đủ — **nguồn duy nhất** của `default` mỗi field
  (trang nhập thử tự điền vào ô bỏ trống; thiệp thật thì không).

## Các key

Ảnh = đường dẫn hoặc URL (`https://…`). Ngày giờ = `"YYYY-MM-DDTHH:mm"`. Nhiều dòng = chuỗi có `\n`.
Chi tiết label / maxLength / hint của từng key xem [`fields.ts`](./fields.ts).

| Nhóm | Key |
|---|---|
| Cô dâu & chú rể | `groom_name` `bride_name` · `groom_photo` `bride_photo` · `groom_role` `bride_role` · `groom_parents` `bride_parents` · `groom_address` `bride_address` · `use_initials` |
| Lời ngỏ | `cover_quote` `opening_quote` `opening_letter` `invitation` `families_note` `calendar_note` |
| Chương trình | `engagement_date_time` `engagement_venue` · `date_time` `lunar_date` `wedding_venue` · `reception_date_time` `reception_note` |
| Địa điểm tiệc | `venue_name` `venue_hall` `venue_address` `map_url` |
| Ảnh | `cover_photo` (bìa) · `background_photo` (nền, mặc định = ảnh bìa) · `thanks_photo` (cảm ơn, mặc định = ảnh bìa) · `gallery` (mảng URL, nội dung) · `gallery_captions` · `banner_words` |
| Chuyện tình & lưu bút | `story_milestones` (`Năm — nội dung`, mỗi dòng một mốc) · `wishes` (`Tên: lời chúc`) |
| Mừng cưới | `gift_note` · `groom_qr_image` `groom_account_name` `groom_bank` · `bride_qr_image` `bride_account_name` `bride_bank` |
| Cảm ơn | `thank_you` |
| Chế độ xem | `auto_scroll` (`"true"`/`"false"`) · `auto_scroll_speed` (`slow` / `normal` / `fast`) |

- `use_initials`: bật thì con dấu sáp / monogram dùng chữ cái đầu của tên (vd `K&H`); để trống hoặc `"false"` thì không dùng
  (con dấu hiện ♥, monogram ẩn).
- `auto_scroll`: thiệp tự trượt xuống cho khách xem; khách chạm / cuộn tay thì dừng, có nút để tiếp tục.

## Thêm một mẫu mới

1. `makeWeddingMeta({...})` trong `meta.ts` (tên, mô tả, thumbnail, palette) — field dùng chung từ `fields.ts`.
2. `index.tsx`: `readWedding(data)` → bọc `<WeddingShell>` → xếp các section trong `sections.tsx`
   (mỗi section có biến thể: `GallerySection layout=…`, `FamiliesSection variant=…`, `ThanksSection variant=…`)
   và chọn bộ animation trong `motion.ts`. Bìa dùng `HeroCover variant=…` hoặc cổng mở (`CurtainCover`, …).
3. Đăng ký trong `components/templates/index.ts`, rồi `npm run gen:sql` để sinh file SQL seed.

> DB chỉ lưu phần **flexible** (label, hint, maxLength, required, scale). Kiểu field, nhóm, dữ liệu mẫu,
> palette, font nằm trong code — `npm run gen:sql` đã làm đúng như vậy.
