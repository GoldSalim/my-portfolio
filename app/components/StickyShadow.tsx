'use client';
import { useEffect, useRef, useState, ElementType, ReactNode, CSSProperties } from 'react';

interface StickyShadowProps {
  color?: string;
  shadowType?: 'box' | 'text';
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}

/**
 * Wraps any element (image, heading, text block). The item scrolls normally
 * (no position:sticky) — a small, tight, color-matched shadow switches ON
 * for the single instant the item's top edge is exactly at the top of the
 * viewport (y = 0), and OFF again as soon as it moves past. The trigger
 * band is 1px tall, so only the item(s) genuinely crossing that line light
 * up — not everything near the top.
 *
 * Usage:
 *   <StickyShadow color="#1821c9" shadowType="box">...</StickyShadow>
 *   <StickyShadow as="h3" color="#1821c9" shadowType="text">TITLE</StickyShadow>
 */
export default function StickyShadow({
  color = '#1821c9',
  shadowType = 'box',
  as: Tag = 'div',
  className = '',
  style = {},
  children,
  ...rest
}: StickyShadowProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver;

    const build = () => {
      if (observer) observer.disconnect();
      // Collapse the effective viewport down to a hairline strip: just the
      // top 1px. Only an element whose box actually touches that exact
      // line counts as "at the top" — nothing wider than that.
      const bottomMargin = window.innerHeight - 1;
      observer = new IntersectionObserver(
        ([entry]) => setIsAtTop(entry.isIntersecting),
        { root: null, rootMargin: `0px 0px -${bottomMargin}px 0px`, threshold: 0 }
      );
      observer.observe(el);
    };

    build();
    window.addEventListener('resize', build);
    return () => {
      window.removeEventListener('resize', build);
      if (observer) observer.disconnect();
    };
  }, []);

  // Small, tight shadow — a clean accent, not a glow that washes into
  // neighboring elements. Short blur radius, no spread, subtle offset.
  const shadowStyle: CSSProperties =
    shadowType === 'text'
      ? { textShadow: isAtTop ? `0px 3px 10px ${color}` : 'none' }
      : { boxShadow: isAtTop ? `0 4px 14px ${color}` : 'none' };

  return (
    <Tag
      ref={ref}
      className={`transition-shadow duration-300 ${className}`}
      style={{ ...shadowStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
