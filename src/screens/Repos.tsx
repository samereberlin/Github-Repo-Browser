import React, {EffectCallback, useEffect} from 'react';
import {Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import {StackNavigationProp} from '@react-navigation/stack';

import Container from '../components/Container';
import {FetchingStatus} from '../store/types';
import Loading from '../components/Loading';
import {useStore} from '../store/StoreContext';

export interface ReposProps {
  navigation: StackNavigationProp<any>;
}

const Repos: React.FC<ReposProps> = ({navigation}) => {
  const {repos, statusRepos, fetchRepos} = useStore();
  useEffect(fetchRepos as EffectCallback, []);
  return (
    <Container>
      {statusRepos === FetchingStatus.LOADING && <Loading />}
      {repos.map((repo) => (
        <Button
          key={repo.id}
          title={repo.name}
          onPress={() => {
            navigation.navigate('GitHub Repo Details', {id: repo.id});
          }}
        />
      ))}
    </Container>
  );
};

export default observer(Repos);
