import React from 'react';

export function NepalMotif() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0">
      <svg
        className="absolute top-1/4 right-1/4 w-[800px] h-[800px]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized Nepal Sun motif */}
        <circle cx="100" cy="100" r="40" fill="#FFD700" opacity="0.3" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 40;
          const y1 = 100 + Math.sin(angle) * 40;
          const x2 = 100 + Math.cos(angle) * 70;
          const y2 = 100 + Math.sin(angle) * 70;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFD700"
              strokeWidth="3"
              opacity="0.2"
            />
          );
        })}
        {/* Moon crescent */}
        <path
          d="M 100 30 Q 130 60 100 90 Q 115 60 100 30"
          fill="#003893"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}