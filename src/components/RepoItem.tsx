import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    <Icon name="heart-o" size={16} />
    <Text style={styles.repoName}>{repo.full_name}</Text>
  </TouchableOpacity>
);

export default RepoItem;
