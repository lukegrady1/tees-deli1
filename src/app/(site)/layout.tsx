import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

/**
 * Chrome for the customer-facing site. /admin sits outside this group on
 * purpose — the owner posting a flyer shouldn't get a nav bar, a footer, or a
 * sticky "Get a Quote" bar sitting over the buttons he's trying to tap.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // pb on small screens reserves room for the mobile action bar so it never
    // overlaps content.
    <div className="flex min-h-full flex-1 flex-col pb-20 lg:pb-0">
      <LocalBusinessJsonLd />
      <ScrollToTop />
      <Header />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
