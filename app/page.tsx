import type { Metadata } from "next";
import { FileUpload } from "@/components/file-upload";
import { InstructionsCard } from "@/components/instructions-card";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Detect Instagram unfollowers using your Instagram data download. Upload followers & following JSON files and see who doesn’t follow you back.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Instagram Unfollowers Tracker",
    description:
      "Upload Instagram followers & following JSON files and detect accounts that don’t follow you back.",
    url: `${siteUrl}/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OG Image" }],
  },
};

export default function HomePage() {
  const handleDownload = () => {
    // pastikan file ini ada di /public
    window.location.href = "/instructions.pdf";
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Instagram Unfollowers Tracker
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Upload your Instagram data files and detect accounts that don’t
            follow you back. Processing happens locally in your browser.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload files</h2>
            <p className="text-sm text-muted-foreground">
              Use the JSON files from your Instagram data download:
              <span className="block mt-1">
                • Followers file (array JSON) <br />• Following file
                (relationships_following)
              </span>
            </p>
            <FileUpload />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Get your Instagram data</h2>
            <p className="text-sm text-muted-foreground">
              If you haven’t requested your data yet, download the step-by-step
              guide.
            </p>
            <InstructionsCard onDownload={handleDownload} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Download your Instagram data (followers & following).</li>
            <li>Upload the two JSON files here.</li>
            <li>
              The app compares usernames and shows accounts you follow that
              don’t follow you back.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">FAQ</h2>

          <div className="space-y-2">
            <h3 className="font-medium">Is it safe?</h3>
            <p className="text-sm text-muted-foreground">
              The comparison runs in your browser. Your files are not uploaded
              to a server by this page.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">
              Why isn’t the unfollowers page indexed?
            </h3>
            <p className="text-sm text-muted-foreground">
              That page may contain personal links/usernames. It’s set to
              noindex to avoid search engines indexing private data.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
