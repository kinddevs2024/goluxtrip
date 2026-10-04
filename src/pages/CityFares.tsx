import { Link } from "react-router-dom";

type Fare = [string, string, number, number, number, number];
const groups: { title: string; fares: Fare[] }[] = [
  { title: "Economy Class", fares: [
    ["Chevrolet Cobalt", "Sedan", 3, 60, 20, 6],
    ["Chevrolet Gentra", "Sedan", 3, 60, 20, 6],
    ["Chevrolet Captiva", "4WD", 4, 90, 40, 7],
    ["KIA Carnival", "Minivan", 5, 120, 50, 8],
    ["Hyundai H1", "Minivan", 7, 130, 55, 8],
    ["JAC Sunray", "Minibus", 13, 140, 70, 8],
    ["King Long", "Minibus", 15, 140, 70, 8],
    ["Mercedes-Benz Sprinter", "Minibus", 18, 160, 80, 10],
  ] },
  { title: "Premium Class", fares: [
    ["Chevrolet Tracker", "Crossover", 3, 75, 30, 10],
    ["Chevrolet Malibu", "Sedan", 3, 110, 45, 10],
    ["Chevrolet Trailblazer", "4WD", 4, 110, 40, 8],
    ["KIA Carnival", "Minivan", 5, 140, 60, 10],
    ["Hyundai Staria", "Minivan", 7, 150, 60, 10],
    ["Mercedes Viano", "Minivan", 6, 150, 60, 10],
    ["Toyota HiAce", "Minibus", 12, 140, 60, 8],
    ["Mercedes Sprinter", "Minibus", 20, 200, 100, 10],
  ] },
  { title: "Business Class", fares: [
    ["Mercedes-Benz S-Class 222", "Sedan", 3, 250, 90, 12],
    ["Mercedes-Benz S-Class 223", "Sedan", 3, 500, 150, 15],
    ["Toyota Land-Cruiser 200", "4WD", 4, 300, 100, 10],
  ] },
  { title: "Bus", fares: [
    ["Higer", "Bus", 33, 140, 70, 10],
    ["Higher", "Bus", 50, 160, 80, 12],
    ["MAN", "Bus", 53, 170, 100, 12],
  ] },
];

export default function CityFares() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gltOrange">GoLuxTrip Transportation</p>
        <h1 className="text-4xl font-black text-navy md:text-5xl">City Fares</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-500">Compare daily city service, hotel and airport transfers, and hourly overtime. All prices are in USD.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/contact" className="rounded bg-gltOrange px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#c84211]">Request Transportation</Link>
          <a href="/documents/GLT.pdf" download className="rounded border border-line px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy hover:text-gltOrange">Download fleet & fares PDF</a>
        </div>
        <div className="mt-12 space-y-10">
          {groups.map(({ title, fares }) => (
            <section key={title} aria-label={title}>
              <h2 className="mb-4 text-2xl font-black text-navy">{title}</h2>
              <div className="overflow-x-auto rounded-xl border border-line" tabIndex={0} role="region" aria-label={`${title} fare table, scroll horizontally on small screens`}>
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-navy text-white">
                    <tr>{["Vehicle", "Type", "Passengers (excl. driver)", "Daily city service (09:00–18:00)", "Hotel / airport transfer", "Overtime / hour"].map(label => <th key={label} scope="col" className="px-5 py-4 font-bold">{label}</th>)}</tr>
                  </thead>
                  <tbody>{fares.map(([vehicle, type, capacity, daily, transfer, overtime], index) => (
                    <tr key={vehicle} className={index % 2 ? "bg-gray-50" : "bg-white"}>
                      <th scope="row" className="px-5 py-4 font-semibold text-navy">{vehicle}</th>
                      <td className="px-5 py-4">{type}</td><td className="px-5 py-4">{capacity}</td>
                      {[daily, transfer, overtime].map((price, i) => <td key={i} className="px-5 py-4 whitespace-nowrap">${price.toFixed(2)}</td>)}
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
        <aside className="mt-10 rounded-xl bg-gray-50 p-6 text-sm leading-7 text-gray-600" aria-label="Fare conditions">
          <h2 className="mb-2 font-bold text-navy">Please note</h2>
          <p>Other vehicle types can be arranged according to your needs.</p>
          <p>Service fees may vary for travel outside the city. A quote is provided after you share your route or mission plan.</p>
          <p>Vehicles are subject to availability.</p>
        </aside>
      </div>
    </section>
  );
}
