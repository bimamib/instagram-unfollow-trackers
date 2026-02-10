export default function Changelog() {
  return (
    <main className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Changelog</h1>

      <div className="mt-6 space-y-4">
        <div>
          <h2 className="font-semibold">v1.2.2</h2>
          <p className="text-sm text-muted-foreground">Added Changelog</p>
        </div>

        <div>
          <h2 className="font-semibold">v1.2.1</h2>
          <p className="text-sm text-muted-foreground">
            Added SEO metadata + sitemap + robots.txt
          </p>
        </div>

        <div>
          <h2 className="font-semibold">v1.2.0</h2>
          <p className="text-sm text-muted-foreground">
            Update UI, List Steps Request for Instagram Data, Bug fixes
          </p>
        </div>

        <div>
          <h2 className="font-semibold">v1.1.1</h2>
          <p className="text-sm text-muted-foreground">Bug fixes</p>
        </div>

        <div>
          <h2 className="font-semibold">v1.0.0</h2>
          <p className="text-sm text-muted-foreground">
            Initial release — Upload JSON + Detect unfollowers
          </p>
        </div>
      </div>
    </main>
  );
}
