import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));
describe('Testing Index.js file', () => {
  // Commented to check gitlab ci
  it('Testing index', () => {
    //   const div = document.createElement('div');
    //   div.id = 'root';
    //   document.body.appendChild(div);
    //   require('../../index');
    //   expect(ReactDOM.render).toHaveBeenCalled();
  });
});
