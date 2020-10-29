import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';

import {RepoType} from '../store/types';

const styles = StyleSheet.create({
  repoName: {fontSize: 16, padding: 8} as TextStyle,
});

export interface RepoItemProps {
  onPress: Function;
  repo: RepoType;
}

const RepoItem: React.FC<RepoItemProps> = ({repo, onPress}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <Text style={styles.repoName}>{repo.full_name}</Text>
  </TouchableOpacity>
);

export default RepoItem;
