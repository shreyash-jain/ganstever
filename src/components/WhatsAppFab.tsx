"use client";

import { usePathname } from "next/navigation";
import { whatsappLink, type WhatsAppKey } from "@/lib/site";

// Maps current pathname to the right pre-filled WhatsApp message.
// The home page is a single flow, so everything except the journal
// resolves to the general enquiry.
function pageKeyFor(pathname: string): WhatsAppKey {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return seg === "blog" ? "blog" : "home";
}

export function WhatsAppFab() {
  const pathname = usePathname();
  const href = whatsappLink(pageKeyFor(pathname ?? "/"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gans-te-Ver on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/15 ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:bg-[#1ebe57] sm:bottom-7 sm:right-7"
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.05 4.92A10.05 10.05 0 0 0 12.04 2C6.5 2 2 6.5 2 12.04c0 1.77.46 3.5 1.34 5.02L2 22l5.06-1.32a10.04 10.04 0 0 0 4.98 1.27h.01c5.54 0 10.04-4.5 10.04-10.04 0-2.68-1.04-5.2-2.94-7.09zM12.04 20.18h-.01a8.13 8.13 0 0 1-4.15-1.14l-.3-.18-3 .79.8-2.93-.2-.31a8.16 8.16 0 1 1 15.15-4.37 8.13 8.13 0 0 1-8.29 8.14zm4.46-6.1c-.25-.13-1.45-.72-1.67-.8-.22-.08-.39-.13-.55.13s-.63.8-.78.96c-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.39.1-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42l-.47-.01a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.06s.89 2.39 1.01 2.55c.13.17 1.76 2.68 4.27 3.76.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}