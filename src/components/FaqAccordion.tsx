import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../lib/cn';

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-ink/10 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              className="group flex w-full items-start gap-4 py-6 text-left ring-focus sm:gap-6 sm:py-7"
            >
              <span className="mt-1 w-7 shrink-0 font-sans text-[10px] tracking-[0.18em] text-aqua-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'flex-1 font-serif text-[15px] leading-relaxed tracking-[0.01em] transition-colors duration-300 sm:text-[17px]',
                  isOpen ? 'text-ink' : 'text-ink/80 group-hover:text-ink',
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                  isOpen
                    ? 'rotate-45 border-aqua-deep bg-aqua-deep text-white'
                    : 'border-ink/15 text-ink/50 group-hover:border-aqua-deep group-hover:text-aqua-deep',
                )}
              >
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62rem] pb-8 pl-11 pr-10 text-[13.5px] leading-[2.05] text-ink/65 sm:pl-[3.25rem]">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
