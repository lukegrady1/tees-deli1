import { MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { business, hours } from "@/lib/business";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LiveHours } from "@/components/LiveHours";

export function HoursLocation() {
  // Official pinned Google Maps embed for the TEE's Deli & Catering listing.
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.1159343252975!2d-71.78540772334989!3d42.36136847119279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e40436c407c83b%3A0xf9be32db107e05e4!2sTEE's%20DELI%20%26%20CATERING!5e0!3m2!1sen!2sus!4v1781663402919!5m2!1sen!2sus";

  return (
    <Section id="visit" tone="paper">
      <Reveal className="mb-6 max-w-2xl sm:mb-10">
        <Eyebrow>Hours &amp; location</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Find us in West Boylston.
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:gap-8 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-4 sm:gap-6">
          {/* Hours */}
          <div className="rounded-2xl border border-sand bg-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Clock weight="thin" className="size-5 text-clay" aria-hidden />
              Hours
            </h3>
            <div className="mt-4">
              <LiveHours />
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-espresso">
                  {hours.walkIn.label}
                </dt>
                <dd className="text-stone">{hours.walkIn.summary}</dd>
                <dd className="mt-1 text-stone">{hours.walkIn.note}</dd>
              </div>
              <div>
                <dt className="font-medium text-espresso">
                  {hours.catering.label}
                </dt>
                <dd className="text-stone">{hours.catering.summary}</dd>
              </div>
              <div>
                <dt className="font-medium text-espresso">
                  {hours.consults.label}
                </dt>
                <dd className="text-stone">{hours.consults.summary}</dd>
              </div>
            </dl>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-sand bg-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
              <MapPin weight="thin" className="size-5 text-clay" aria-hidden />
              Location
            </h3>
            <address className="mt-4 not-italic text-stone">
              <a
                href={business.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-espresso underline-offset-4 hover:text-clay hover:underline"
              >
                {business.address.full}
              </a>
            </address>
            <a
              href={`tel:${business.phone.tel}`}
              className="mt-4 inline-flex items-center gap-2 font-medium text-clay underline-offset-4 hover:underline"
            >
              <Phone weight="regular" className="size-4" aria-hidden />
              {business.phone.display}
            </a>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="h-full min-h-[240px] overflow-hidden rounded-2xl border border-sand sm:min-h-[420px]">
            <iframe
              title={`Map to ${business.name} in West Boylston, MA`}
              src={mapSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
