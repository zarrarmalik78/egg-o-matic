
export enum EggType {
  SOFT = 'soft',
  JAMMY = 'jammy',
  HARD = 'hard',
  CUSTOM = 'custom'
}

export interface EggConfig {
  id: EggType;
  name: string;
  time: number; // in seconds
  color: string;
  bgColor: string;
  description: string;
}

export type TimerStatus = 'idle' | 'running' | 'finished';
