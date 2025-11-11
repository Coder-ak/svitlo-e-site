import { SvitloData } from './svitlo-data';

export interface SvitloAppState {
  data: SvitloData;
  loading: boolean;
  error?: string;
  scheduleImg?: boolean;
}
