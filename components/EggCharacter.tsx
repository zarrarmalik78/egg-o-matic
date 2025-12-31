import React from 'react';
import { EggType } from '../types.ts';

interface EggCharacterProps {
  type: EggType;
  isShaking?: boolean;
}

const EggCharacter: React.FC<EggCharacterProps> = ({ type, isShaking }) => {
  const getAnimationClass = () => {
    if (isShaking) return 'animate-jitter';
    switch (type) {
      case EggType.SOFT: return 'animate-jitter opacity-90'; // Constant slight nerves
      case EggType.JAMMY: return 'animate-float';
      case EggType.HARD: return 'animate-pulse-slow';
      case EggType.CUSTOM: return 'animate-float opacity-90';
      default: return '';
    }
  };

  return (
    <div className={`w-32 h-40 relative ${getAnimationClass()}`}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
        <defs>
          <linearGradient id="grad-soft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#bae6fd', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-jammy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#fef08a', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-hard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#166534', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-custom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Main Egg Body */}
        <path
          d="M50 5 C 20 5, 5 40, 5 75 C 5 110, 25 118, 50 118 C 75 118, 95 110, 95 75 C 95 40, 80 5, 50 5 Z"
          fill={
            type === EggType.SOFT ? "url(#grad-soft)" : 
            type === EggType.JAMMY ? "url(#grad-jammy)" : 
            type === EggType.HARD ? "url(#grad-hard)" :
            "url(#grad-custom)"
          }
          stroke="black"
          strokeWidth="6"
        />

        {/* Character Logic */}
        {type === EggType.SOFT && (
          <g>
            <g className="animate-pulse">
              <circle cx="35" cy="70" r="6" fill="white" stroke="black" strokeWidth="2" />
              <circle cx="35" cy="70" r="2" fill="black" />
              <circle cx="65" cy="70" r="6" fill="white" stroke="black" strokeWidth="2" />
              <circle cx="65" cy="70" r="2" fill="black" />
            </g>
            <path d="M40 90 Q 50 82, 60 90 Q 70 98, 80 90" fill="none" stroke="black" strokeWidth="3" />
            <path d="M78 50 Q 80 45, 82 50 Q 82 55, 80 55 Q 78 55, 78 50" fill="#0ea5e9" stroke="black" strokeWidth="1" />
            <path d="M22 45 Q 24 40, 26 45 Q 26 50, 24 50 Q 22 50, 22 45" fill="#0ea5e9" stroke="black" strokeWidth="1" />
          </g>
        )}

        {type === EggType.JAMMY && (
          <g>
            <path d="M20 65 L 45 65 L 45 78 L 20 78 Z" fill="black" />
            <path d="M55 65 L 80 65 L 80 78 L 55 78 Z" fill="black" />
            <path d="M45 68 L 55 68" stroke="black" strokeWidth="4" />
            <path d="M40 95 Q 60 100, 70 90" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <circle cx="72" cy="68" r="2" fill="white" />
          </g>
        )}

        {type === EggType.HARD && (
          <g>
            <path d="M25 60 L 45 68" stroke="black" strokeWidth="5" strokeLinecap="round" />
            <path d="M75 60 L 55 68" stroke="black" strokeWidth="5" strokeLinecap="round" />
            <circle cx="38" cy="78" r="4" fill="black" />
            <circle cx="62" cy="78" r="4" fill="black" />
            <path d="M15 50 L 85 50" stroke="black" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M40 100 L 60 100" stroke="black" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {type === EggType.CUSTOM && (
          <g>
            {/* Question Mark Mystery Egg */}
            <text x="50" y="85" textAnchor="middle" className="game-font" style={{ fontSize: '48px', fill: 'black' }}>?</text>
            <path d="M35 100 Q 50 105, 65 100" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
            {/* Mysterious swirls */}
            <path d="M20 40 Q 30 30, 40 40" fill="none" stroke="black" strokeWidth="2" opacity="0.4" />
            <path d="M60 40 Q 70 50, 80 40" fill="none" stroke="black" strokeWidth="2" opacity="0.4" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default EggCharacter;