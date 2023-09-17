import { Container } from '@chakra-ui/react';
import { ReactNode, PropsWithChildren } from 'react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export type MainLayoutProps = {
  header?: ReactNode | null;
  footer?: React.ReactNode | null;
};

const MainLayout = ({ header }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      {header ?? null}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
