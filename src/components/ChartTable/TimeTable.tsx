import { useEffect, useState } from 'preact/hooks';
import {
  format,
  setHours,
  isWithinInterval,
  roundToNearestMinutes,
  addMinutes,
  endOfHour,
  parse,
  setMinutes,
  startOfDay,
  addDays,
  compareDesc,
  parseISO,
} from 'date-fns';
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
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH + '?days=62');
        const data = await response.json();

        if (!(data instanceof Array)) {
          throw new Error('Data is not an array');
        }

        const intervals = createIntervals(data);
        const chartData = createChart(intervals);
        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
      // skip intervals where light is ON
      if (item.light) return;

      // Walk through all days between start and end (inclusive)
      let day = startOfDay(item.startTime);
      const lastDay = startOfDay(item.endTime);

      while (day.getTime() <= lastDay.getTime()) {
        const dayKey = format(day, 'yyyy-MM-dd');

        if (!groupedData[dayKey]) {
          groupedData[dayKey] = [];
        }

        groupedData[dayKey].push(item);

        day = addDays(day, 1);
      }
    });

    return Object.keys(groupedData)
      .sort((a, b) => compareDesc(parseISO(a), parseISO(b)))
      .reduce(
        (acc, key) => {
          acc[key] = groupedData[key];
          return acc;
        },
        {} as Record<string, IntervalData[]>
      );
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

              // Parse the row’s date from the key, e.g. 'Mon, 15/12'
              const currentDay = parseISO(dayKey);
              const label = format(currentDay, 'EEE, dd/MM');

              return (
                <tr key={dayKey}>
                  <td>{label}</td>
                  {[...Array(24)].map((_, hour) => {
                    // Build a timestamp for THIS day at `hour:01`
                    const currentHour = setHours(setMinutes(currentDay, 1), hour);

                    const isLightOff = dayData.some((item) => {
                      return (
                        !item.light &&
                        isWithinInterval(currentHour, {
                          start: item.startTime,
                          end: item.endTime,
                        })
                      );
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
