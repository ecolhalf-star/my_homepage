import { useState } from 'react';
import { feeTable } from '../data/content';
import { cn } from '../lib/cn';

export default function FeeTable() {
  const rows = feeTable.rows;
  const [col, setCol] = useState<number | null>(null);

  return (
    <>
      <div className="hidden overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-[0_40px_100px_-60px_rgba(6,19,31,0.55)] lg:block">
        <div className="h-[3px] w-full bg-gradient-to-r from-aqua-deep via-aqua to-aqua-deep/20" />
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="bg-gradient-to-r from-ink via-[#0A1F30] to-[#0D2739]">
              <th className="w-[140px] px-7 py-6 align-middle">
                <span className="font-sans text-[14.5px] font-semibold tracking-[0.03em] text-aqua">分类</span>
              </th>
              {feeTable.columns.map((name, i) => (
                <th
                  key={name}
                  onMouseEnter={() => setCol(i)}
                  className={cn(
                    'border-l border-white/[0.08] px-4 py-6 align-middle transition-colors duration-500',
                    col === i && 'bg-white/[0.06]',
                  )}
                >
                  <span className="block font-sans text-[10px] font-medium tracking-[0.24em] text-aqua/55">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-2.5 block text-[14.5px] font-semibold leading-snug tracking-[0.03em] text-white">
                    {name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, ri) => (
              <tr
                key={row.label}
                className={cn(
                  'border-t border-ink/[0.08] transition-colors duration-500',
                  ri === 1 && 'bg-ink/[0.018]',
                )}
              >
                <th scope="row" className="px-7 py-8 text-left align-middle">
                  <span className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-deep/70" />
                    <span className="font-sans text-[14.5px] font-semibold tracking-[0.03em] text-aqua-deep">
                      {row.label}
                    </span>
                  </span>
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={`${row.label}-${i}`}
                    onMouseEnter={() => setCol(i)}
                    className={cn(
                      'border-l border-ink/[0.07] px-4 py-8 align-middle text-[13px] leading-[1.85] text-ink/75 transition-colors duration-500',
                      col === i && 'bg-aqua-deep/[0.055] text-ink/90',
                    )}
                  >
                    {value ? value : <span aria-hidden="true" className="block h-px w-6 bg-ink/15" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3.5 lg:hidden">
        {feeTable.columns.map((name, i) => (
          <div
            key={name}
            className="relative overflow-hidden rounded-[20px] border border-ink/10 bg-white/70 p-5 shadow-[0_18px_50px_-45px_rgba(6,19,31,0.4)]"
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-aqua to-transparent" />
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[10px] tracking-[0.16em] text-ink/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-[16px] font-semibold tracking-[0.02em] text-ink">{name}</h3>
              </div>
              <span className="h-1 w-1 rounded-full bg-aqua-deep/60" />
            </div>
            <dl className="mt-4 space-y-3 text-[12.5px] leading-relaxed">
              {rows.slice(1).map((row) => {
                const value = row.values[i];
                if (!value) return null;
                return (
                  <div key={row.label} className="grid grid-cols-[64px_1fr] gap-3">
                    <dt className="text-ink/40">{row.label}</dt>
                    <dd className="text-ink/75">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
