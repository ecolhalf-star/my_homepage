import { useEffect, useState } from 'react';

/** 判断是否为窄屏（默认 < 768px），用于在移动端关闭高开销的视差效果 */
export function useIsMobile(query = '(max-width: 767px)') {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
