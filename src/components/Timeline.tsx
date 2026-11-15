import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal } from './Reveal';

type Item = { date: string; year: string; text: string };

export default function Timeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <div ref={ref}>
      {/* desktop */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-[149px] h-px bg-white/15" />
        <motion.div
          style={{ scaleX }}
          className="absolute left-0 right-0 top-[149px] h-px origin-left bg-gradient-to-r from-aqua/30 via-aqua to-aqua"
        />
        <div className="grid grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={`${item.date}-${item.year}`} className="group relative pt-[172px]">
              <div className="absolute left-0 top-0">
                <div className="font-serif text-[2.1rem] font-light leading-none tracking-[0.02em] text-white">
                  {item.date}
                </div>
                <div className="mt-2 font-sans text-[10px] tracking-[0.24em] text-aqua/70">{item.year}</div>
              </div>
              <span className="absolute left-0 top-[145px] flex h-[9px] w-[9px] items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-aqua/60 bg-ink" />
                <span className="h-[3px] w-[3px] rounded-full bg-aqua opacity-60 transition-all duration-500 group-hover:opacity-100" />
              </span>
              <p className="text-[12px] leading-[1.95] text-white/55 transition-colors duration-500 group-hover:text-white/80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* mobile */}
      <div className="relative lg:hidden">
        <div className="absolute bottom-4 left-[4px] top-2 w-px bg-white/15" />
        {items.map((item, i) => (
          <Reveal key={`${item.date}-${item.year}`} delay={i * 0.04} className="relative pb-9 pl-8">
            <span className="absolute left-0 top-[9px] h-[9px] w-[9px] rounded-full border border-aqua/60 bg-ink">
              <span className="absolute inset-[2px] rounded-full bg-aqua/70" />
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[1.7rem] font-light text-white">{item.date}</span>
              <span className="text-[10px] tracking-[0.22em] text-aqua/70">{item.year}</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.95] text-white/60">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
