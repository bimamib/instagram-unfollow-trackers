import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { latestVersion, releaseDates } from "@/lib/release-meta";

type Section = {
  title: string;
  items: string[];
};

function formatISOToPretty(iso?: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function ReleaseCard({
  version,
  date, // optional, boleh dikosongkan
  tag, // optional, kalau kosong akan auto Latest/Release
  sections,
  highlight,
}: {
  version: string;
  date?: string;
  tag?: string;
  highlight?: string;
  sections: Section[];
}) {
  const autoIso = releaseDates?.[version];
  const autoDate = date ?? (autoIso ? formatISOToPretty(autoIso) : undefined);

  const autoTag =
    tag ?? (latestVersion && version === latestVersion ? "Latest" : "Release");

  return (
    <Card className="rounded-2xl">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl font-semibold">v{version}</CardTitle>

          <Badge variant="secondary" className="rounded-full">
            {autoTag}
          </Badge>

          {autoDate ? (
            <span className="text-xs text-muted-foreground">{autoDate}</span>
          ) : null}
        </div>

        {highlight ? (
          <p className="text-sm text-muted-foreground">{highlight}</p>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-4">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2">
            <div className="text-sm font-medium">{s.title}</div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}
