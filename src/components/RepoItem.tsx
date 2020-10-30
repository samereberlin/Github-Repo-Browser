import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer} from 'mobx-react-lite';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  colors,
  getSimpleShadowStyle,
  defaultTextStyle,
  paddings,
} from '../util/theme';
import {formatDate, formatNumber} from '../util/helpers';
import {RepoType} from '../store/types';
import {useStore} from '../store/StoreContext';

const styles = StyleSheet.create({
  container: {
    ...getSimpleShadowStyle(2),
    backgroundColor: 'white',
    borderRadius: 4,
    padding: paddings.medium,
    margin: 8,
  } as ViewStyle,
  descriptionText: {
    ...defaultTextStyle,
    padding: paddings.small,
  } as TextStyle,
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  infoInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
  } as ViewStyle,
  infoText: {
    ...defaultTextStyle,
    color: colors.gray,
    padding: paddings.small,
  } as TextStyle,
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  nameText: {
    ...defaultTextStyle,
    color: colors.blue,
    flexGrow: 1,
    padding: 0,
  } as TextStyle,
});

export interface RepoItemProps {
  onPress: Function;
  repo: RepoType;
}

const RepoItem: React.FC<RepoItemProps> = ({repo, onPress}) => {
  const {favoriteNames} = useStore();
  const isFavorite = favoriteNames.includes(repo.full_name);
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{repo.full_name}</Text>
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          size={16}
          color={colors.gray}
        />
      </View>
      <Text style={styles.descriptionText}>{repo.description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoInnerContainer}>
          <Icon name="star-o" size={16} />
          <Text style={styles.infoText}>
            {formatNumber(repo.stargazers_count)}
          </Text>
        </View>
        <View style={styles.infoInnerContainer}>
          <Text style={styles.infoText}>{repo.language}</Text>
        </View>
        <Text style={styles.infoText}>
          Updated on {formatDate(repo.updated_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default observer(RepoItem);
