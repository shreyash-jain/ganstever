import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { House } from "@/components/home/House";
import { Setting } from "@/components/home/Setting";
import { WhoFor } from "@/components/home/WhoFor";
import { Practical, faqs } from "@/components/home/Practical";
import { Book } from "@/components/home/Book";
import { faqLd } from "@/lib/jsonld";

// Single-flow page — brief: a family planning a weekend must be able to
// scan the whole thing in 60 seconds. Hero → Story → House → Setting →
// Who it's for → Practical → Book.
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd(faqs.map((f) => ({ q: f.q, a: f.a })))),
        }}
      />
      <Hero />
      <Story />
      <House />
      <Setting />
      <WhoFor />
      <Practical />
      <Book />
    </>
  );
}
