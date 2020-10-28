import React, {EffectCallback, useEffect} from 'react';
import {Button, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react-lite';
import {StackNavigationProp} from '@react-navigation/stack';

import Container from '../components/Container';
import {FetchingStatus} from '../store/types';
import Loading from '../components/Loading';
import {useStore} from '../store/StoreContext';

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});

export interface ReposProps {
  navigation: StackNavigationProp<any>;
}

const Repos: React.FC<ReposProps> = ({navigation}) => {
  const {
    repos,
    reposPage,
    reposLastPage,
    reposErrMsg,
    statusRepos,
    fetchRepos,
  } = useStore();
  useEffect(fetchRepos as EffectCallback, []);

  let content;
  switch (statusRepos) {
    case FetchingStatus.LOADING:
      content = <Loading />;
      break;
    case FetchingStatus.ERROR:
      content = <Text>Error fetching Repos: {reposErrMsg}</Text>;
      break;
    default:
      content = (
        <>
          {repos.map((repo) => (
            <Button
              key={repo.id}
              title={repo.name}
              onPress={() => {
                navigation.navigate('GitHub Repo Details', {repo});
              }}
            />
          ))}
          <View style={styles.pagination}>
            <Button
              disabled={reposPage === 1}
              onPress={() => fetchRepos(reposPage - 1)}
              title="<<"
            />
            <Text>Page {reposPage}</Text>
            <Button
              disabled={reposPage === reposLastPage}
              onPress={() => fetchRepos(reposPage + 1)}
              title=">>"
            />
          </View>
        </>
      );
  }

  return <Container>{content}</Container>;
};

export default observer(Repos);
