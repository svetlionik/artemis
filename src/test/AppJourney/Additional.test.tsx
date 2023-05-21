import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import mockStore from 'test/mockStore';
import { Accommodation } from 'boxes/OfferDetails/components/Additional/Accomodation';
import { WorkingPermit } from 'boxes/OfferDetails/components/Additional/WorkingPermit';
import { Forfeit } from 'boxes/OfferDetails/components/Additional/Forfeit';

describe('Testing Benefits', () => {
  it('Page renders successfully', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Accommodation />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(
        'Finding a place to stay can be frustrating at the beginning. That is why we can accommodate you in a single room in one of our corporate apartments for the first 12 months. Should you decide to self-arrange your accommodation, we will sponsor you with 250 Euro, per month for the rest of the period.',
      ),
    ).toBeInTheDocument();
  });

  it('Page renders successfully - Test', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <WorkingPermit />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(
        'We understand that moving to another country is difficult. In order to support you in this step we will arrange your transportation to Bulgaria and cover all costs and fees regarding document preparation. All costs should be approved and coordinated with the visa department. Musala Soft will cover all expenses for the work permit and relevant documents (Blue Card/Single permit) as well as all taxes as per Bulgarian legislation. We are taking responsibility for your Blue card renewal every year and paying the expenses.',
      ),
    ).toBeInTheDocument();
  });

  it('Page renders successfully - Test 2', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Forfeit />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(
        'If you decide to leave the company while your Blue card and working contract are valid and renewed by the company, your notice period for leaving the company will be 3 months and you will be charged for the expenses made by the company for your stay in Bulgaria, which includes:',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '- Documentation for Work permit (Blue card/Single permit) Visa D, (which varies but is around 400 euros)',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '- Renewal of your Blue card every year – around 200 euros annually',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '- Costs for travel [Egypt] to Bulgaria (around 550 euros)',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '- Accommodation for the 12-month period (250 euros per month)',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We will take care of your legal documents bounded with your Blue card/Single permit.',
      ),
    ).toBeInTheDocument();
  });
});
