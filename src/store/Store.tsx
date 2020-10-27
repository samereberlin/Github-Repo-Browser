import {action, configure, observable} from 'mobx';

import {FetchingStatus, RepoDetailsType, RepoType} from './types';

configure({enforceActions: 'always'});

export interface StoreType {
  details: RepoDetailsType;
  lastDetailsId: string | undefined;
  favorites: Array<RepoType>;
  repos: Array<RepoType>;
  statusDetails: FetchingStatus;
  statusFavorites: FetchingStatus;
  statusRepos: FetchingStatus;
  fetchDetails: Function;
  fetchFavorites: Function;
  fetchRepos: Function;
  setDetails: Function;
  setFavorites: Function;
  setRepos: Function;
}

const Store: StoreType = observable({
  details: {} as RepoDetailsType,
  lastDetailsId: undefined,
  favorites: [],
  repos: [],
  statusDetails: FetchingStatus.LOADING,
  statusFavorites: FetchingStatus.LOADING,
  statusRepos: FetchingStatus.LOADING,
  fetchDetails: action('Fetch details', (id: string) => {
    if (id !== Store.details.id) {
      Store.statusDetails = FetchingStatus.LOADING;
      setTimeout(() => {
        Store.setDetails({id, name: 'Details foo bar'});
      }, 1000);
    }
  }),
  fetchFavorites: action('Fetch favorites', () => {
    setTimeout(() => {
      Store.setFavorites([
        {id: 'FF', name: 'Favorite foo'},
        {id: 'FB', name: 'Favorite bar'},
      ]);
    }, 1000);
  }),
  fetchRepos: action('Fetch repos', () => {
    setTimeout(() => {
      Store.setRepos([
        {id: 'RF', name: 'Repo foo'},
        {id: 'RB', name: 'Repo bar'},
      ]);
    }, 1000);
  }),
  setDetails: action('Set details', (details: RepoDetailsType) => {
    Store.details = details;
    Store.statusDetails = FetchingStatus.DONE;
  }),
  setFavorites: action('Set favorites', (favorites: Array<RepoType>) => {
    Store.favorites = favorites;
    Store.statusFavorites = FetchingStatus.DONE;
  }),
  setRepos: action('Set repos', (repos: Array<RepoType>) => {
    Store.repos = repos;
    Store.statusRepos = FetchingStatus.DONE;
  }),
});

export default Store;
