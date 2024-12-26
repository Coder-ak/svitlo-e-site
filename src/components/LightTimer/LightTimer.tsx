import { FunctionalComponent } from 'preact';
import { useComputed, useSignal } from '@preact/signals';
import { useEffect, useCallback } from 'preact/hooks';
import { Utils } from '../../utils/utils';
import { State } from '../../state/svtilo-app-state';

const LightTimer: FunctionalComponent = () => {
  const {
    data: { light, timestamp },
  } = State.value;

  const elapsedTime = useSignal(Date.now());
  const timerRef = useSignal<number | null>(null);
  const duration = useComputed(() => Utils.formatDuration(timestamp, elapsedTime.value));

  const startTimer = useCallback(() => {
    if (timerRef.value === null) {
      timerRef.value = window.setInterval(() => {
        elapsedTime.value = Date.now();
      }, 1000);
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.value !== null) {
      clearInterval(timerRef.value);
      timerRef.value = null;
    }
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  }, [startTimer, stopTimer]);

  useEffect(() => {
    // Initial timer start
    startTimer();

    // Set up visibility and focus event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', startTimer);
    window.addEventListener('blur', stopTimer);

    // Cleanup
    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', startTimer);
      window.removeEventListener('blur', stopTimer);
    };
  }, [startTimer, stopTimer, handleVisibilityChange]);

  return (
    <div>
      {light ? 'Світло є ' : 'Світла нема '}
      {duration}
    </div>
  );
};

export default LightTimer;
