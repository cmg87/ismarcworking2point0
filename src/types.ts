
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface MarcStatus {
  isWorking: boolean;
  message: string;
  timestamp: string;
}

export enum WorkState {
  WORKING = 'WORKING',
  CHILLING = 'CHILLING',
  BUILDING = 'BUILDING',
  COFFEE = 'COFFEE'
}
