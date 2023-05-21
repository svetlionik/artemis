import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import PromptModal from 'components/PromptModal/PromptModal';

import mockStore from 'test/mockStore';

let showPrompt;
describe('Testing Error Page component', () => {
  it('Testing error 404', () => {
    showPrompt = true;
    let onOK = jest.fn();
    let onCancel = jest.fn();
    let title = 'Leave this page';
    let okText = 'Confirm';
    let cancelText = 'Cancel';
    render(
      <Provider store={mockStore}>
        <Router>
          <PromptModal
            when={showPrompt}
            onOK={onOK}
            onCancel={onCancel}
            title={title}
            okText={okText}
            cancelText={cancelText}
          />
        </Router>
      </Provider>,
    );
    // expect(screen.getByText(/before you leave/i)).toBeInTheDocument();
  });
});
