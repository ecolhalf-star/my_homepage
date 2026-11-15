import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Footer from '../components/Footer';
import { Reveal, RevealItem, RevealStagger, SplitChars } from '../components/Reveal';
import { Emphasize, PillLink, Quote, SectionHead } from '../components/ui';
import ChinaWaterMap from '../components/ChinaWaterMap';
import WaterUseChart from '../components/WaterUseChart';
import { categories, definition, distribution, hero, sourceTypes } from '../data/content';
import { cn } from '../lib/cn';
import { useIsMobile } from '../lib/useIsMobile';

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.13]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const isMobile = useIsMobile();

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={isMobile ? undefined : { y, scale }} className="absolute inset-0 -z-0">
        <img
          src="images/hero-water.jpg"
          alt="一滴水落入水面，泛起层层涟漪"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_38%,transparent_0%,rgba(6,19,31,0.55)_100%)]" />

      <div className="container-page relative z-10 flex min-h-[100svh] flex-col justify-between pb-10 pt-32 sm:pb-14">
        <motion.div style={{ opacity: fade }} className="flex items-center gap-4">
          <span className="eyebrow">{hero.kicker}</span>
        </motion.div>

        <div className="max-w-[900px] pb-6">
          <h1 className="font-serif text-[clamp(2.7rem,7.4vw,6.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-white">
            <span className="block overflow-hidden">
              <SplitChars text="用水也需要" delay={0.25} />
            </span>
            <span className="block overflow-hidden pl-[0.06em]">
              <SplitChars text="收税？" delay={0.55} className="text-aqua" />
            </span>
          </h1>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-[15px] tracking-[0.2em] text-white/85">{hero.brand}</span>
            <span className="h-3 w-px bg-white/25" />
            <span className="text-[10px] tracking-[0.12em] text-white/40">{hero.copyright}</span>
          </div>

          <div className="hidden flex-col items-center gap-3 sm:flex" aria-hidden="true">
            <span className="text-[9px] tracking-[0.3em] text-white/40">向下滚动</span>
            <span className="relative h-14 w-px overflow-hidden bg-white/15">
              <motion.span
                className="absolute left-0 top-0 h-5 w-px bg-aqua"
                animate={reduce ? undefined : { y: [-20, 56] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <ArrowDown className="h-3 w-3 text-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DefinitionSection() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(51,197,188,0.16),transparent_65%)]" />
      <div className="container-page relative">
        <div className="mx-auto max-w-[54rem]">
          <Reveal>
            <div
              aria-hidden="true"
              className="select-none font-serif text-[5.5rem] leading-[0.55] text-aqua-deep/60"
            >
              “
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-3 font-serif text-[clamp(1.25rem,1.8vw,1.55rem)] font-light leading-[1.95] tracking-[-0.005em] text-ink/90">
              {definition.text}
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10">
            <div className="flex items-start gap-5 border-t border-ink/10 pt-6">
              <span className="mt-[0.75em] h-px w-10 shrink-0 bg-aqua-deep/60" />
              <p className="max-w-[42rem] text-[14px] leading-[2] tracking-[0.01em] text-ink/55">
                {definition.source}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHead
              title={
                <>
                  水<span className="text-aqua">资源</span>分类
                </>
              }
            />
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-14">
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 md:overflow-hidden md:pb-0">
            {categories.items.map((item, i) => (
              <button
                key={item.no}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`${item.no} ${item.name}`}
                className={cn(
                  'group relative h-[54vh] min-h-[340px] w-[64vw] shrink-0 snap-start overflow-hidden rounded-[20px] transition-[flex] duration-700 ease-smooth ring-focus sm:w-[46vw] md:h-[430px] md:w-auto md:shrink',
                  active === i ? 'md:flex-[1.75]' : 'md:flex-[1]',
                )}
              >
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/25 transition-opacity duration-700 group-hover:from-ink/70" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
                  <span className="flex flex-col items-start gap-3">
                    <span className="font-serif text-[2.4rem] font-light leading-none text-white/40 transition-colors duration-500 group-hover:text-aqua md:text-[3rem]">
                      {item.no}
                    </span>
                    <span className="whitespace-nowrap font-serif text-[13px] tracking-[0.06em] text-white md:text-[14px]">{item.name}</span>
                  </span>
                  <span className="mb-1 h-px w-8 bg-aqua/60 transition-all duration-500 group-hover:w-12" />
                </span>
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-aqua transition-transform duration-700 group-hover:scale-x-100" />
              </button>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

function SourceSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <img src="images/wave-bg.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <SectionHead title="三类水源" />
        </Reveal>

        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3">
          {sourceTypes.cards.map((card) => (
            <RevealItem key={card.no}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.06] transition-all duration-700 ease-smooth hover:-translate-y-1 hover:border-aqua/35">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.title}景观`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20" />
                  <div className="absolute left-6 top-5 flex items-center gap-3">
                    <span className="font-serif text-[11px] tracking-[0.24em] text-white/60">{card.no}</span>
                    <span className="h-px w-6 bg-aqua/50" />
                  </div>
                  <h3 className="absolute bottom-5 left-6 font-serif text-[1.45rem] font-normal tracking-[0.04em] text-white">
                    {card.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="whitespace-pre-line text-[13.5px] leading-[2] text-white/65">{card.text}</p>
                  <span className="mt-auto block pt-8">
                    <span className="block h-px w-8 bg-aqua/30 transition-all duration-700 group-hover:w-14" />
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function DistributionSection() {
  return (
    <section className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHead tone="light" title="水资源分布现状" />
        </Reveal>

        <div className="mt-20 space-y-24 sm:space-y-28">
          {distribution.blocks.map((block, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={block.caption}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={cn('min-w-0', reversed && 'lg:order-2')}>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-serif text-[2.6rem] font-light leading-none text-ink/15">
                      0{i + 1}
                    </span>
                    <span className="h-px w-10 bg-ink/15" />
                  </div>
                  <p className="body-text-dark max-w-[34rem]">
                    <Emphasize tone="light" text={block.text} />
                  </p>
                </Reveal>
                <Reveal delay={0.12} className={cn('min-w-0', reversed && 'lg:order-1')}>
                  {i === 1 ? (
                    <WaterUseChart caption={block.caption} />
                  ) : (
                    <ChinaWaterMap caption={block.caption} />
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', reduce ? '-8%' : '8%']);
  const isMobile = useIsMobile();

  return (
    <section ref={ref} className="relative flex min-h-[64svh] items-center overflow-hidden py-20 sm:py-24">
      <motion.div style={isMobile ? undefined : { y }} className="absolute inset-0">
        <img src="images/hero-water.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_30%,rgba(123,242,226,0.1),transparent_70%)]" />

      <div className="container-page relative z-10">
        <Reveal>
          <Quote>
            <p className="max-w-[46rem] font-serif text-[clamp(1.35rem,2.7vw,2.15rem)] font-light leading-[1.8] text-white/90">
              <Emphasize
                text={distribution.conclusion[0]}
                marks={['人均占有量为2400立方米']}
              />
            </p>
            <p className="mt-8 max-w-[42rem] text-[15px] leading-[2] text-white/55">{distribution.conclusion[1]}</p>
          </Quote>
        </Reveal>

        <Reveal delay={0.15} className="mt-16 flex flex-wrap items-center gap-6">
          <PillLink to="/fee-tax">下一页</PillLink>
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">02 — 费与税</span>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <DefinitionSection />
      <CategoryStrip />
      <SourceSection />
      <DistributionSection />
      <ClosingSection />
      <Footer />
    </>
  );
}
