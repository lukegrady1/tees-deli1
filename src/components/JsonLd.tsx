import { business, SITE_URL } from "@/lib/business";

/**
 * LocalBusiness / Restaurant structured data with the CORRECT West Boylston
 * address, phone, geo, and hours. Catering availability is the broad window;
 * walk-in is presented as managed elsewhere, so we publish the catering window
 * as the bookable hours rather than a stale storefront time.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    image: `${SITE_URL}/opengraph-image`,
    url: SITE_URL,
    telephone: business.phone.display,
    email: business.email,
    servesCuisine: ["Deli", "Sandwiches", "Catering", "Breakfast"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: business.serviceArea,
    sameAs: [business.links.facebook, business.links.toast],
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: false,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "05:00",
        closes: "22:00",
        description: "Pre-scheduled catering availability",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Server-rendered, static data only — safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
