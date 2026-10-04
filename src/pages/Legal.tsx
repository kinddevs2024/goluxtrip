import policies from "../data/legalPolicies.json";

const cancellationRows = [
  ["More than 72 hours before service", "No fee", "100%"],
  ["48–72 hours before service", "30%", "70%"],
  ["24–48 hours before service", "40%", "60%"],
  ["6–24 hours before service", "50%", "50%"],
  ["Less than 6 hours before service", "80%", "20%"],
  ["No-show or service already commenced", "100%", "No refund"],
];

function PolicyPage({ blocks }: { blocks: string[] }) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-gltOrange">GoLuxTrip</p>
      <h1 className="mt-4 text-3xl font-black text-navy md:text-4xl">{blocks[0]}</h1>
      <div className="mt-8 space-y-5 text-base leading-8 text-asphalt">
        {blocks.slice(1).map((block, index) => {
          if (block.startsWith("Cancellation Time")) {
            return (
              <div key={index} className="overflow-x-auto rounded-lg border border-line" tabIndex={0} role="region" aria-label="Cancellation fees and refunds">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <caption className="sr-only">Standard cancellation policy</caption>
                  <thead className="bg-navy text-white"><tr>{["Cancellation Time", "Cancellation Fee", "Refund"].map(label => <th key={label} scope="col" className="px-4 py-3">{label}</th>)}</tr></thead>
                  <tbody>{cancellationRows.map(row => <tr key={row[0]} className="border-t border-line">{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="px-4 py-3 font-medium">{cell}</th> : <td key={i} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
          }
          if (block.trim().startsWith("•")) {
            return <ul key={index} className="list-disc space-y-2 pl-6">{block.split("•").filter(item => item.trim()).map((item, i) => <li key={i}>{item.replace(/\s+/g, " ").trim()}</li>)}</ul>;
          }
          if (/^\d+\. [A-Z]/.test(block) && !block.includes("\n")) {
            return <h2 key={index} className="pt-5 text-xl font-bold text-navy">{block}</h2>;
          }
          return <p key={index} className="whitespace-pre-line">{block}</p>;
        })}
      </div>
    </article>
  );
}

export function PrivacyPolicy() { return <PolicyPage blocks={policies.privacy} />; }
export function TermsAndConditions() { return <PolicyPage blocks={policies.terms} />; }
export function CancellationRefundPolicy() { return <PolicyPage blocks={policies.cancellation} />; }
