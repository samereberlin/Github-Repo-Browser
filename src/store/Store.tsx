import {action, configure, observable} from 'mobx';

configure({enforceActions: 'always'});

export interface RepoType {
  name: string;
}

export interface StoreType {
  repos: Array<RepoType>;
  addRepo: Function;
  clearRepos: Function;
  getReposLength: number;
}

const Store: StoreType = observable({
  repos: [],
  addRepo: action('Add repo', (repo: RepoType) => {
    if (repo) {
      Store.repos.push(repo);
    }
  }),
  clearRepos: action('Clear repos', () => {
    Store.repos = [];
  }),
  get getReposLength() {
    return this.repos.length;
  },
});

export default Store;
