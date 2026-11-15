import { useEffect, useId, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

type Point = { year: string; value: number };

const STEP = 70;
const GROW = 800;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
const trim = (v: number) => String(Math.round(v * 100) / 100);

export default function PriceChart({ series, unit }: { series: Point[]; unit: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [t, setT] = useState(0);
  const uid = useId().replace(/:/g, '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) setShown(true);
        else if (e.intersectionRatio === 0) setShown(false);
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const total = GROW + (series.length - 1) * STEP;

  useEffect(() => {
    if (!shown) {
      setT(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = clamp01((now - start) / total);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, total]);

  const localProgress = (i: number) => clamp01((t * total - i * STEP) / GROW);

  const W = 1000;
  const H = 400;
  const padX = 42;
  const baseline = 336;
  const top = 62;
  const min = 2.5;
  const max = 3.4;
  const stepX = (W - padX * 2) / (series.length - 1);
  const xOf = (i: number) => padX + i * stepX;
  const yOf = (v: number) => baseline - ((v - min) / (max - min)) * (baseline - top);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">{unit}</span>
        <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
          2010 — 2019
          <ChevronsLeftRight className="h-3.5 w-3.5 text-aqua/60 lg:hidden" />
        </span>
      </div>
      <div className="relative">
        <div className="-mx-2 overflow-x-auto px-2 pb-2">
          <div className="min-w-[660px]">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="2010 至 2019 年全国水价变化趋势">
          <defs>
            <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6C9BE0" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#5FD8D3" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7BF2E2" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8AB4EE" />
              <stop offset="100%" stopColor="#7BF2E2" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((g) => (
            <line
              key={g}
              x1={padX}
              x2={W - padX}
              y1={top + ((baseline - top) / 3) * g}
              y2={top + ((baseline - top) / 3) * g}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 8"
            />
          ))}

          <line x1={padX} x2={W - padX} y1={baseline} y2={baseline} stroke="rgba(255,255,255,0.2)" />

          {series.map((p, i) => {
            const x = xOf(i);
            const tip = yOf(p.value);
            const half = stepX * 0.56;
            const ctrl = Math.min(baseline - 4, tip + (baseline - tip) * 0.82);
            const d = `M ${x - half} ${baseline} C ${x - half * 0.45} ${baseline} ${x - 7} ${ctrl} ${x} ${tip} C ${x + 7} ${ctrl} ${x + half * 0.45} ${baseline} ${x + half} ${baseline} Z`;
            const active = hover === i;
            const lp = localProgress(i);
            const tipNow = yOf(p.value * easeOut(lp));

            return (
              <g
                key={p.year}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                role="img"
                aria-label={`${p.year} 年 ${p.value} 元每立方米`}
                className="cursor-default outline-none"
              >
                <path
                  d={d}
                  fill={`url(#${uid}-fill)`}
                  stroke={`url(#${uid}-stroke)`}
                  strokeWidth={active ? 2 : 1}
                  fillOpacity={active ? 1 : hover === null ? 0.92 : 0.5}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'bottom',
                    transform: `scaleY(${easeOut(lp).toFixed(4)})`,
                  }}
                />
                <circle
                  cx={x}
                  cy={tipNow}
                  r={active ? 4.5 : 3}
                  fill={active ? '#7BF2E2' : '#CFEDEA'}
                  opacity={lp > 0.88 ? 0.9 : 0}
                  style={{ transition: 'opacity 0.25s ease' }}
                />
                <text
                  x={x}
                  y={tipNow - 16}
                  textAnchor="middle"
                  fill={active ? '#7BF2E2' : 'rgba(255,255,255,0.82)'}
                  fontSize="19"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  opacity={lp > 0.86 ? 1 : 0}
                  style={{ transition: 'opacity 0.3s ease' }}
                >
                  {trim(p.value)}
                </text>
                <text
                  x={x}
                  y={baseline + 34}
                  textAnchor="middle"
                  fill={active ? 'rgba(123,242,226,0.95)' : 'rgba(255,255,255,0.42)'}
                  fontSize="19"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="1"
                >
                  {p.year}
                </text>
                <rect x={x - stepX / 2} y={top - 30} width={stepX} height={baseline - top + 60} fill="transparent" />
              </g>
            );
          })}
        </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
