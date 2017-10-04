import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import App from './Component';

configure({ adapter: new Adapter() });

function setup(oProps = {}) {
  const props = Object.assign({
    route: {
      routes: []
    },
    history: {
      push: function () {}
    }
  }, oProps);

  const enzymeWrapper = shallow(<App { ...props } />);

  return {
    props,
    enzymeWrapper
  }
}

it('renders App without crashing', () => {
  const { enzymeWrapper } = setup();

  expect(enzymeWrapper.find('.app-content').length).toBe(1);
});


it('redirects to repo URL on github user change', () => {
  const { enzymeWrapper, props } = setup();
  const accountChangeInput = enzymeWrapper.find('.account-change');
  const historyPushSpy = jest.spyOn(props.history, 'push');

  accountChangeInput.simulate('change', { target: { value: 'github-repository' } });
  accountChangeInput.simulate('keypress', { key: 'Enter', target: { value: 'github-repository' } });

  enzymeWrapper.update();

  expect(historyPushSpy).toHaveBeenCalled();
});
