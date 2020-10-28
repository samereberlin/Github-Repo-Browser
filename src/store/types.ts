export enum FetchingStatus {
  LOADING,
  DONE,
  ERROR,
}

export interface OwnerType {
  login: string;
  avatar_url: string;
}

export interface RepoType {
  id: string;
  name: string;
  full_name: string;
  owner: OwnerType;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  size: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
}
