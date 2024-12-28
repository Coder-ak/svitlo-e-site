import { useEffect, useState } from 'preact/hooks';
import { format, setHours, isWithinInterval, roundToNearestMinutes, addMinutes, endOfHour, parse, setMinutes } from 'date-fns';
import { SvitloData } from '../../interfaces/svitlo-data';
import './TimeTable.less';

interface IntervalData {
  startTime: Date;
  endTime: Date;
  light: boolean;
}

export const TimeTable = () => {
  const [groupedData, setData] = useState<Record<string, IntervalData[]>>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH + '?limit=88');
      const data = await response.json();

      const intervals = createIntervals(data);
      const chartData = createChart(intervals);
      setData(chartData);
    };
    fetchData();
  }, []);

  const createIntervals = (data: SvitloData[]): IntervalData[] => {
    const intervals: IntervalData[] = [];

    // Sort data by timestamp in ascending order
    data.sort((a, b) => a.timestamp - b.timestamp);

    for (let i = 0; i < data.length; i++) {
      const current = data[i];
      const startTime = new Date(current.timestamp);
      const endTime = i < data.length - 1 ? new Date(data[i + 1].timestamp) : endOfHour(new Date());

      intervals.push({
        startTime: addMinutes(roundToNearestMinutes(startTime, { nearestTo: 20 }), 1),
        endTime: addMinutes(roundToNearestMinutes(endTime, { nearestTo: 20 }), -1),
        light: current.light,
      });
    }

    return intervals.reverse();
  };

  const createChart = (data: IntervalData[]): Record<string, IntervalData[]> => {
    const groupedData: Record<string, IntervalData[]> = {};
    data.forEach((item) => {
      const dayKey = format(item.startTime, 'EEE, dd/MM');
      const dataKeyEnd = format(item.endTime, 'EEE, dd/MM');
      if (!groupedData[dayKey]) {
        groupedData[dayKey] = [];
      }

      if (dataKeyEnd !== dayKey) {
        if (!groupedData[dataKeyEnd]) {
          groupedData[dataKeyEnd] = [];
        }
        groupedData[dataKeyEnd].push(item);
      }

      groupedData[dayKey].push(item);
    });

    return Object.keys(groupedData)
      .sort((a, b) => {
        const dateA = parse(a, 'EEE, dd/MM', new Date());
        const dateB = parse(b, 'EEE, dd/MM', new Date());
        return dateB.getTime() - dateA.getTime();
      })
      .reduce((acc, key) => {
        acc[key] = groupedData[key];
        return acc;
      }, {});
  };

  return (
    <div class="time-table">
      <table id="chart">
        <thead>
          <tr>
            <th></th>
            {[...Array(24)].map((_, i) => (
              <th key={i}>{i}</th>
            ))}
            <th>Σ</th>
          </tr>
        </thead>
        <tbody>
          {groupedData != null &&
            Object.keys(groupedData).map((dayKey) => {
              const dayData = groupedData[dayKey];
              let totalFalseHours = 0;

              return (
                <tr key={dayKey}>
                  <td>{dayKey}</td>
                  {[...Array(24)].map((_, hour) => {
                    const currentHour = setHours(setMinutes(dayData[0].startTime, 1), hour);

                    const isLightOff = dayData.some((item) => {
                      return isWithinInterval(currentHour, { start: item.startTime, end: item.endTime }) && !item.light;
                    });

                    if (isLightOff) {
                      totalFalseHours++;
                    }

                    return <td key={hour} className={isLightOff ? 'filled' : ''}></td>;
                  })}
                  <td>{totalFalseHours}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
