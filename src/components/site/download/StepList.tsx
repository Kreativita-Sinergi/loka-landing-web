import type { ReactNode } from 'react';

/** Daftar langkah bernomor (lingkaran tint + teks), dipakai di kartu cara pasang. */
export function StepList({ steps }: { steps: { title?: string; detail: ReactNode }[] }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tint text-[13px] font-bold text-brand">{i + 1}</span>
          <div className="flex flex-col gap-1 pt-0.5">
            {s.title && <p className="text-[15px] font-semibold text-ink">{s.title}</p>}
            <p className={s.title ? 'text-sm leading-relaxed text-body' : 'text-[15px] leading-relaxed text-ink'}>{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Kartu bergaris tipis untuk halaman unduhan. */
export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 md:rounded-[18px] md:p-8 ${className}`}>{children}</div>;
}
