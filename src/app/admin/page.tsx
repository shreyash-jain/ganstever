import type { Metadata } from "next";
import { buildRegistry } from "@/lib/analytics";
import { Dashboard } from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "Analytics",
  // robots.txt Disallow stops crawling, not indexing — Google will still list
  // a URL it has never fetched if something links to it. This meta tag is what
  // actually keeps /admin out of the index.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
};

export default function AdminPage() {
  // The registry is resolved on the server and passed down, so every published
  // page is listed even before Google has a single row for it — a post with no
  // traffic shows 0, rather than being absent and looking like a bug.
  return <Dashboard registry={buildRegistry()} />;
}
