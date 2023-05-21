import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import { Header, Drawer, Footer } from 'components/index';

import { SIZE_SCREEN } from 'shared/constants/constants';

export default function Layout({ children }: { children: React.ReactElement }) {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const location = useLocation();

  const { pathname } = location;

  window.addEventListener('resize', () => {
    setCurrentWidth(window.innerWidth);
  });

  if (pathname.includes('/login') || pathname.includes('/anonymous/')) {
    return (
      <Container fluid className="mx-0 my-0 p-0">
        {children}
      </Container>
    );
  } else {
    return (
      <Container fluid className="mx-0 my-0 p-0">
        {currentWidth > SIZE_SCREEN ? <Header /> : <Drawer />}
        {children}
        <Footer />
      </Container>
    );
  }
}
