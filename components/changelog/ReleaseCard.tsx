import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Section = {
  title: string;
  items: string[];
};

export function ReleaseCard({
  version,
  date,
  tag = "Release",
  sections,
  highlight,
}: {
  version: string;
  date?: string;
  tag?: string;
  highlight?: string;
  sections: Section[];
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl font-semibold">v{version}</CardTitle>
          <Badge variant="secondary" className="rounded-full">
            {tag}
          </Badge>
          {date ? (
            <span className="text-xs text-muted-foreground">{date}</span>
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
