export interface GithubUser {
  name: string;
  avatar_url: string;
  login: string;
  public_repos: number;
}

export interface GithubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  forks_count: number;
}
