import type { Metadata } from "next";
import UnfollowersClient from "@/components/unfollowers-client";

export const metadata: Metadata = {
  title: "Unfollowers",
  description:
    "Your unfollowers list. This page is intentionally not indexed to avoid exposing personal data.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function UnfollowersPage() {
  return <UnfollowersClient />;
}
