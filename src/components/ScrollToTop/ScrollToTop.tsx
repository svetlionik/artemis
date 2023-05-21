import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { IScrollToTop } from 'components/types';

export default function ScrollToTop({ children }: IScrollToTop) {
  const { pathname } = useLocation();
  const appContainer = document.getElementById('app') as HTMLDivElement | null;

  useEffect(() => {
    appContainer?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname, appContainer]);

  return <Fragment>{children}</Fragment>;
}
