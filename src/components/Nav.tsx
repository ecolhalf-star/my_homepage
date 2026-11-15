import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, site } from '../data/content';
import { cn } from '../lib/cn';

function DropMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5c3.4 4.6 5.5 7.5 5.5 10.2A5.5 5.5 0 0 1 12 18.2a5.5 5.5 0 0 1-5.5-5.5C6.5 10 8.6 7.1 12 2.5Z"
        fill="currentColor"
      />
      <path d="M4 20.5c2.6 1.2 5.3 1.2 8 0s5.4-1.2 8 0" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-aqua focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        跳到主要内容
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-smooth',
          scrolled || open ? 'border-b border-white/10 bg-ink/95' : 'border-b border-transparent',
        )}
      >
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-aqua/40 via-aqua to-aqua-deep/70"
        />
        <div className="container-page flex h-[74px] items-center justify-between gap-6">
          <Link to="/" className="group flex items-center gap-2.5 ring-focus" aria-label={`${site.title} 首页`}>
            <DropMark className="h-5 w-5 text-aqua transition-transform duration-700 ease-smooth group-hover:-translate-y-0.5" />
            <span className="font-serif text-[19px] tracking-[0.16em] text-white">{site.title}</span>
            <span className="mt-1 hidden text-[9px] uppercase tracking-[0.24em] text-white/35 sm:inline">2024</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="页面导航">
            {nav.map((item) => {
              const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'group flex items-baseline gap-2 text-[12px] tracking-[0.12em] transition-colors duration-500 ring-focus',
                    active ? 'text-white' : 'text-white/50 hover:text-white',
                  )}
                >
                  <span className={cn('font-sans text-[9px] tracking-[0.2em]', active ? 'text-aqua' : 'text-white/30')}>
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      'ml-1 h-1 w-1 rounded-full bg-aqua transition-all duration-500',
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40',
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-aqua/60 hover:text-aqua md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? '关闭菜单' : '打开菜单'}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            <div className="container-page flex h-full flex-col justify-between pb-10 pt-32">
              <nav className="flex flex-col" aria-label="移动端导航">
                {nav.map((item, i) => {
                  const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/10 py-7"
                    >
                      <Link to={item.to} className="flex items-baseline justify-between gap-4">
                        <span className="font-serif text-[2rem] font-light text-white">
                          {item.label}
                        </span>
                        <span className={cn('text-[10px] tracking-[0.25em]', active ? 'text-aqua' : 'text-white/40')}>
                          {item.index}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="flex items-end justify-between text-[10px] tracking-[0.2em] text-white/35">
                <span>{site.copyright}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
