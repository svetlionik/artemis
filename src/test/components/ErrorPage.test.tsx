import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ErrorPage } from 'boxes/ErrorPage';

import mockStore from 'test/mockStore';

describe('Testing Error Page component', () => {
  const badRoute = '/asdadadasdasd';
  it('Testing error 404', () => {
    console.log(window.location.pathname);
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[badRoute]}>
          <ErrorPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('whoops...')).toBeInTheDocument();
    expect(
      screen.getByText(/Looks like we can't find the page you're looking for./),
    ).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });

  it('Testing go back from 404 Page', () => {
    console.log(window.location.pathname);
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[badRoute]}>
          <ErrorPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('whoops...')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();

    userEvent.click(screen.getByText('Go back'));
  });

  it('Testing error on Server down', () => {
    let barRoute = '/error-page';
    console.log(window.location.pathname);
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[barRoute]}>
          <ErrorPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('whoops...')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Looks like we are experiencing some problems, please try again later./,
      ),
    ).toBeInTheDocument();
  });
});
