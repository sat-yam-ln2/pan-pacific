import React from 'react';

export function VerticalBadge() {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center gap-4 pt-[90px] pr-[0px] pb-[0px] pl-[0px] mt-[320px] mr-[0px] mb-[0px] ml-[0px]">
        <div className="w-px h-24 bg-[#003893] opacity-20" />
        <div className="writing-mode-vertical-rl rotate-180">
          <span className="text-[11px] tracking-[0.3em] text-[#003893] opacity-60 uppercase font-mono">
            EST. 2011
          </span>
        </div>
        <div className="w-px h-24 bg-[#003893] opacity-20" />
      </div>
    </div>
  );
}