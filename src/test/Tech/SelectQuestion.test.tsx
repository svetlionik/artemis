import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectQuestion from 'boxes/Tests/components/SelectQuestion/SelectQuestion';

import mockStore from 'test/mockStore';

describe('Testing Select Question component', () => {
  it('Render Question with one possible answer - No user input', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'ADMISSION',
        answerType: 'CHOICE',
        tag: 'OOP',
        correctAnswersCount: 1,
        answers: [
          'Web browser',
          'Object request broker',
          'Word processor',
          'Root class',
          'Java applet',
        ],
      },
      currentVal: [],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={testObject.currentVal}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick ONE option:/i)).toBeInTheDocument();
    expect(screen.getByText('Web browser')).toBeInTheDocument();
    expect(screen.getByText('Object request broker')).toBeInTheDocument();
    expect(screen.getByText('Root class')).toBeInTheDocument();
    expect(screen.getByText('Java applet')).toBeInTheDocument();

    expect(screen.getAllByTestId('choicesQuestionInput')[0]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[1]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[2]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[3]).toHaveClass(
      'notChecked',
    );
  });

  it('Render Question with one possible answer - With user input', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'ADMISSION',
        answerType: 'CHOICE',
        tag: 'OOP',
        correctAnswersCount: 1,
        answers: [
          'Web browser',
          'Object request broker',
          'Word processor',
          'Root class',
          'Java applet',
        ],
      },
      currentVal: ['Web browser'],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={testObject.currentVal}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick ONE option:/i)).toBeInTheDocument();
    expect(screen.getByText('Web browser')).toBeInTheDocument();
    expect(screen.getByText('Object request broker')).toBeInTheDocument();
    expect(screen.getByText('Root class')).toBeInTheDocument();
    expect(screen.getByText('Java applet')).toBeInTheDocument();

    expect(screen.getAllByTestId('choicesQuestionInput')[0]).toHaveClass(
      'checked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[1]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[2]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[3]).toHaveClass(
      'notChecked',
    );
  });
  it('Render Question with multiple answers - No user input', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'ADMISSION',
        answerType: 'CHOICE',
        tag: 'OOP',
        correctAnswersCount: 2,
        answers: [
          'Web browser',
          'Object request broker',
          'Word processor',
          'Root class',
          'Java applet',
        ],
      },
      currentVal: [],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={testObject.currentVal}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick TWO option:/i)).toBeInTheDocument();
    expect(screen.getByText('Web browser')).toBeInTheDocument();
    expect(screen.getByText('Object request broker')).toBeInTheDocument();
    expect(screen.getByText('Root class')).toBeInTheDocument();
    expect(screen.getByText('Java applet')).toBeInTheDocument();

    expect(screen.getAllByTestId('choicesQuestionInput')[0]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[1]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[2]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[3]).toHaveClass(
      'notChecked',
    );
  });

  it('Render Question with multiple answers - User input', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'ADMISSION',
        answerType: 'CHOICE',
        tag: 'OOP',
        correctAnswersCount: 2,
        answers: [
          'Web browser',
          'Object request broker',
          'Word processor',
          'Root class',
          'Java applet',
        ],
      },
      currentVal: ['Web browser', 'Object request broker'],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={testObject.currentVal}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick TWO option:/i)).toBeInTheDocument();
    expect(screen.getByText('Web browser')).toBeInTheDocument();
    expect(screen.getByText('Object request broker')).toBeInTheDocument();
    expect(screen.getByText('Root class')).toBeInTheDocument();
    expect(screen.getByText('Java applet')).toBeInTheDocument();

    expect(screen.getAllByTestId('choicesQuestionInput')[0]).toHaveClass(
      'checked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[1]).toHaveClass(
      'checked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[2]).toHaveClass(
      'notChecked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[3]).toHaveClass(
      'notChecked',
    );
  });

  it('Render Question and Answers - NO USER INPUT', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'COGNITIVE',
        answerType: 'FILL_IN',
        tag: 'OOP',
        correctAnswersCount: 1,
        answers: [''],
      },
      currentVal: [],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={testObject.currentVal}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('fillInQuestionInput')).toBeInTheDocument();
  });

  it('Render Question with input - User input', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'COGNITIVE',
        answerType: 'FILL_IN',
        tag: 'OOP',
        correctAnswersCount: 1,
        answers: [''],
      },
      currentVal: ['1234'],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={testObject.setCurrentVal}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('fillInQuestionInput')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('fillInQuestionInput'), '1234');

    expect(screen.getByTestId('fillInQuestionInput')).toHaveValue('1234');
  });
  it('Render Question with one possible answer - With user input Test', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'ADMISSION',
        answerType: 'CHOICE',
        tag: 'OOP',
        correctAnswersCount: 1,
        answers: [
          'Web browser',
          'Object request broker',
          'Word processor',
          'Root class',
          'Java applet',
        ],
      },
      currentVal: ['Web browser'],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={jest.fn()}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick ONE option:/i)).toBeInTheDocument();
    expect(screen.getByText('Web browser')).toBeInTheDocument();
    expect(screen.getByText('Object request broker')).toBeInTheDocument();
    expect(screen.getByText('Root class')).toBeInTheDocument();
    expect(screen.getByText('Java applet')).toBeInTheDocument();

    expect(
      screen.getAllByTestId('choicesQuestionInput')[0],
    ).toBeInTheDocument();

    userEvent.click(screen.getAllByTestId('choicesQuestionInput')[0]);

    expect(screen.getAllByTestId('choicesQuestionInput')[0]).toHaveClass(
      'checked',
    );
  });
  it('Render Question with multiple possible answers - With user input Test', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let testObject = {
      question: {
        id: '923aacd2-a648-4502-ae16-2a230d47f0e8',
        title:
          'Which of the following is an example of a class that is usually distributed to the client at runtime?',
        description: 'Description of this question',
        imageUrl: 'imageURL',
        type: 'ADMISSION',
        answerType: 'CHOICE',
        tag: 'OOP',
        correctAnswersCount: 2,
        answers: [
          'Web browser',
          'Object request broker',
          'Word processor',
          'Root class',
          'Java applet',
        ],
      },
      currentVal: ['Web browser', 'Object request broker'],
      setCurrentVal: jest.fn(),
      clicked: [0],
      setClicked: jest.fn(),
      count: 0,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <SelectQuestion
            question={testObject.question}
            currentVal={testObject.currentVal}
            setCurrentVal={jest.fn()}
            clicked={[]}
            setClicked={testObject.setClicked}
            count={0}
          />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Which of the following is an example of a class that is usually distributed to the client at runtime?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description of this question'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick TWO option:/i)).toBeInTheDocument();
    expect(screen.getByText('Web browser')).toBeInTheDocument();
    expect(screen.getByText('Object request broker')).toBeInTheDocument();
    expect(screen.getByText('Root class')).toBeInTheDocument();
    expect(screen.getByText('Java applet')).toBeInTheDocument();

    expect(
      screen.getAllByTestId('choicesQuestionInput')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByTestId('choicesQuestionInput')[1],
    ).toBeInTheDocument();

    userEvent.click(screen.getAllByTestId('choicesQuestionInput')[0]);
    userEvent.click(screen.getAllByTestId('choicesQuestionInput')[1]);

    expect(screen.getAllByTestId('choicesQuestionInput')[0]).toHaveClass(
      'checked',
    );
    expect(screen.getAllByTestId('choicesQuestionInput')[1]).toHaveClass(
      'checked',
    );
  });
});
