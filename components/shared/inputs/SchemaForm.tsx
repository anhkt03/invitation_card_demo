"use client";

import {
  BODY_FONT_OPTIONS,
  DEFAULT_BODY_FONT,
  DEFAULT_SCALE,
} from "@/components/templates/style-options";
import type {
  FieldDef,
  TemplateData,
  TemplateMeta,
  TemplateStyleConfig,
} from "@/components/templates/types";
import BackgroundPicker from "./BackgroundPicker";
import DateTimeField from "./DateTimeField";
import FontPicker from "./FontPicker";
import GalleryField from "./GalleryField";
import ImageField from "./ImageField";
import PalettePicker from "./PalettePicker";
import SelectField from "./SelectField";
import SizePicker from "./SizePicker";
import TextAreaField from "./TextAreaField";
import TextField from "./TextField";
import ToggleField from "./ToggleField";

type Props = {
  meta: TemplateMeta;
  data: TemplateData;
  style: TemplateStyleConfig;
  onField: (key: string, value: string | string[]) => void;
  onStyle: (patch: Partial<TemplateStyleConfig>) => void;
};

/**
 * Form nhập liệu sinh tự động từ field schema của template (FR-11, FR-12).
 * Cùng bộ form này về sau được Admin Panel dùng lại khi tạo thiệp thật (FR-31).
 */
export default function SchemaForm({
  meta,
  data,
  style,
  onField,
  onStyle,
}: Props) {
  const groups: { name: string; fields: FieldDef[] }[] = [];
  for (const field of meta.fields) {
    const group = groups.find((g) => g.name === field.group);
    if (group) group.fields.push(field);
    else groups.push({ name: field.group, fields: [field] });
  }

  function renderField(field: FieldDef) {
    const raw = data[field.key];
    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.key}
            field={field}
            value={typeof raw === "string" ? raw : ""}
            onChange={(v) => onField(field.key, v)}
          />
        );
      case "textarea":
        return (
          <TextAreaField
            key={field.key}
            field={field}
            value={typeof raw === "string" ? raw : ""}
            onChange={(v) => onField(field.key, v)}
          />
        );
      case "datetime":
        return (
          <DateTimeField
            key={field.key}
            field={field}
            value={typeof raw === "string" ? raw : ""}
            onChange={(v) => onField(field.key, v)}
          />
        );
      case "image":
        return (
          <ImageField
            key={field.key}
            field={field}
            value={typeof raw === "string" ? raw : ""}
            onChange={(v) => onField(field.key, v)}
          />
        );
      case "gallery":
        return (
          <GalleryField
            key={field.key}
            field={field}
            value={Array.isArray(raw) ? raw : undefined}
            onChange={(v) => onField(field.key, v)}
          />
        );
      case "toggle":
        return (
          <ToggleField
            key={field.key}
            field={field}
            value={typeof raw === "string" ? raw : ""}
            onChange={(v) => onField(field.key, v)}
          />
        );
      case "select":
        return (
          <SelectField
            key={field.key}
            field={field}
            value={typeof raw === "string" ? raw : ""}
            onChange={(v) => onField(field.key, v)}
          />
        );
    }
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-800">Màu sắc & Chữ</h3>
        {meta.backgrounds && meta.backgrounds.length > 0 && (
          <BackgroundPicker
            backgrounds={meta.backgrounds}
            value={style.background ?? 0}
            onChange={(background) => onStyle({ background })}
          />
        )}
        <PalettePicker
          palettes={meta.palettes}
          value={style.palette}
          onChange={(palette) => onStyle({ palette })}
        />
        <FontPicker
          label="Phông chữ tiêu đề"
          fonts={meta.fonts}
          value={style.heading_font}
          onChange={(heading_font) => onStyle({ heading_font })}
        />
        <FontPicker
          label="Phông chữ nội dung"
          fonts={BODY_FONT_OPTIONS}
          value={style.body_font ?? DEFAULT_BODY_FONT}
          onChange={(body_font) => onStyle({ body_font })}
        />
        <SizePicker
          value={style.scale ?? DEFAULT_SCALE}
          onChange={(scale) => onStyle({ scale })}
        />
      </section>

      {groups.map((group) => (
        <section
          key={group.name}
          className="space-y-4 rounded-xl border border-zinc-200 bg-white p-4"
        >
          <h3 className="text-sm font-semibold text-zinc-800">{group.name}</h3>
          {group.fields.map(renderField)}
        </section>
      ))}
    </div>
  );
}
