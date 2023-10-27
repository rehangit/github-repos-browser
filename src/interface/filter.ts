type RepoType = 'all' | 'owner' | 'member';
type RepoSort = 'created' | 'updated' | 'pushed' | 'full_name';
type RepoDirection = 'asc' | 'desc' | undefined;

export interface RepoFilterParams {
  type: RepoType;
  sort: RepoSort;
  direction: RepoDirection;
}
