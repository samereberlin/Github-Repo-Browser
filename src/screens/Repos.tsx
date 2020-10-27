import React from 'react';
import {Button, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Container from '../components/Container';
import {useStore} from '../store/StoreContext';

export interface ReposProps {
  navigation: StackNavigationProp<any>;
}

const Repos: React.FC<ReposProps> = ({navigation}) => {
  const store = useStore();
  store.clearRepos();
  store.addRepo({name: 'foo'});
  store.addRepo({name: 'bar'});
  return (
    <Container>
      <Text>Repos screen!</Text>
      {store.repos.map((repo) => (
        <Text key={repo.name}>{repo.name}</Text>
      ))}
      <Text>Repos length: {store.repos.length}</Text>
      <Button
        title="Details"
        onPress={() => {
          navigation.navigate('GitHub Repo Details');
        }}
      />
    </Container>
  );
};

export default Repos;
