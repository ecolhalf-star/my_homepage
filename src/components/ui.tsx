import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';

export function SectionHead({
  title,
  tone = 'dark',
  description,
  className,
  id,
}: {
  title: ReactNode;
  tone?: 'dark' | 'light';
  description?: ReactNode;
  className?: string;
  id?: string;
}) {
  const light = tone === 'light';
  return (
    <div id={id} className={cn('max-w-3xl', className)}>
      <h2 className={cn('h2 text-balance', light ? 'text-ink' : 'text-white')}>{title}</h2>
      {description ? (
        <div className={cn('mt-6 max-w-reading text-pretty', light ? 'body-text-dark' : 'body-text')}>{description}</div>
      ) : null}
    </div>
  );
}

export function PillLink({
  to,
  href,
  children,
  tone = 'dark',
  icon = 'arrow',
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
  icon?: 'arrow' | 'up' | 'none';
  className?: string;
}) {
  const inner = (
    <>
      <span>{children}</span>
      {icon === 'arrow' ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-smooth group-hover:translate-x-1" />
      ) : icon === 'up' ? (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );
  const styles = cn(
    'group inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[13px] font-medium tracking-[0.08em] transition-all duration-500 ease-smooth',
    tone === 'dark'
      ? 'border-white/25 text-white hover:border-aqua/70 hover:bg-aqua hover:text-ink'
      : 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
    className,
  );
  if (to) {
    return (
      <Link to={to} className={cn(styles, 'ring-focus')}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn(styles, 'ring-focus')}>
      {inner}
    </a>
  );
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function Emphasize({
  text,
  tone = 'dark',
  marks = [],
  quiet = false,
}: {
  text: string;
  tone?: 'dark' | 'light';
  marks?: string[];
  quiet?: boolean;
}) {
  const parts = [...marks].sort((a, b) => b.length - a.length).map(escapeRe);
  const pattern = new RegExp(`(${[...parts, '\\d+(?:\\.\\d+)?%?'].join('|')})`, 'g');
  const tokens = text.split(pattern).filter((t) => t !== '');
  return (
    <>
      {tokens.map((token, i) => {
        const hit = pattern.test(token);
        pattern.lastIndex = 0;
        if (!hit) return <span key={i}>{token}</span>;
        return (
          <span
            key={i}
            className={cn(
              'font-medium tabular-nums',
              tone === 'dark' ? 'text-aqua' : 'text-aqua-deep',
              quiet && 'font-normal',
            )}
          >
            {token}
          </span>
        );
      })}
    </>
  );
}

export function Quote({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <blockquote className={cn('relative pl-7 sm:pl-10', className)}>
      <span
        aria-hidden="true"
        className={cn('absolute bottom-0 left-0 top-0 w-px', tone === 'light' ? 'bg-aqua-deep/40' : 'bg-aqua/40')}
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-0 h-2 w-2 -translate-x-1/2 rounded-full',
          tone === 'light' ? 'bg-aqua-deep' : 'bg-aqua',
        )}
      />
      {children}
    </blockquote>
  );
}
