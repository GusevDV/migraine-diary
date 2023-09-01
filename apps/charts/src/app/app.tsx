import { Route, Routes, Link } from 'react-router-dom';
export function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello world</div>} />
      <Route
        path="/page-2"
        element={
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
