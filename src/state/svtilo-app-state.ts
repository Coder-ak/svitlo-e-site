import { Signal, signal } from '@preact/signals';
import { SvitloData } from '../interfaces/svitlo-data';
import { SvitloAppState } from '../interfaces/svitlo-app-state';

function createAppState(): Signal<SvitloAppState> {
  const initialData: SvitloData = {
    timestamp: null,
    light: null,
    nextState: null,
  };

  const state = signal<SvitloAppState>({
    data: initialData,
    loading: false,
    error: null,
  });

  return state;
}

export const State = createAppState();
