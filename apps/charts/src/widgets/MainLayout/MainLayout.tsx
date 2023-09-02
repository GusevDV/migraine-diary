import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export type LayoutProps = {
  header?: ReactNode;
};
const MainLayout = ({ header }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      {header}
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
