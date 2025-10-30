import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

type LottieSrc = object | string;

export default function SafeLottie({
  src,
  style,
  loop = true,
  autoplay = true,
}: {
  src: LottieSrc;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
}) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (src && typeof src === 'object') {
          setData(src);
          return;
        }
        const base = process.env.PUBLIC_URL || ''; // for CRA/public paths
        const res = await fetch(`${base}${src as string}`);
        if (!res.ok) throw new Error(`Lottie fetch failed: ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        console.error('SafeLottie error:', e);
        if (!cancelled) setData(null);
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  // Only render when JSON looks like Bodymovin
  if (!data || typeof data !== 'object' || !Array.isArray((data as any).layers)) {
    return null; // or a small placeholder/skeleton
  }

  return <Lottie animationData={data} loop={loop} autoplay={autoplay} style={style} />;
}
