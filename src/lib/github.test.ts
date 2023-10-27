import fetchMock from 'jest-fetch-mock';
import { getGithubUser, getGithubRepos } from './github';

import testUserData from '../data/user.json';
import testReposData from '../data/repos.json';
import { RepoFilterParams } from '../interface/filter';

describe('GitHub API Functions', () => {
  describe('User', () => {
    const username = 'testuser';
    const expectedUser = {
      login: username,
      name: 'User name',
      avatar_url: 'https://avatar.com',
      public_repos: 1000,
    };

    beforeEach(() => {
      fetchMock.mockResponseOnce(JSON.stringify({ ...testUserData, ...expectedUser }));
    });

    it('should invoke fetch with correct params', async () => {
      await getGithubUser(username);
      expect(fetchMock).toBeCalledWith('https://api.github.com/users/' + username);
    });
    it('should get a GitHub user', async () => {
      const user = await getGithubUser(username);

      expect(user).toMatchObject(expectedUser);
    });
  });

  describe('Repositories', () => {
    const username = 'testuser'; // Replace with a valid GitHub username for testing
    const filters: RepoFilterParams = {
      type: 'owner',
      sort: 'full_name',
      direction: 'asc',
    };

    beforeEach(() => {
      fetchMock.mockResponseOnce(JSON.stringify(testReposData));
    });

    it('should invoke fetch with correct params', async () => {
      await getGithubRepos(username, filters);
      expect(fetchMock).toHaveBeenLastCalledWith(
        'https://api.github.com/users/testuser/repos?type=owner&sort=full_name&direction=asc'
      );
    });
    it('should get GitHub repositories', async () => {
      const repos = await getGithubRepos(username, filters);
      expect(repos).toHaveLength(testReposData.length);
    });
  });
});
