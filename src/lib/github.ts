import { RepoFilterParams } from '../interface/filter';
import { GithubRepo, GithubUser } from '../interface/github';
import log from '../lib/logger';

type CacheEntry = {
  expiry: number;
  data: unknown;
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
  const res = await fetch(`https://api.github.com/${path}`).catch(console.error);
  const headers: { [k: string]: string } = {};
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

export const getGithubUser = async (username: string): Promise<GithubUser> => {
  const res = await githubFetch('users/' + username);
  log('getGithubUser', res);
  return res.data as GithubUser;
};

export const getGithubRepos = async (
  userName: string,
  filters: RepoFilterParams
): Promise<GithubRepo[]> => {
  const { type = 'owner', sort = 'full_name' } = filters || {};
  const { direction = type === 'owner' ? 'asc' : 'desc' } = filters || {};
  const res = await githubFetch(
    `users/${userName}/repos?type=${type}&sort=${sort}&direction=${direction}`
  );
  const repos = res.data as GithubRepo[];
  log('filtered result', { repos });
  return repos;
};
