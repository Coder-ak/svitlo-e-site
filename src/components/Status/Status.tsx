import './status.less';
import { Utils } from '../../utils/utils';
import { State } from '../../state/svtilo-app-state';

export const Status = () => {
  const { data, error } = State.value;

  if (error || data.timestamp == null) {
    return;
  }

  const { timestamp, light } = data;

  const supDate = !Utils.isToday(timestamp) && <sup>({Utils.formatDate(timestamp, 'd/MM')})</sup>;
  const textFull = (
    <>
      З {Utils.formatDate(timestamp, 'H:mm')} {supDate} {Utils.getStatus(light)}
    </>
  );

  return <span class="status">{textFull}</span>;
};
