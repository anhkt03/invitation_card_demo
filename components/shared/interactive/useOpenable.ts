"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/components/shared/effects/useInView";

type Options = {
  /** Mở sẵn ngay từ đầu. */
  defaultOpen?: boolean;
  /** Tự mở khi cuộn tới (sau `openDelay`) — người xem không cần đoán là phải chạm. */
  openOnView?: boolean;
  openDelay?: number;
  /** Gọi mỗi khi trạng thái đóng/mở đổi (kể cả lần đầu) — để template biết bìa đã mở. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Trạng thái đóng/mở dùng chung cho các component tương tác (phong thư, hòm thư,
 * hộp quà, rèm). Chạm để bật/tắt; `openOnView` thì tự mở khi cuộn tới.
 */
export function useOpenable({
  defaultOpen = false,
  openOnView = false,
  openDelay = 600,
  onOpenChange,
}: Options = {}) {
  const { ref, visible } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const [open, setOpen] = useState(defaultOpen);

  const onChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onChangeRef.current = onOpenChange;
  });
  useEffect(() => {
    onChangeRef.current?.(open);
  }, [open]);

  useEffect(() => {
    if (!openOnView || !visible) return;
    const id = setTimeout(() => setOpen(true), openDelay);
    return () => clearTimeout(id);
  }, [openOnView, visible, openDelay]);

  return { ref, open, visible, setOpen, toggle: () => setOpen((o) => !o) };
}
