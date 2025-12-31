
import { EggType, EggConfig } from './types';

export interface EnhancedEggConfig extends EggConfig {
  gradient: string;
  themeColor: string;
  secondaryColor: string;
  darkColor: string;
  quotes: {
    idle: string[];
    running: string[];
    finished: string[];
  };
}

export const EGG_CONFIGS: Record<EggType, EnhancedEggConfig> = {
  [EggType.SOFT]: {
    id: EggType.SOFT,
    name: "The Softie",
    time: 180,
    color: "#38bdf8",
    bgColor: "#ffffff",
    themeColor: "#0ea5e9", // Sky Blue
    secondaryColor: "#7dd3fc",
    darkColor: "#075985",
    gradient: "linear-gradient(135deg, #7dd3fc 0%, #0ea5e9 100%)",
    description: "Anxious & Runny!",
    quotes: {
      idle: ["P-please be careful...", "Is it getting hot?", "I'm not ready!"],
      running: ["I'M MELTING!", "DON'T PANIC!", "TOO HOT!!"],
      finished: ["I'm... I'm a mess.", "Done? Phew.", "Soft as a cloud!"]
    }
  },
  [EggType.JAMMY]: {
    id: EggType.JAMMY,
    name: "The Jammy",
    time: 360,
    color: "#facc15",
    bgColor: "#ffffff",
    themeColor: "#f59e0b", // Amber
    secondaryColor: "#fbbf24",
    darkColor: "#92400e",
    gradient: "linear-gradient(135deg, #fef08a 0%, #f59e0b 100%)",
    description: "Cool & Gooey.",
    quotes: {
      idle: ["Keep it chill, man.", "Ready when you are.", "Stay golden."],
      running: ["Just vibing in here.", "Perfect temp.", "Feeling gooey."],
      finished: ["Solid gold.", "Perfectly jammy.", "Bon appetit, friend."]
    }
  },
  [EggType.HARD]: {
    id: EggType.HARD,
    name: "The Hard Case",
    time: 540,
    color: "#4ade80",
    bgColor: "#ffffff",
    themeColor: "#15803d", // Green
    secondaryColor: "#4ade80",
    darkColor: "#14532d",
    gradient: "linear-gradient(135deg, #86efac 0%, #15803d 100%)",
    description: "Built Like Steel.",
    quotes: {
      idle: ["Reporting for duty!", "Let's cook, soldier!", "I can take the heat."],
      running: ["STAY VIGILANT!", "HEAT IS TEMPORARY!", "NOT A CRACK!"],
      finished: ["MISSION COMPLETE.", "SOLID AS A ROCK.", "IRON EGG READY."]
    }
  },
  [EggType.CUSTOM]: {
    id: EggType.CUSTOM,
    name: "The Wildcard",
    time: 300, // Default 5 mins
    color: "#a855f7", // Purple
    bgColor: "#ffffff",
    themeColor: "#7e22ce",
    secondaryColor: "#c084fc",
    darkColor: "#581c87",
    gradient: "linear-gradient(135deg, #c084fc 0%, #7e22ce 100%)",
    description: "Rules? What rules?",
    quotes: {
      idle: ["How long we talkin'?", "Set the dial!", "I'm ready for anything."],
      running: ["Doing it MY way.", "Custom cookin'!", "Tick tock, buddy."],
      finished: ["Exactly as planned.", "Perfect timing!", "Customized to perfection."]
    }
  }
};
