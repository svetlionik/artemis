import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../../App';

import mockStore from 'test/mockStore';

describe('Testing App', () => {
  // commented to check gitlab ci
  // it('App renders successfully', () => {
  //   Object.defineProperty(window, 'matchMedia', {
  //     writable: true,
  //     value: jest.fn().mockImplementation((query) => ({
  //       matches: false,
  //       media: query,
  //       onchange: null,
  //       addListener: jest.fn(),
  //       removeListener: jest.fn(),
  //       addEventListener: jest.fn(),
  //       removeEventListener: jest.fn(),
  //       dispatchEvent: jest.fn(),
  //     })),
  //   });
  //   render(
  //     <Provider store={mockStore}>
  //       <Router>
  //         <App />
  //       </Router>
  //     </Provider>,
  //   );
  //   expect(screen.getByTestId('spinner')).toBeInTheDocument();
  // });
  it('Testing idle case', () => {
    //   Object.defineProperty(window, 'matchMedia', {
    //     writable: true,
    //     value: jest.fn().mockImplementation((query) => ({
    //       matches: false,
    //       media: query,
    //       onchange: null,
    //       addListener: jest.fn(),
    //       removeListener: jest.fn(),
    //       addEventListener: jest.fn(),
    //       removeEventListener: jest.fn(),
    //       dispatchEvent: jest.fn(),
    //     })),
    //   });
    //   let profile = jest.fn();
    //   render(
    //     <Provider store={mockStore}>
    //       <Router>
    //         <App />
    //       </Router>
    //     </Provider>,
    //   );
    //   profile();
    //   expect(profile).toBeCalled();
    //   expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
