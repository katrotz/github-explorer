import fetch from 'isomorphic-fetch';

class GithubService {
  reposUrl = 'https://api.github.com/users/:user/repos?access_token=1bbd3efc7a1187128e7181b1ef00c6ef8ce15cf2';
  repoDetailsUrl = 'https://api.github.com/repos/:user/:repo?access_token=1bbd3efc7a1187128e7181b1ef00c6ef8ce15cf2';
  repoLanguagesUrl = 'https://api.github.com/repos/:user/:repo/languages?access_token=1bbd3efc7a1187128e7181b1ef00c6ef8ce15cf2';

  static parseResponseToJson(response) {
    return typeof response.json === 'function' ? response.json() : response;
  }

  static checkResponseStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  }

  static buildRequestInput(endpointUrl, params = {}) {
    return Object.keys(params).reduce((url, key) => url.replace(`:${key}`, params[key]), endpointUrl);
  }

  request(input, init = {}) {
    // init.mode = 'cors';
    // init.credentials = 'include';
    init.headers = init.headers ? init.headers : new Headers();

    if (init.body) {
      init.method = 'POST';
      init.headers.set('Content-Type', 'application/json');
    }

    const request = new Request(input, init);

    return fetch(request)
      .then(GithubService.checkResponseStatus)
      .then(GithubService.parseResponseToJson);
  }

  fetchRepos(user) {
    const input = GithubService.buildRequestInput(this.reposUrl, { user });

    return this.request(input);
  }

  fetchRepoDetails(repo, user) {
    const input = GithubService.buildRequestInput(this.repoDetailsUrl, { repo, user });

    return this.request(input);
  }

  fetchRepoLanguages(repo, user) {
    const input = GithubService.buildRequestInput(this.repoLanguagesUrl, { repo, user });

    return this.request(input);
  }
}

export default new GithubService();