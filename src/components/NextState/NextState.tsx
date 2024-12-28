import { FunctionalComponent } from 'preact';
import { State } from '../../state/svtilo-app-state';

export const NextState: FunctionalComponent = () => {
  const {
    data: { light, nextState, timestamp },
  } = State.value;

  if (timestamp == null) {
    return;
  }

  let message = '';

  if (light) {
    if (nextState && nextState.length > 1) {
      message = `Наступне відключення можливо о ${nextState[0]}`;
    } else {
      message = 'Відключення не заплановані';
    }
  } else {
    if (nextState && nextState.length > 0) {
      message = `Наступне включення можливо о ${nextState[0]}`;
    } else if (nextState == null) {
      message = 'Зараз немає інформації про відновлення світла';
    }
  }

  return <span class="next-state">{message}</span>;
};
