import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import RepoList from './Component';
import githubService from './../../lib/GithubService';

jest.mock('./../../lib/GithubService');

describe('RepoList', function () {
  configure({ adapter: new Adapter() });

  function setup(oProps = {}) {
    const props = Object.assign({
      match: {
        params: {
          user: 'github-user'
        }
      },
      history: {
        push: function () {}
      }
    }, oProps);

    const enzymeWrapper = shallow(<RepoList { ...props } />);

    return {
      props,
      enzymeWrapper
    }
  }

  it('renders a repo of type card in RepoList view', async () => {
    githubService.__setRequestFailed(false);
    githubService.__setResponse([{
      id: 0,
      name: 'github-repository',
      description: '',
      language: 'javascript',
      owner: {
        user: 'github-user',
        avatar_url: ''
      }
    }]);
    const { enzymeWrapper } = setup();

    await githubService.__getAsyncPromise();

    enzymeWrapper.update();

    expect(enzymeWrapper.find('.repo-card').length).toBe(1);
  });
});
