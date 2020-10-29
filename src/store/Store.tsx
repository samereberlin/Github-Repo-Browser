import {action, configure, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FetchingStatus, RepoType} from './types';
import {
  GITHUB_AUTH,
  GITHUB_REPO_URL,
  GITHUB_SEARCH_URL,
  REPO_PER_PAGE,
} from '../env';

const STORAGE_KEY = 'favoriteNames';

configure({enforceActions: 'always'});

export interface StoreType {
  repos: Array<RepoType>;
  reposPage: number;
  reposLastPage: number;
  reposErrMsg: string;
  statusRepos: FetchingStatus;
  favorites: Array<RepoType>;
  favoriteNames: Array<string>;
  favoritesErrMsg: string;
  statusFavorites: FetchingStatus;
  fetchRepos: Function;
  setRepos: Function;
  fetchFavorites: Function;
  setFavorites: Function;
  updateFavorite: Function;
}

const Store: StoreType = observable({
  repos: [],
  reposPage: 0,
  reposLastPage: 0,
  reposErrMsg: '',
  statusRepos: FetchingStatus.LOADING,
  favorites: [],
  favoriteNames: [],
  favoritesErrMsg: '',
  statusFavorites: FetchingStatus.LOADING,

  fetchRepos: action('Fetch repos', (reposPage: number | undefined) => {
    Store.reposPage = reposPage || 1;
    Store.statusRepos = FetchingStatus.LOADING;
    fetch(
      GITHUB_SEARCH_URL +
        new URLSearchParams({
          per_page: REPO_PER_PAGE.toString(),
          page: Store.reposPage.toString(),
        }),
      {
        headers: {
          Authorization: GITHUB_AUTH,
        },
      },
    )
      .then((data) => data.json())
      .then((data) =>
        Store.setRepos(
          data.items,
          Math.floor(data.total_count / REPO_PER_PAGE),
          '',
        ),
      )
      .catch((err) => Store.setRepos([], 0, err.message));
  }),

  setRepos: action(
    'Set repos',
    (repos: Array<RepoType>, lastPage: number, errMsg: string) => {
      Store.repos = repos;
      Store.reposLastPage = lastPage;
      Store.reposErrMsg = errMsg;
      Store.statusRepos = errMsg ? FetchingStatus.ERROR : FetchingStatus.DONE;
    },
  ),

  fetchFavorites: action('Fetch favorites', () => {
    const getData = async () => {
      try {
        const favoriteNamesRaw = await AsyncStorage.getItem(STORAGE_KEY);
        const favoriteNames = JSON.parse(favoriteNamesRaw || '[]');
        const favorites = [];
        for (const favoriteName of favoriteNames) {
          const favorite = await fetch(`${GITHUB_REPO_URL}${favoriteName}`, {
            headers: {
              Authorization: GITHUB_AUTH,
            },
          }).then((data) => data.json());
          favorites.push(favorite);
        }
        favorites.sort((a, b) => b.stargazers_count - a.stargazers_count);
        Store.setFavorites(favorites, favoriteNames);
      } catch (error) {
        Store.setFavorites([], [], error);
      }
    };
    getData();
  }),

  setFavorites: action(
    'Set favorites',
    (
      favorites: Array<RepoType>,
      favoriteNames: Array<string>,
      errMsg: string,
    ) => {
      Store.favorites = favorites;
      Store.favoriteNames = favoriteNames;
      Store.favoritesErrMsg = errMsg;
      Store.statusFavorites = errMsg
        ? FetchingStatus.ERROR
        : FetchingStatus.DONE;
    },
  ),

  updateFavorite: action('Save favorite', (repo: RepoType, status: boolean) => {
    if (status) {
      const index = Store.favorites.findIndex(
        (item) => item.stargazers_count < repo.stargazers_count,
      );
      if (index < 0) {
        Store.favorites.push(repo);
      } else {
        Store.favorites.splice(index, 0, repo);
      }
      Store.favoriteNames.push(repo.full_name);
    } else {
      Store.favorites = Store.favorites.filter(
        (item) => item.full_name !== repo.full_name,
      );
      Store.favoriteNames = Store.favoriteNames.filter(
        (item) => item !== repo.full_name,
      );
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Store.favoriteNames));
  }),
});

export default Store;
