import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { routes } from '@/shared/config';
import Header from '@/widgets/Header';
import MainLayout from '@/widgets/MainLayout';
export function App() {
  return (
    <Routes>
      <Route element={<MainLayout header={<Header />} />}>
        <Route path={routes.dashboard} element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
