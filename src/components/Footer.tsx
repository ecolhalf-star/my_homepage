import { Link } from 'react-router-dom';
import { nav, site } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pt-14">
      <div className="container-page relative z-10">
        <div className="grid gap-10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="font-serif text-2xl tracking-[0.16em] text-white">
              {site.title}
            </Link>
            <p className="mt-4 max-w-[16rem] text-[12px] leading-relaxed tracking-[0.08em] text-white/40">
              {site.subtitle}
            </p>
          </div>
          <nav className="flex flex-col gap-3" aria-label="页脚导航">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex w-fit items-baseline gap-3 text-[12px] tracking-[0.1em] text-white/55 transition-colors duration-300 hover:text-aqua"
              >
                <span className="text-[9px] tracking-[0.2em] text-white/25">{item.index}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col justify-between gap-4 md:items-end">
            <span className="text-[10px] tracking-[0.12em] text-white/40">{site.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
