import { useEffect, useRef, useState } from 'react';
import { distribution } from '../data/content';
import { cn } from '../lib/cn';

export default function WaterUseChart({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const max = 12;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="card-light overflow-hidden p-3 sm:p-5">
      <div
        ref={ref}
        className="rounded-[14px] bg-white px-4 py-5 sm:px-6 sm:py-7"
        role="img"
        aria-label="2023 年中国主要省份用水总量占比排名"
      >
        <div className="mb-5 flex items-center justify-between text-[9px] tracking-[0.2em] text-ink/30">
          <span>用水总量占比</span>
          <span>2023</span>
        </div>
        <div className="space-y-3.5">
          {distribution.ranking.map((item, i) => (
            <div key={item.name} className="grid grid-cols-[56px_minmax(0,1fr)_44px] items-center gap-2.5 sm:grid-cols-[70px_minmax(0,1fr)_52px] sm:gap-3">
              <span
                className={cn(
                  'truncate text-[11.5px] tracking-[0.02em]',
                  i === 0 ? 'font-medium text-ink' : i < 3 ? 'text-ink/75' : 'text-ink/55',
                )}
              >
                {item.name}
              </span>
              <div className="relative h-[13px] overflow-hidden rounded-full bg-ink/[0.055]">
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full transition-[width] duration-[1100ms] ease-smooth',
                    i === 0
                      ? 'bg-gradient-to-r from-aqua-deep to-aqua'
                      : i < 3
                        ? 'bg-gradient-to-r from-aqua-deep/80 to-aqua/75'
                        : 'bg-gradient-to-r from-ink/20 to-aqua-deep/55',
                  )}
                  style={{
                    width: shown ? `${(item.value / max) * 100}%` : 0,
                    transitionDelay: `${i * 55}ms`,
                  }}
                />
              </div>
              <span className="text-right font-sans text-[11px] tabular-nums tracking-[0.02em] text-ink/55">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4 text-[10px] text-ink/35">
          <span className="shrink-0 tabular-nums">0%</span>
          <span className="text-center">{distribution.rankingNote}</span>
          <span className="shrink-0 tabular-nums">12%</span>
        </div>
      </div>
      <figcaption className="flex items-start gap-3 px-1 pb-1 pt-4 text-[11px] leading-relaxed tracking-[0.04em] text-ink/50">
        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-aqua-deep/70" />
        {caption}
      </figcaption>
    </figure>
  );
}
