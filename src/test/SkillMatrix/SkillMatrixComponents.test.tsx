import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SkillGroup } from 'boxes/SkillMatrix/components/SkillGroup';
import SkillGroupItem from 'boxes/SkillMatrix/components/SkillGroupItem';
import AdditionalSection from 'boxes/SkillMatrix/components/AdditionalSection';
import Section from 'boxes/SkillMatrix/components/Section';
import Finish from 'boxes/SkillMatrix/components/Finish';
import OtherSection from 'boxes/SkillMatrix/components/OtherSection';
import SectionProgress from 'boxes/SkillMatrix/components/SectionProgress';

import mockStore from 'test/mockStore';
import userEvent from '@testing-library/user-event';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    errors: () => jest.fn(),
    register: () => jest.fn(),
  }),
  useForm: () => ({
    control: () => jest.fn(),
    register: () => jest.fn(),
  }),
  useFieldArray: () => ({
    fields: [{ id: 'asdadasdasd', key: 'First Additional Skill' }],
    append: () => jest.fn(),
    remove: () => jest.fn(),
  }),
}));

describe('Testing Components in Skill Matrix Form', () => {
  it('Skill Group renders successfully', () => {
    let updateProgressSkillGroups = jest.fn();
    let group = {
      createdAt: new Date('2022-12-19T11:00:23.3294871'),
      modifiedAt: new Date('2022-12-19T11:00:23.3294871'),
      name: 'Virtualization',
      order: 1,
      profile: 'DEVOPS',
      skills: [
        {
          name: 'VMware vSphere',
          description: 'asdasdasd',
          mdsId: 235,
          type: 'STANDARD',
          id: 'a0d540f9-b811-4b4e-a371-d7a0b116d4dd',
        },
        {
          name: 'Citrix Xen',
          description: 'asdasdasd',
          mdsId: 236,
          type: 'STANDARD',
          id: '1aa839fe-3e26-4525-bbed-63165c945b09',
        },
      ],
      skippable: false,
      possibleYears: [{ displayValue: 'asdasdasd', description: 'asdadasd' }],
    };

    render(
      <Provider store={mockStore}>
        <Router>
          <SkillGroup
            group={group}
            index={0}
            updateProgressSkillGroups={updateProgressSkillGroups}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/virtualization/i)).toBeInTheDocument();
    expect(screen.getByText(/vmware vsphere/i)).toBeInTheDocument();
  });

  it('Additional Sections renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <AdditionalSection sectionLength={0} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('First Additional Skill')).toBeInTheDocument();
  });

  it('Finish renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Finish />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(/Looks like you are done with the Skill Form./i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
  });

  it('Other Section renders successfully', () => {
    let skills = [
      {
        importantFlag: false,
        level: '2',
        name: 'First Skill',
        type: 'STANDARD',
        years: '1 to 3 years',
      },
    ];
    let possibleYears = [
      { description: 'Less than a year', displayValue: '<1' },
      { description: '1 to 3 years', displayValue: '1-3' },

      { description: 'More than 3 years', displayValue: '3+' },
    ];
    render(
      <Provider store={mockStore}>
        <Router>
          <OtherSection
            skills={skills}
            index={0}
            possibleYears={possibleYears}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('First Skill')).toBeInTheDocument();
  });

  it('Section renders successfully', () => {
    let skillsObject = {
      name: 'First Skill Group',
      skills: [
        {
          years: 'Less than a year',
          level: '0',
          name: 'Algorithms & Data Structures',
          mdsId: 1313,
          type: 'STANDARD',
        },

        {
          years: 'Less than a year',
          level: '0',
          name: 'Object Oriented Programming',
          mdsId: 1314,
          type: 'STANDARD',
        },

        {
          years: 'Less than a year',
          level: '0',
          name: 'Agile Project Management',
          mdsId: 183,
          type: 'STANDARD',
        },
      ],
    };
    let possibleYears = [
      { description: 'Less than a year', displayValue: '<1' },
      { description: '1 to 3 years', displayValue: '1-3' },

      { description: 'More than 3 years', displayValue: '3+' },
    ];
    render(
      <Provider store={mockStore}>
        <Router>
          <Section
            skills={skillsObject}
            index={0}
            possibleYears={possibleYears}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/First Skill Group/i)).toBeInTheDocument();
    expect(
      screen.getByText(`Algorithms & Data Structures`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Object Oriented Programming`)).toBeInTheDocument();
    expect(screen.getByText(`Agile Project Management`)).toBeInTheDocument();
  });

  it('Section Progress renders successfully', () => {
    let progressGroups = [
      { name: 'General', order: 1, count: 4, completed: true },

      {
        name: 'Programming Languages',
        order: 2,
        count: 4,
        completed: true,
      },
    ];
    render(
      <Provider store={mockStore}>
        <Router>
          <SectionProgress progressSkillGroups={progressGroups} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('Skill Group Item renders successfully', () => {
    let updateProgressSkillGroups = jest.fn();
    let group = {
      createdAt: new Date('2022-12-19T11:00:23.3294871'),
      modifiedAt: new Date('2022-12-19T11:00:23.3294871'),
      name: 'Virtualization',
      order: 1,
      profile: 'DEVOPS',
      skills: [
        {
          name: 'VMware vSphere',
          description: 'some description one',
          mdsId: 235,
          type: 'STANDARD',
          id: 'a0d540f9-b811-4b4e-a371-d7a0b116d4dd',
        },
        {
          name: 'Citrix Xen',
          description: 'new description',
          mdsId: 236,
          type: 'STANDARD',
          id: '1aa839fe-3e26-4525-bbed-63165c945b09',
        },
      ],
      skippable: false,
      possibleYears: [{ displayValue: '+1', description: 'one' }],
    };

    render(
      <Provider store={mockStore}>
        <Router>
          <SkillGroupItem
            groupName={'First Skill Group Name'}
            skill={group.skills[0]}
            possibleYears={group.possibleYears}
            updateProgressSkillGroups={updateProgressSkillGroups}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/vmware vsphere/i)).toBeInTheDocument();
    expect(screen.getByText(/some description one/i)).toBeInTheDocument();
  });
});

describe('Testing actions in Skill Matrix', () => {
  let spyScrollTo = jest.fn();
  beforeAll(() => {
    global.scrollTo = spyScrollTo;
    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    Object.defineProperty(global.window, 'scrollY', { value: 150 });
    spyScrollTo.mockClear();
  });
  it('Finish renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Finish />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(/Looks like you are done with the Skill Form./i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    expect(
      screen.getByText(
        /I acknowledge that the data submitted by me can be sent to a third party for job opportunities./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/i have read and agree to the/i),
    ).toBeInTheDocument();
  });

  it('Check the checkbox in Finish component', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Finish />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(/Looks like you are done with the Skill Form./i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();

    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')[1]).toBeInTheDocument();

    expect(screen.getByTestId('submitButton')).toHaveAttribute('disabled');

    userEvent.click(screen.getAllByRole('checkbox')[1]);

    expect(screen.getByTestId('submitButton')).not.toHaveAttribute('disabled');
    userEvent.click(screen.getByTestId('submitButton'));
  });

  it('Redirect to Musala Soft GDPR Policies', () => {
    global.open = jest.fn();
    render(
      <Provider store={mockStore}>
        <Router>
          <Finish />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Musala Soft Privacy Policy/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Musala Soft Privacy Policy/i));
  });

  it('Scroll to Top', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Finish />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/to the beginning/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/to the beginning/i));
    // expect(spyScrollTo).toHaveBeenCalled();
  });
});
