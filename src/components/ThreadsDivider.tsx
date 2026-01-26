import React from 'react';
import Threads from './Threads';

export function ThreadsDivider() {
  return (
    <div className="relative w-full h-48 overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Threads
          color={[0.1, 0.22, 0.58]} // Pacific Navy #003893
          amplitude={3.1}
          distance={0.6}
          enableMouseInteraction={true}
        />
      </div>
    </div>
  );
}