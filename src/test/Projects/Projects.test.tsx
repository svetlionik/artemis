import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Projects from '../../boxes/Projects/Projects';
import ProjectCard from 'boxes/Projects/ProjectCard';

import mockStore from 'test/mockStore';

describe('Testing projects page', () => {
  let unlockProjects = jest.fn();
  it('Page renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Projects />
        </Router>
      </Provider>,
    );

    unlockProjects();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We are proud to share with you a small sample of our projects. But first, you have to finish your Sкill matrix form.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Back to Skill Matrix')).toBeInTheDocument();

    userEvent.click(screen.getByText('Back to Skill Matrix'));

    expect(global.location.pathname).toBe('/skills');
  });

  it('Page renders successfully - Test', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <ProjectCard />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Match Skills')).toBeInTheDocument();
    expect(screen.getByText('Missmatch Skills')).toBeInTheDocument();
    expect(screen.getByText('Project Description')).toBeInTheDocument();
    expect(screen.getByText('Project Technologies')).toBeInTheDocument();
    expect(screen.getByText('Next Project')).toBeInTheDocument();

    userEvent.click(screen.getByText('Next Project'));
  });
});
