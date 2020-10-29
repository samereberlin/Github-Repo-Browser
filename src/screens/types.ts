import {RepoType} from '../store/types';

export type RootStackParamList = {
  Details: {repo: RepoType};
  Favorites: undefined;
  Repos: undefined;
};
