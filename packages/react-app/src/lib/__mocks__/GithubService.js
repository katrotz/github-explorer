const githubService = jest.genMockFromModule('./../GithubService').default;

let shouldFail = false;
let returnedResponse = null;
let promise = Promise.resolve();

function request() {
  promise = shouldFail
    ? Promise.reject(returnedResponse)
    : Promise.resolve(returnedResponse);

  return promise;
}

githubService.__setRequestFailed = function(failed) {
  shouldFail = Boolean(failed);
};

githubService.__setResponse = function(response) {
  returnedResponse = response;
};

githubService.__getAsyncPromise = function() {
  return promise;
};

githubService.fetchRepos = request;
githubService.fetchRepoDetails = request;
githubService.fetchRepoLanguages = request;

export default githubService;