import { GithubRepo, GithubUser } from '../interface/github';
import log from '../lib/logger';

type CacheEntry = {
  expiry: number;
  data: any;
  headers?: object;
};

const GITHUB_TTL = 60000;

const cache: { [k: string]: CacheEntry } = {};

const githubFetch = async (path: string): Promise<CacheEntry> => {
  const cached = cache[path];
  const now = Date.now();
  log('Data from cache', path, {
    cached,
    expired: cached?.expiry < now,
  });
  if (cached?.data && cached.expiry < now) return cached;
  const res = await fetch(`https://api.github.com/${path}`).catch(
    console.error
  );
  const headers: any = {};
  res?.headers?.forEach((v, k) => {
    headers[k] = v;
  });
  if (!res?.ok) {
    console.warn('Error calling gethub path:', path, {
      headers,
      res,
      err: res?.text(),
    });
    return { headers, data: {}, expiry: 0 };
  }
  const data = await res.json();
  log('Data from github', path, { data });
  cache[path] = { data, headers, expiry: now + GITHUB_TTL };
  log('Cache at ', now, { cache });
  return cache[path];
};

export const getGithubUser = async (
  username: string
): Promise<GithubUser | {}> => {
  const res = await githubFetch('users/' + username);
  log('getGithubUser', res);
  return res.data;
};

type RepoParamType = 'all' | 'owner' | 'member';
type RepoParamSort = 'created' | 'updated' | 'pushed' | 'full_name';
type RepoParamDirection = 'asc' | 'desc' | undefined;

export const getGithubRepos = async (
  userName: string,
  repoName: string,
  type: RepoParamType = 'owner',
  sort: RepoParamSort = 'full_name',
  direction: RepoParamDirection = undefined
): Promise<GithubRepo[]> => {
  const dir = direction || (type === 'owner' ? 'asc' : 'desc');
  const res = await githubFetch(
    `users/${userName}/repos?type=${type}&sort=${sort}&direction=${dir}`
  );
  const repos = res.data as GithubRepo[];
  const filterdResult = repoName?.length
    ? repos?.filter(({ name }) => name.includes(repoName))
    : repos;
  log('getGithubRepos filtered result', {
    repos,
    repoName,
    filterdResult,
  });
  return filterdResult;
};
