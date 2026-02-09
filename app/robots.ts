import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://instagram-unfollow-trackers.vercel.app/";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/unfollowers"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
