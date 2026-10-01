// Sinh file SQL seed cho bảng "Templates" từ meta.ts của các template wedding.
//   Chạy:  npm run gen:sql            (từ thư mục FE)
//   Ra:    BE/Database/Templates/<ComponentKey>.sql
//
// NGUYÊN TẮC: DB chỉ lưu phần FLEXIBLE — admin chỉnh được mà không cần deploy:
//   FieldSchema  → mỗi key chỉ có: label, hint, placeholder, maxLength, required (và max ảnh với gallery)
//   StyleSchema  → chỉ có: scales (các cỡ chữ được phép) + cỡ chữ mặc định
// KHÔNG lưu vào DB: key↔kiểu field (type), group, order, rows, dữ liệu mẫu/default (kể cả URL ảnh),
// palette, font — những thứ này gắn chặt với component nên nằm trong code (meta.ts + sample.json).
import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const FE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.resolve(FE_ROOT, "..", "BE", "Database", "Templates");

// ---- Loader tối giản để import được meta.ts (alias "@/" + transpile TS) ----
const load = (module, filename) => {
  const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
  }).outputText;
  module._compile(out, filename);
};
Module._extensions[".ts"] = load;
Module._extensions[".tsx"] = load;
const resolveOrig = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) request = path.join(FE_ROOT, request.slice(2));
  return resolveOrig.call(this, request, ...rest);
};
const require = Module.createRequire(import.meta.url);

// ---- Template cần sinh SQL: [đường dẫn meta, tên export] ----
const TEMPLATES = [
  ["components/templates/wedding/Demo/meta", "demoMeta"],
  ["components/templates/wedding/WeddingTemplate1/meta", "weddingTemplate1Meta"],
  ["components/templates/wedding/WeddingTemplate2/meta", "weddingTemplate2Meta"],
  ["components/templates/wedding/WeddingTemplate3/meta", "weddingTemplate3Meta"],
  ["components/templates/wedding/WeddingTemplate4/meta", "weddingTemplate4Meta"],
  ["components/templates/wedding/WeddingTemplate5/meta", "weddingTemplate5Meta"],
  ["components/templates/wedding/WeddingTemplate6/meta", "weddingTemplate6Meta"],
];

const sqlString = (s) => `'${String(s).replaceAll("'", "''")}'`;

/** Phần flexible của một field — thứ tự key cố định cho dễ đọc diff. */
function fieldConfig(f) {
  const cfg = { label: f.label, required: !f.optional };
  if (f.maxLength !== undefined) cfg.maxLength = f.maxLength;
  if (f.type === "gallery") cfg.max = f.max;
  if (f.hint) cfg.hint = f.hint;
  if (f.placeholder) cfg.placeholder = f.placeholder;
  return cfg;
}

function fieldSchemaJson(meta) {
  const lines = meta.fields.map((f) => `  ${JSON.stringify(f.key)}: ${JSON.stringify(fieldConfig(f))}`);
  return `{\n${lines.join(",\n")}\n}`;
}

function styleSchemaJson(meta) {
  // Cỡ chữ: danh sách cỡ cho phép + cỡ mặc định (palette/font ở trong code, không lưu DB).
  const scales = ["sm", "md", "lg"];
  return JSON.stringify({ scales, default_scale: meta.defaultStyle.scale ?? "md" }, null, 2);
}

function buildSql(meta) {
  if (!meta.fields.length) throw new Error(`${meta.key}: không có field`);
  return `-- =====================================================================
-- Template : ${meta.key} — ${meta.name} (${meta.category})
-- Nguồn    : sinh từ meta.ts bằng \`npm run gen:sql\` (thư mục FE) — sửa meta.ts rồi sinh lại, đừng sửa tay
-- Mục đích : đăng ký template vào DB chỉ với phần FLEXIBLE (admin chỉnh được không cần deploy).
--              "FieldSchema" -> với mỗi key dữ liệu: label, hint, placeholder, maxLength, required (+ max ảnh của gallery)
--              "StyleSchema" -> các cỡ chữ (scale) cho phép + cỡ mặc định
--            KHÔNG lưu ở DB: kiểu field, nhóm, thứ tự, dữ liệu mẫu (kể cả URL ảnh), palette, font.
--            Những thứ đó gắn chặt với component nên nằm trong code (meta.ts + sample.json).
--            Giá trị thật của từng thiệp nằm ở "Invitations"."ContentData" và chỉ chứa các key khai báo ở đây.
-- Chạy lại nhiều lần an toàn: bỏ qua nếu ComponentKey đã tồn tại.
-- Muốn ĐỔI schema của template đã có thiệp dùng -> viết file UPDATE riêng
-- và kiểm tra ContentData cũ, đừng sửa file này.
-- Tên bảng/cột theo mặc định EF Core + Npgsql (PascalCase, phải có ngoặc kép);
-- đối chiếu lại khi có migration đầu tiên.
-- =====================================================================

INSERT INTO "Templates"
    ("Name", "Category", "ThumbnailUrl", "Status", "ComponentKey",
     "FieldSchema", "StyleSchema", "CreatedAt", "IsDeleted")
SELECT
    ${sqlString(meta.name)},
    ${sqlString(meta.category)},
    ${sqlString(meta.thumbnail)},
    'Visible',
    ${sqlString(meta.key)},

    $field$
${fieldSchemaJson(meta)}
$field$,

    $style$
${styleSchemaJson(meta)}
$style$,

    now(),
    false
WHERE NOT EXISTS (
    SELECT 1 FROM "Templates" WHERE "ComponentKey" = ${sqlString(meta.key)}
);
`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const [file, exportName] of TEMPLATES) {
  const meta = require(path.join(FE_ROOT, file))[exportName];
  if (!meta) throw new Error(`Không tìm thấy export ${exportName} trong ${file}`);
  // Nội dung JSON không được chứa dấu phân cách dollar-quote, nếu không SQL sẽ vỡ.
  if (/\$(field|style)\$/.test(fieldSchemaJson(meta) + styleSchemaJson(meta))) {
    throw new Error(`${meta.key}: nội dung chứa $field$/$style$`);
  }
  fs.writeFileSync(path.join(OUT_DIR, `${meta.key}.sql`), buildSql(meta), "utf8");
  console.log(`✓ ${meta.key}.sql  (${meta.fields.length} field)`);
}
