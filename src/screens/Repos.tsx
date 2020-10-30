import React, {EffectCallback, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {StackNavigationProp} from '@react-navigation/stack';

import {defaultTextStyle, paddings} from '../util/theme';
import Container from '../components/Container';
import {FetchingStatus} from '../store/types';
import Loading from '../components/Loading';
import RepoList from '../components/RepoList';
import {useStore} from '../store/StoreContext';

const styles = StyleSheet.create({
  errorText: defaultTextStyle as TextStyle,
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  paginationText: {
    ...defaultTextStyle,
    padding: paddings.large,
  } as TextStyle,
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

  const footer = (
    <View style={styles.paginationContainer}>
      <Button
        disabled={reposPage === 1}
        onPress={() => fetchRepos(reposPage - 1)}
        title="❮❮"
      />
      <Text style={styles.paginationText}>Page {reposPage}</Text>
      <Button
        disabled={reposPage === reposLastPage}
        onPress={() => fetchRepos(reposPage + 1)}
        title="❯❯"
      />
    </View>
  );

  let content;
  switch (statusRepos) {
    case FetchingStatus.LOADING:
      content = <Loading />;
      break;
    case FetchingStatus.ERROR:
      content = (
        <Text style={styles.errorText}>
          Error fetching Repos: {reposErrMsg}
        </Text>
      );
      break;
    default:
      content = (
        <RepoList
          list={repos.slice()}
          navigation={navigation}
          footer={footer}
        />
      );
  }

  return <Container>{content}</Container>;
};

export default observer(Repos);
