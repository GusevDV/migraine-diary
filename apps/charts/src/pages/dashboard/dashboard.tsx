import { v1 } from '@/shared/api';
const Dashboard = () => {
  const { data } = v1.useImport('64e255aae5f9503d82028dbf');
  return (
    <div>
      <h1>Dashboard</h1>
      {data?.records.map((record: any, index: number) => (
        <div key={index}>Мигрень: {record.headache ? 'Да' : 'Нет'}</div>
      ))}
    </div>
  );
};

export default Dashboard;
