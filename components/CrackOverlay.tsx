
import React from 'react';

interface CrackOverlayProps {
  onClose: () => void;
}

const CrackOverlay: React.FC<CrackOverlayProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div className="relative transform scale-150 animate-bounce">
        {/* Burst Background */}
        <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-96 h-96 text-yellow-400 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <path d="M50 0 L60 30 L95 20 L75 50 L100 80 L65 75 L50 100 L35 75 L0 80 L25 50 L5 20 L40 30 Z" fill="currentColor" stroke="black" strokeWidth="2" />
            </svg>
        </div>
        
        {/* Text */}
        <div className="relative comic-font text-8xl text-white italic -rotate-12 select-none" style={{ WebkitTextStroke: '4px black' }}>
          CRACK!
        </div>
      </div>
      
      <div className="absolute bottom-10 marker-font text-white text-2xl animate-pulse">
        CLICK TO RESTART
      </div>
    </div>
  );
};

export default CrackOverlay;
