import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const matches = value.toString().match(/^(\d+)(.*)$/);
    if (!matches) {
      setCount(value);
      return;
    }

    const targetNumber = parseInt(matches[1], 10);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTimestamp = null;
          const duration = 1500; // 1.5 seconds animation

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function: easeOutQuad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * targetNumber);
            
            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(targetNumber);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [value]);

  const matches = value.toString().match(/^(\d+)(.*)$/);
  const suffix = matches ? matches[2] : '';

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}
