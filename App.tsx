import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { EggType, TimerStatus } from './types.ts';
import { EGG_CONFIGS, EnhancedEggConfig } from './constants.ts';
import EggCharacter from './components/EggCharacter.tsx';
import CrackOverlay from './components/CrackOverlay.tsx';
import { Play, Pause, RotateCcw, Volume2, ShieldCheck, Zap, Ghost, Trophy, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedEgg, setSelectedEgg] = useState<EggType>(EggType.SOFT);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(EGG_CONFIGS[EggType.SOFT].time);
  const [showCrack, setShowCrack] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // Custom time state
  const [customMin, setCustomMin] = useState(5);
  const [customSec, setCustomSec] = useState(0);

  const timerRef = useRef<number | null>(null);

  const config = EGG_CONFIGS[selectedEgg];

  const currentQuote = useMemo(() => {
    const list = config.quotes[status === 'idle' ? 'idle' : status === 'running' ? 'running' : 'finished'];
    return list[quoteIndex % list.length];
  }, [config, status, quoteIndex]);

  // Update quote periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const playAlert = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.6);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.6);
    } catch (e) { console.warn(e); }
  }, []);

  const handleStart = () => {
    if (status === 'finished') {
        if (selectedEgg === EggType.CUSTOM) {
            setTimeLeft(customMin * 60 + customSec);
        } else {
            setTimeLeft(config.time);
        }
    }
    setStatus('running');
  };

  const handlePause = () => setStatus('idle');

  const handleReset = () => {
    setStatus('idle');
    if (selectedEgg === EggType.CUSTOM) {
        setTimeLeft(customMin * 60 + customSec);
    } else {
        setTimeLeft(config.time);
    }
  };

  const handleEggSelect = (type: EggType) => {
    if (status === 'running') return;
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 250);
    setSelectedEgg(type);
    
    if (type === EggType.CUSTOM) {
        setTimeLeft(customMin * 60 + customSec);
    } else {
        setTimeLeft(EGG_CONFIGS[type].time);
    }
    setStatus('idle');
  };

  // Sync timeLeft when custom inputs change
  useEffect(() => {
    if (selectedEgg === EggType.CUSTOM && status === 'idle') {
        setTimeLeft(customMin * 60 + customSec);
    }
  }, [customMin, customSec, selectedEgg, status]);

  useEffect(() => {
    if (status === 'running') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setStatus('finished');
            setShowCrack(true);
            playAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, playAlert]);

  // Broken down timer for individual digit animations
  const renderTimerDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const s1 = Math.floor(seconds / 10);
    const s2 = seconds % 10;

    return (
      <div className="impact-font text-8xl md:text-[11rem] leading-none text-black select-none tabular-nums timer-text mb-12 drop-shadow-lg z-10 flex items-center justify-center">
        {/* Minutes */}
        <span 
          key={`min-${minutes}`} 
          className={status === 'running' ? 'animate-minute-thud' : ''}
        >
          {minutes}
        </span>
        
        {/* Separator */}
        <span className="mx-2">:</span>
        
        {/* Tens of seconds */}
        <span 
          key={`s1-${s1}`} 
          className={status === 'running' ? 'animate-digit-pop' : ''}
        >
          {s1}
        </span>
        
        {/* Units of seconds */}
        <span 
          key={`s2-${s2}`} 
          className={status === 'running' ? 'animate-digit-pop' : ''}
        >
          {s2}
        </span>
      </div>
    );
  };

  const totalTime = selectedEgg === EggType.CUSTOM ? (customMin * 60 + customSec) : config.time;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 transition-colors duration-700" 
         style={{ backgroundColor: config.darkColor }}>
      
      {/* App Header */}
      <header className="mb-10 text-center relative z-10">
        <h1 className="game-font text-6xl md:text-8xl text-yellow-400 header-text uppercase leading-none tracking-tight">
          EGG-O-MATIC
        </h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="bg-red-600 neobrutalist-button px-3 py-1 rotate-2">
            <span className="game-font text-xl text-white">BATTLE TIMER</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Fighter Selection (High Contrast) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="game-font text-white text-3xl mb-2 text-comic-shadow uppercase">Select Your Fighter</h2>
          {(Object.keys(EGG_CONFIGS) as EggType[]).map((type) => {
            const egg = EGG_CONFIGS[type];
            const isSelected = selectedEgg === type;
            return (
              <button
                key={type}
                onClick={() => handleEggSelect(type)}
                disabled={status === 'running'}
                className={`neobrutalist-card p-4 flex items-center gap-4 relative overflow-hidden group
                  ${isSelected ? 'bg-white translate-x-3' : 'bg-gray-200 opacity-80 hover:bg-white hover:opacity-100'}
                  ${status === 'running' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                `}
              >
                {isSelected && isFlashing && <div className="flash-overlay do-flash"></div>}
                
                <div className="w-16 h-16 flex-shrink-0 group-hover:rotate-6 transition-transform">
                  <EggCharacter type={type} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="game-font text-2xl uppercase text-black leading-none">{egg.name}</h3>
                  <p className="marker-font text-xs text-gray-700 uppercase">{egg.description}</p>
                </div>
                {isSelected && (
                   <div className="bg-black text-yellow-400 px-2 py-1 neobrutalist-button -rotate-12">
                     {type === EggType.CUSTOM ? <Settings2 className="w-5 h-5" /> : <Zap className="w-5 h-5 fill-current" />}
                   </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Combat Stage */}
        <div className="lg:col-span-8">
          <div className="neobrutalist-card bg-white p-8 md:p-12 relative overflow-hidden flex flex-col items-center min-h-[580px]">
            {/* Stage Spotlight */}
            <div className="absolute inset-0 pointer-events-none opacity-20" 
                 style={{ background: `radial-gradient(circle, ${config.themeColor} 0%, transparent 70%)` }}></div>
            
            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-6 py-4 z-20">
               <div className="bg-black text-white px-4 py-1 neobrutalist-button game-font text-xl uppercase italic">
                 {status === 'running' ? 'COOKING...' : status === 'finished' ? 'READY!' : 'READY TO RUMBLE'}
               </div>
               <div className="bg-yellow-400 text-black px-4 py-1 neobrutalist-button game-font text-xl uppercase">
                 STAGE: KITCHEN
               </div>
            </div>

            {/* Fighter & Bubble */}
            <div className="mt-16 mb-6 flex flex-col items-center">
              <div className="speech-bubble mb-6 min-w-[140px] max-w-[200px] text-center animate-bounce">
                <p className="marker-font text-black text-sm uppercase leading-tight">
                  {currentQuote}
                </p>
              </div>
              <div className="scale-125 md:scale-150 transform hover:scale-[1.6] transition-transform duration-500">
                <EggCharacter type={selectedEgg} isShaking={status === 'running'} />
              </div>
            </div>

            {/* Custom Time Inputs (Visible when idle and in CUSTOM mode) */}
            {selectedEgg === EggType.CUSTOM && status === 'idle' ? (
                <div className="flex items-center gap-4 mb-8 z-10 animate-pop-in">
                    <div className="flex flex-col items-center">
                        <label className="game-font text-black text-xl uppercase">Min</label>
                        <input 
                            type="number" 
                            min="0" 
                            max="99"
                            value={customMin} 
                            onChange={(e) => setCustomMin(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-24 text-center game-font text-6xl neobrutalist-button bg-yellow-300 border-4 border-black p-2 focus:outline-none focus:ring-4 ring-purple-400"
                        />
                    </div>
                    <div className="game-font text-7xl mt-6 text-black">:</div>
                    <div className="flex flex-col items-center">
                        <label className="game-font text-black text-xl uppercase">Sec</label>
                        <input 
                            type="number" 
                            min="0" 
                            max="59"
                            value={customSec} 
                            onChange={(e) => setCustomSec(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-24 text-center game-font text-6xl neobrutalist-button bg-yellow-300 border-4 border-black p-2 focus:outline-none focus:ring-4 ring-purple-400"
                        />
                    </div>
                </div>
            ) : (
                renderTimerDisplay()
            )}

            {/* Controls */}
            <div className="flex gap-4 w-full relative z-10 max-w-md mt-auto">
              {status !== 'running' ? (
                <button
                  onClick={handleStart}
                  className="flex-1 neobrutalist-button bg-green-500 py-5 game-font text-4xl text-black hover:bg-green-400 flex items-center justify-center gap-3"
                >
                  <Play className="w-10 h-10 fill-current" /> START
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex-1 neobrutalist-button bg-orange-500 py-5 game-font text-4xl text-black hover:bg-orange-400 flex items-center justify-center gap-3"
                >
                  <Pause className="w-10 h-10 fill-current" /> PAUSE
                </button>
              )}

              <button
                onClick={handleReset}
                className="w-24 neobrutalist-button bg-red-600 flex items-center justify-center hover:bg-red-500"
              >
                <RotateCcw className="w-10 h-10 text-white" />
              </button>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gray-900 border-t-4 border-black">
              <div 
                className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-12 w-full max-w-6xl flex justify-between items-end px-4">
        <div className="flex flex-col gap-3">
          <div className="bg-white neobrutalist-button px-6 py-2 rotate-[-1deg] flex items-center gap-3">
            <Volume2 className="w-6 h-6 text-black" />
            <span className="game-font text-2xl text-black uppercase">SYSTEM: ACTIVE</span>
          </div>
          <p className="marker-font text-white opacity-60 text-lg uppercase">Indie-Game Edition v4.1</p>
        </div>
        
        <div className="neobrutalist-card bg-yellow-400 p-4 rotate-3 max-w-xs hidden md:block">
           <p className="game-font text-black text-2xl leading-none uppercase">
             PRO TIP: <br/> 
             <span className="text-lg">Don't crack the {selectedEgg}!</span>
           </p>
        </div>
      </footer>

      {showCrack && (
        <CrackOverlay 
          onClose={() => { 
            setShowCrack(false); 
            handleReset(); 
          }} 
        />
      )}
    </div>
  );
};

export default App;