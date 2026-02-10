import fs from "node:fs";
import path from "node:path";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default function ChangelogPage() {
  const filePath = path.join(process.cwd(), "CHANGELOG.md");
  const md = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";

  // Render simple (aman, tanpa markdown parser)
  // Kalau mau render markdown proper, nanti bisa ditingkatkan.
  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold">Changelog</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Release notes for each version.
      </p>

      <pre
        className="mt-6 whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm leading-relaxed overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: escapeHtml(md) }}
      />
    </main>
  );
}
