import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/dashboard';
export function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello world</div>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
