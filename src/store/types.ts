export enum FetchingStatus {
  LOADING,
  DONE,
  ERROR,
}

export interface LicenceType {
  key: string;
  name: string;
}

export interface OwnerType {
  login: string;
  avatar_url: string;
}

export interface RepoType {
  id: string;
  full_name: string;
  owner: OwnerType;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  license: LicenceType;
}
