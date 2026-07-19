import React from 'react';

export default function FloatingPetals() {
  const petals = Array.from({ length: 18 }).map((_, i) => {
    const left = Math.random() * 100; // random horizontal start position
    const delay = Math.random() * 12; // random start delay
    const duration = 12 + Math.random() * 18; // random speed of falling
    const size = 12 + Math.random() * 16; // random size of the petal
    const swayDuration = 3 + Math.random() * 5; // random sway duration
    const rotation = Math.random() * 360; // random initial rotation angle

    return (
      <div
        key={i}
        className="petal"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s, ${swayDuration}s`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    );
  });

  return <div className="floral-petals-container" aria-hidden="true">{petals}</div>;
}
