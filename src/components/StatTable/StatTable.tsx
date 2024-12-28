import { useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { Utils } from '../../utils/utils';
import './StatTable.less';

export const StatTable = () => {
  const tableData = useSignal([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH + '?limit=10');
        tableData.value = await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div class="stats-wrapper">
      <div class="stats">
        <div class="stats-header row">
          <div class="icon">&nbsp;</div>
          <div class="time">Час вкл/викл</div>
          <div class="diff">Тривалість</div>
        </div>
        <div id="stats">
          {tableData.value.slice(0, -1).map((item, index) => (
            <div class={`row ${Utils.getState(item.light)}`}>
              <img src={`assets/lamp_${Utils.getState(item.light)}.svg`} title={item.light ? 'Увімкнено' : 'Вимкнено'} class="icon" />
              <div class="time">{Utils.formatDate(item.timestamp, 'EEE, dd MMM, HH:mm')}</div>
              <div class={`diff ${Utils.getState(!item.light)}`}>
                {Utils.formatDuration(tableData.value[index + 1]?.timestamp || item.timestamp, item.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
