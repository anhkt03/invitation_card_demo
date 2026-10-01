import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplate } from "@/components/templates";
import TryPageClient from "@/features/preview/TryPageClient";

type Props = { params: Promise<{ key: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const entry = getTemplate(key);
  if (!entry) return {};
  return {
    title: `${entry.meta.name} — Nhập thử & Xem trước`,
    description: entry.meta.description,
  };
}

export default async function TryTemplatePage({ params }: Props) {
  const { key } = await params;
  const entry = getTemplate(key);
  if (!entry) notFound();
  return <TryPageClient templateKey={key} />;
}
