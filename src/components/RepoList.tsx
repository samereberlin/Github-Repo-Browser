import React from 'react';
import {FlatList, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {defaultTextStyle, paddings} from '../util/theme';
import RepoItem from '../components/RepoItem';
import {RepoType} from '../store/types';

const styles = StyleSheet.create({
  container: {padding: paddings.small} as ViewStyle,
  emptyText: defaultTextStyle as TextStyle,
});

export interface RepoListProps {
  footer?: React.ReactElement;
  list: Array<RepoType>;
  navigation: StackNavigationProp<any>;
}

const RepoList: React.FC<RepoListProps> = ({footer, list, navigation}) => (
  <FlatList
    data={list}
    keyExtractor={({id}) => id.toString()}
    renderItem={({item}) => (
      <RepoItem
        onPress={() => navigation.navigate('GitHub Repo Details', {repo: item})}
        repo={item}
      />
    )}
    ListEmptyComponent={<Text style={styles.emptyText}>Empty list.</Text>}
    ListFooterComponent={footer}
    style={styles.container}
  />
);

export default RepoList;
