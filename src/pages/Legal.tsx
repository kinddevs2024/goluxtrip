export function PrivacyPolicy() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-28 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-gltOrange">GoLuxTrip</p>
      <h1 className="mt-4 text-4xl font-black text-navy">Privacy Policy</h1>
      <div className="mt-8 space-y-5 text-base leading-8 text-asphalt">
        <p>
          GoLuxTrip collects only the contact and trip details needed to respond to transportation requests,
          coordinate bookings, and provide Active Missions.
        </p>
        <p>
          Request details may include your name, organization, email, phone number, route, travel dates,
          passenger count, service type, and notes you submit through the website.
        </p>
        <p>
          We do not sell personal information. Submitted information is used for customer communication,
          service delivery, internal records, and legally required business purposes.
        </p>
        <p>
          To request access, correction, or deletion of your submitted information, contact us at
          <a className="font-bold text-gltOrange" href="mailto:info@goluxtrip.com"> info@goluxtrip.com</a>.
        </p>
      </div>
    </section>
  );
}

export function TermsAndConditions() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-28 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-gltOrange">GoLuxTrip</p>
      <h1 className="mt-4 text-4xl font-black text-navy">Terms & Conditions</h1>
      <div className="mt-8 space-y-5 text-base leading-8 text-asphalt">
        <p>
          Website requests are inquiries, not confirmed bookings. A transportation service is confirmed only
          after GoLuxTrip reviews the details and agrees on timing, route, vehicle availability, and pricing.
        </p>
        <p>
          Clients are responsible for providing accurate passenger counts, dates, pickup points, destinations,
          and special requirements before service confirmation.
        </p>
        <p>
          Routes, vehicle assignments, and timing may change due to road, weather, security, or operational
          conditions. GoLuxTrip will communicate material changes as early as practical.
        </p>
        <p>
          For questions about bookings or these terms, contact
          <a className="font-bold text-gltOrange" href="mailto:info@goluxtrip.com"> info@goluxtrip.com</a>.
        </p>
      </div>
    </section>
  );
}
