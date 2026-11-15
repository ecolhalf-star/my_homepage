import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { SplitChars } from '../components/Reveal';
import { ending, site } from '../data/content';
import { cn } from '../lib/cn';

const BARS = Array.from({ length: 56 }, (_, i) => {
  const wave = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 1.7) * 0.25 + Math.sin(i * 0.21) * 0.25;
  return 22 + Math.abs(wave) * 62;
});

function format(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const RING = 2 * Math.PI * 31;

export default function Echo() {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => {
      setCurrent(audio.currentTime || 0);
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    };
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  };

  const seek = (e: MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = fraction * audio.duration;
    setProgress(fraction);
    setCurrent(fraction * audio.duration);
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-32">
      <div className="absolute inset-0">
        <img src="images/hero-water.jpg" alt="水面上荡漾的涟漪" className="h-full w-full animate-drift object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_0%,rgba(6,19,31,0.82)_100%)]" />
      </div>

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-[720px]">
          <h1 className="text-center font-serif text-[clamp(2.6rem,6vw,4.4rem)] font-light leading-none tracking-[0.06em] text-white">
            <SplitChars text="听文字" delay={0.15} />
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-white/25 shadow-[0_40px_110px_-50px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-ink/35" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/16 via-transparent to-ink/35" />
              <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(255,255,255,0.16),transparent_58%)]" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3 text-[10px] tracking-[0.26em] text-white/60">
                    <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
                      {[6, 11, 8, 14, 10, 5].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-[2px] rounded-full bg-aqua/80"
                          animate={reduce || !playing ? { height: h } : { height: [h, h * 1.8, h] }}
                          transition={{ duration: 1.1 + i * 0.16, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                          style={{ height: h }}
                        />
                      ))}
                    </span>
                    朗读音频
                  </span>
                </div>

                <div className="mt-7 flex items-center gap-5 sm:gap-7">
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? '暂停' : '播放'}
                    className="group relative h-[74px] w-[74px] shrink-0 rounded-full transition-transform duration-500 ease-smooth hover:scale-[1.04]"
                  >
                    <svg viewBox="0 0 74 74" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                      <circle cx="37" cy="37" r="31" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                      <circle
                        cx="37"
                        cy="37"
                        r="31"
                        fill="none"
                        stroke="#7BF2E2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={RING}
                        strokeDashoffset={RING * (1 - progress)}
                        style={{ transition: 'stroke-dashoffset 0.2s linear' }}
                      />
                    </svg>
                    <span className="absolute inset-[9px] flex items-center justify-center rounded-full bg-aqua text-ink shadow-[0_10px_30px_-12px_rgba(123,242,226,0.9)]">
                      {playing ? (
                        <Pause className="h-5 w-5" fill="currentColor" />
                      ) : (
                        <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                      )}
                    </span>
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-serif text-[18px] font-normal tracking-[0.03em] text-white">{ending.track}</h2>
                    </div>

                    <button
                      type="button"
                      onClick={seek}
                      aria-label="调整播放进度"
                      className="group relative mt-4 block h-14 w-full cursor-pointer"
                    >
                      <span className="absolute inset-0 flex items-center gap-[3px]" aria-hidden="true">
                        {BARS.map((h, i) => {
                          const passed = i / BARS.length <= progress;
                          return (
                            <span
                              key={i}
                              className={cn(
                                'flex-1 rounded-full transition-colors duration-300',
                                passed ? 'bg-aqua' : 'bg-white/30 group-hover:bg-white/45',
                              )}
                              style={{ height: `${h}%` }}
                            />
                          );
                        })}
                      </span>
                    </button>

                    <div className="mt-1 flex items-center justify-between font-sans text-[10px] tabular-nums tracking-[0.14em] text-white/55">
                      <span>{format(current)}</span>
                      <span>{format(duration)}</span>
                    </div>
                  </div>
                </div>

                <audio ref={audioRef} src={ending.audioFile} preload="metadata" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/fee-tax"
                className="group inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-[12px] tracking-[0.12em] text-white transition-all duration-500 ease-smooth hover:border-aqua hover:bg-aqua hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
                {ending.back}
              </Link>
              <span className="text-[10px] tracking-[0.14em] text-white/40">{site.copyright}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-white/30">
        <span>
          {site.title} — {site.subtitle}
        </span>
      </div>
    </section>
  );
}
