import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Headphones, Plus } from 'lucide-react';
import Footer from '../components/Footer';
import FaqAccordion from '../components/FaqAccordion';
import FeeTable from '../components/FeeTable';
import PriceChart from '../components/PriceChart';
import Timeline from '../components/Timeline';
import { Reveal, RevealItem, RevealStagger, SplitChars } from '../components/Reveal';
import { Emphasize, SectionHead } from '../components/ui';
import {
  benefits,
  changes,
  faq,
  feeIntro,
  feeToTax,
  ending,
  priceTrend,
  site,
  timeline,
  transitionLine,
  understand,
} from '../data/content';
import { cn } from '../lib/cn';

function PageHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.1]);

  return (
    <section ref={ref} className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden pb-16 pt-36">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src="images/ocean-top.jpg" alt="黄昏海面上的涌浪" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_20%,rgba(123,242,226,0.08),transparent_70%)]" />

      <div className="container-page relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-[46rem]">
            <h1 className="font-serif text-[clamp(2.8rem,6.6vw,5.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
              <span className="block overflow-hidden">
                <SplitChars text="费与税" delay={0.2} />
              </span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-[13px] leading-[2] text-white/60">{feeIntro.lead}</p>
          </div>

          <Link
            to="/echo"
            className="group mb-2 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-[12px] tracking-[0.08em] text-white backdrop-blur-md transition-all duration-500 ease-smooth hover:border-aqua hover:bg-aqua hover:text-ink"
          >
            <Headphones className="h-4 w-4" />
            {feeIntro.listen}
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeeClassSection() {
  return (
    <section className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHead
            tone="light"
            title={
              <>
                水<span className="text-aqua-deep">费</span>分类
              </>
            }
          />
        </Reveal>
        <Reveal delay={0.12} className="mt-14">
          <FeeTable />
        </Reveal>
      </div>
    </section>
  );
}

function PriceSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <img
          src="images/city-up.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <SectionHead title="水价变化趋势" />
        </Reveal>

        <div className="mt-14">
          <Reveal className="min-w-0">
            <div className="glass rounded-[26px] p-5 sm:p-8">
              <PriceChart series={priceTrend.series} unit={priceTrend.unit} />
            </div>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {priceTrend.paragraph.map((p, i) => (
              <RevealItem key={i}>
                <div className="border-t border-white/10 pt-6">
                  <p className={i === 0 ? 'text-[14px] leading-[2.1] text-white/75' : 'text-[13px] leading-[2.1] text-white/55'}>
                    <Emphasize text={p} marks={i === 0 ? ['上升态势'] : i === 1 ? ['调控市场供求矛盾'] : []} />
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

function FeeToTaxSection() {
  return (
    <section className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(51,197,188,0.12),transparent_65%)]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHead
            tone="light"
            title={
              <>
                为什么要费转<span className="text-aqua-deep">税</span>？
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-serif text-[17px] font-light leading-[2.05] text-ink/85">
              <Emphasize tone="light" text={feeToTax.paragraph[0]} marks={['刻不容缓']} quiet />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-[17px] font-light leading-[2.05] text-ink/65">
              <Emphasize tone="light" text={feeToTax.paragraph[1]} marks={['税收法定', '多税共治', '多策组合']} />
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-16">
          <div className="card-light relative overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-aqua to-aqua-deep/40" />
            <p className="max-w-[52rem] text-[15px] leading-[2.1] text-ink/75 sm:text-[16px]">
              <Emphasize tone="light" text={feeToTax.policy} />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <img src="images/wave-bg.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <p className="mx-auto max-w-[52rem] text-center font-serif text-[clamp(1.9rem,4vw,3.3rem)] font-light leading-[1.4] text-white">
            {transitionLine}
          </p>
        </Reveal>

        <div className="mt-20">
          <Timeline items={timeline.items} />
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_10%,rgba(123,242,226,0.1),transparent_65%)]" />

      <div className="container-page relative">
        <Reveal>
          <SectionHead title="政策利好" />
        </Reveal>

        <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[26px] border border-white/10">
              <img
                src="images/city-up.jpg"
                alt="从城市高楼间仰望天空"
                className="h-[560px] w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
              {benefits.items.map((item, i) => {
                const pos = [
                  { left: '26%', top: '28%' },
                  { left: '64%', top: '52%' },
                  { left: '38%', top: '76%' },
                ][i];
                return (
                  <button
                    key={item.id}
                    type="button"
                    style={pos}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={item.title}
                    aria-pressed={active === i}
                    className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ring-focus"
                  >
                    <span
                      className={cn(
                        'absolute inset-0 rounded-full border transition-all duration-500',
                        active === i ? 'border-aqua bg-aqua/20' : 'border-white/40 bg-ink/30',
                      )}
                    />
                    {active === i ? (
                      <span className="absolute inset-0 animate-ripple rounded-full border border-aqua/50" />
                    ) : null}
                    <span
                      className={cn(
                        'relative flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-medium transition-colors duration-500',
                        active === i ? 'bg-aqua text-ink' : 'bg-white/80 text-ink',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
              <span className="absolute bottom-5 right-5 text-right text-[10px] tracking-[0.14em] text-white/60">{benefits.hint}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass flex h-full min-h-[420px] flex-col justify-between rounded-[26px] p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={benefits.items[active].id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-serif text-[11px] tracking-[0.24em] text-aqua/70">
                    {String(active + 1).padStart(2, '0')} / 03
                  </span>
                  <h3 className="mt-5 font-serif text-[1.5rem] font-normal leading-snug text-white">
                    {benefits.items[active].title}
                  </h3>
                  <p className="mt-6 max-h-[320px] overflow-y-auto pr-2 text-[13px] leading-[2.05] text-white/65">
                    {benefits.items[active].text}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex items-center justify-end border-t border-white/10 pt-5">
                <span className="flex gap-1.5">
                  {benefits.items.map((item, i) => (
                    <span
                      key={item.id}
                      className={cn(
                        'h-1 rounded-full transition-all duration-500',
                        active === i ? 'w-5 bg-aqua' : 'w-1.5 bg-white/25',
                      )}
                    />
                  ))}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 space-y-3 lg:hidden">
          {benefits.items.map((item, i) => {
            const open = openMobile === i;
            return (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <button
                  type="button"
                  onClick={() => setOpenMobile(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                >
                  <span className="text-[10px] tracking-[0.2em] text-aqua/70">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 font-serif text-[15px] leading-snug text-white">{item.title}</span>
                  <Plus className={cn('h-4 w-4 shrink-0 text-white/40 transition-transform duration-300', open && 'rotate-45 text-aqua')} />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 pl-[3.4rem] text-[12.5px] leading-[2] text-white/60">{item.text}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function UnderstandingSection() {
  return (
    <section className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="container-page">
        <Reveal>
          <p className="font-serif text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.3] text-ink">
            {understand.question}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <h3 className="max-w-[40rem] font-serif text-[clamp(1.2rem,2.1vw,1.6rem)] font-light leading-relaxed text-ink/85">
            {understand.principlesTitle}
          </h3>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {understand.principles.map((item, i) => (
            <RevealItem key={item.h}>
              <div className="group border-t border-ink/10 py-8 transition-colors duration-500 hover:border-aqua-deep/40">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[11px] tracking-[0.2em] text-ink/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-serif text-[15px] font-medium tracking-[0.02em] text-ink">{item.h}</h4>
                </div>
                <p className="mt-4 pl-[2.2rem] text-[13.5px] leading-[2] text-ink/60">{item.p}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.08} className="mt-24">
          <h3 className="max-w-[40rem] font-serif text-[clamp(1.2rem,2.1vw,1.6rem)] font-light leading-relaxed text-ink/85">
            {understand.mainTitle}
          </h3>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 max-w-[52rem]">
          <p className="font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] font-light leading-[1.95] text-ink/85">
            {understand.mainLead[0]}
          </p>
          <p className="body-text-dark mt-5">{understand.mainLead[1]}</p>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {understand.mainItems.map((item, i) => (
            <RevealItem key={item.h}>
              <div className="group border-t border-ink/10 py-8 transition-colors duration-500 hover:border-aqua-deep/40">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[11px] tracking-[0.2em] text-ink/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-serif text-[15px] font-medium tracking-[0.02em] text-ink">{item.h}</h4>
                </div>
                <p className="mt-4 pl-[2.2rem] text-[13.5px] leading-[2] text-ink/60">{item.p}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function ChangesSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <img src="images/wave-bg.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <p className="mx-auto max-w-[46rem] text-center font-serif text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.4] text-white text-balance">
            {changes.question}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <div className="glass rounded-[28px] p-7 sm:p-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
              {changes.lead.map((p) => (
                <p key={p} className="text-[13px] leading-[2.05] text-white/65">
                  {p}
                </p>
              ))}
            </div>

            <div className="my-10 hairline" />

            <h3 className="max-w-[52rem] font-serif text-[clamp(1.15rem,2vw,1.5rem)] font-light leading-relaxed text-white text-balance">
              {changes.title}
            </h3>

            <div className="mt-8 grid gap-x-12 gap-y-0 md:grid-cols-2">
              {changes.items.map((item, i) => (
                <div key={item.h} className="border-t border-white/10 py-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-[10px] tracking-[0.2em] text-aqua/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-serif text-[14px] font-medium text-white/90">{item.h}</h4>
                  </div>
                  <p className="mt-3 pl-[1.8rem] text-[12.5px] leading-[2] text-white/55">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHead
              tone="light"
              title={faq.question}
            />
          </Reveal>
          <Reveal delay={0.1} className="pb-2 text-[11px] tracking-[0.14em] text-ink/50">
            {faq.hint}
          </Reveal>
        </div>
        <Reveal delay={0.08} className="mt-12">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </div>
    </section>
  );
}

function EndingSection() {
  return (
    <section className="relative flex min-h-[48svh] items-center overflow-hidden py-20">
      <div className="absolute inset-0">
        <img src="images/ripple.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-ink/75" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(123,242,226,0.12),transparent_70%)]" />

      <div className="container-page relative z-10 text-center">
        <Reveal>
          <p className="mx-auto max-w-[46rem] font-serif text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.5] text-white">
            {ending.line}
          </p>
        </Reveal>
        <div className="mt-12 flex items-center justify-center gap-3 text-[10px] tracking-[0.12em] text-white/35">
          <span className="font-serif text-[13px] tracking-[0.18em] text-white/70">{site.title}</span>
          <span className="h-3 w-px bg-white/20" />
          <span>{site.copyright}</span>
        </div>
      </div>
    </section>
  );
}

export default function FeeTax() {
  return (
    <>
      <PageHero />
      <FeeClassSection />
      <PriceSection />
      <FeeToTaxSection />
      <TimelineSection />
      <BenefitsSection />
      <UnderstandingSection />
      <ChangesSection />
      <FaqSection />
      <EndingSection />
      <Footer />
    </>
  );
}
