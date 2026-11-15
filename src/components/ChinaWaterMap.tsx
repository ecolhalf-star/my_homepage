import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { chinaProvinces, chinaViewBox } from '../data/chinaMap';
import { bucketByProvince, provinceFacts, waterBuckets } from '../data/provinceWater';

const shortName = (name: string) =>
  name.replace(/维吾尔自治区|壮族自治区|回族自治区|特别行政区|自治区|省|市/g, '');

const bucketMap = new Map(waterBuckets.map((b) => [b.key, b]));

export default function ChinaWaterMap({ caption }: { caption: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activeBucket = active ? bucketMap.get(bucketByProvince[active] ?? 'na') : null;

  return (
    <figure className="card-light overflow-hidden p-3 sm:p-5">
      <div ref={wrapRef} className="rounded-[14px] bg-white px-4 pt-5 sm:px-6 sm:pt-7">
        <div className="mb-3 flex items-center justify-between text-[9px] tracking-[0.2em] text-ink/30">
          <span>各省水资源总量</span>
          <span>2023 · 亿立方米</span>
        </div>

        <div className="relative" onMouseMove={move} onMouseLeave={() => setActive(null)}>
          <svg
            viewBox={chinaViewBox}
            className="h-auto w-full select-none"
            role="img"
            aria-label="2023 年中国各省市水资源总量分级图"
          >
            {chinaProvinces.map((p, i) => {
              const name = shortName(p.name);
              const bucket = bucketMap.get(bucketByProvince[name] ?? 'na');
              const isActive = active === name;
              return (
                <path
                  key={p.name}
                  d={p.d}
                  fill={bucket?.color ?? '#EFF3F7'}
                  stroke={isActive ? '#0B6E68' : '#FFFFFF'}
                  strokeWidth={isActive ? 1.6 : 0.55}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-[fill,stroke,opacity] duration-300"
                  style={{
                    opacity: shown ? (active && !isActive ? 0.55 : 1) : 0,
                    transitionDelay: shown ? '0ms' : `${i * 16}ms`,
                  }}
                  onMouseEnter={() => setActive(name)}
                  onFocus={() => setActive(name)}
                >
                  <title>{`${name} ${bucket?.note ?? ''}`}</title>
                </path>
              );
            })}
          </svg>

          {active && activeBucket && (
            <div
              className="pointer-events-none absolute z-10 min-w-[150px] -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-xl border border-ink/10 bg-ink/95 px-3.5 py-2.5 text-white shadow-[0_16px_40px_-18px_rgba(6,19,31,0.75)]"
              style={{ left: pos.x, top: pos.y }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: activeBucket.color }} />
                <span className="font-serif text-[13px] tracking-[0.04em]">{active}</span>
              </div>
              <p className="mt-1 text-[10.5px] leading-relaxed text-white/60">{activeBucket.note}</p>
              {provinceFacts[active] && (
                <p className="mt-1 text-[10.5px] leading-relaxed text-aqua">{provinceFacts[active]}</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-4">
          {waterBuckets.map((b) => (
            <span key={b.key} className="flex items-center gap-1.5 text-[10px] text-ink/45">
              <span className="h-2.5 w-2.5 rounded-[3px] ring-1 ring-inset ring-ink/10" style={{ background: b.color }} />
              {b.label}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="flex items-start gap-3 px-1 pb-1 pt-4 text-[11px] leading-relaxed tracking-[0.04em] text-ink/50">
        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-aqua-deep/70" />
        {caption}
      </figcaption>
    </figure>
  );
}
