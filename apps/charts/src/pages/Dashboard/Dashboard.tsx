import { ResponsiveCalendar } from '@nivo/calendar';
import * as dayjs from 'dayjs';
import { v1 } from '@/shared/api';

const Dashboard = () => {
  const { data, isSuccess } = v1.useImport('64e255aae5f9503d82028dbf');

  const dataCalendar = data?.records
    .sort((a: any, b: any) => a.timestamp - b.timestamp)
    .map((record: any) => ({
      day: dayjs(record.timestamp).format('YYYY-MM-DD'),
      value: record.headache ? 1 : 0,
    }))
    .filter((record: any) => dayjs(record.day).isValid());

  return (
    <div>
      {isSuccess && (
        <div style={{ height: '800px', width: '1300px' }}>
          <ResponsiveCalendar
            data={dataCalendar}
            from={dataCalendar?.[1].day}
            to={dataCalendar?.[dataCalendar.length - 1].day}
            emptyColor="#eeeeee"
            colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
