import { ReactNode } from "react";

export function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-gltOrange">{kicker}</p>
      <h2 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-asphalt whitespace-pre-line">{text}</p>}
    </div>
  );
}

export function InfoRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gltOrange">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-black text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm font-semibold text-gltOrange">{error}</span>}
    </label>
  );
}
