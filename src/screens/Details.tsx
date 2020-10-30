import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer} from 'mobx-react-lite';
import {
  Image,
  ImageStyle,
  Linking,
  Share,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import {colors, defaultTextStyle, paddings} from '../util/theme';
import Container from '../components/Container';
import {formatDate, formatNumber} from '../util/helpers';
import {RootStackParamList} from './types';
import {useStore} from '../store/StoreContext';

const styles = StyleSheet.create({
  descriptionText: {
    ...defaultTextStyle,
    paddingLeft: paddings.large,
    paddingRight: paddings.large,
  } as TextStyle,
  headerContainer: {
    alignItems: 'stretch',
    flexDirection: 'row',
    paddingLeft: paddings.large,
    paddingRight: paddings.large,
    paddingBottom: paddings.large,
  } as ViewStyle,
  headerText: {
    ...defaultTextStyle,
    color: colors.blue,
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 0,
  } as TextStyle,
  headerTextContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  iconsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: paddings.large,
    paddingRight: paddings.large,
  },
  iconShareContainer: {
    paddingRight: 32,
  },
  image: {width: 72, height: 72} as ImageStyle,
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: paddings.large,
    paddingRight: paddings.large,
    paddingTop: paddings.medium,
    paddingBottom: paddings.medium,
  } as ViewStyle,
  infoInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
  } as ViewStyle,
  infoInnerContainerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexGrow: 1,
  } as ViewStyle,
  infoInnerContainerRight: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexDirection: 'row',
  } as ViewStyle,
  infoText: {
    ...defaultTextStyle,
    color: colors.gray,
    padding: paddings.small,
  } as TextStyle,
  linkText: {
    ...defaultTextStyle,
    color: colors.blue,
    padding: paddings.small,
  } as TextStyle,
});

export interface DetailsProps {
  route: RouteProp<RootStackParamList, 'Details'>;
}

const Details: React.FC<DetailsProps> = ({route}) => {
  const {favoriteNames, updateFavorite} = useStore();
  const {repo} = route.params;
  const isFavorite = favoriteNames.includes(repo.full_name);

  const share = () => {
    Share.share({
      message: `${repo.full_name}: ${repo.description} ${repo.html_url}`,
    });
  };

  return (
    <Container>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={share} style={styles.iconShareContainer}>
          <Icon name="share-alt" size={32} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateFavorite(repo, !isFavorite)}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-o'}
            size={32}
            color={colors.gray}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <Image style={styles.image} source={{uri: repo.owner.avatar_url}} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{repo.full_name}</Text>
        </View>
      </View>
      <Text style={styles.descriptionText}>{repo.description}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoInnerContainer}>
          <Icon name="star-o" size={16} />
          <Text style={styles.infoText}>
            {formatNumber(repo.stargazers_count)}
          </Text>
        </View>
        <View style={styles.infoInnerContainerCenter}>
          <Text style={styles.infoText}>{repo.language}</Text>
        </View>
        <View style={styles.infoInnerContainerRight}>
          <Icon name="code-fork" size={16} />
          <Text style={styles.infoText}>{formatNumber(repo.forks_count)}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoInnerContainer}>
          <Text style={styles.infoText}>
            Created on {formatDate(repo.created_at)}
          </Text>
        </View>
        <Text style={styles.infoText}>
          Updated on {formatDate(repo.updated_at)}
        </Text>
      </View>
      <Text style={styles.descriptionText}>
        Issues waiting for help: {formatNumber(repo.open_issues_count)}
      </Text>
      <Text style={styles.descriptionText}>License: {repo.license?.name}</Text>

      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.infoInnerContainer}
          onPress={() => Linking.openURL(repo.html_url)}>
          <Icon name="github" size={16} />
          <Text style={styles.linkText}>GitHub page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoInnerContainerRight}
          onPress={() => Linking.openURL(repo.homepage)}>
          <Icon name="link" size={16} />
          <Text style={styles.linkText}>Homepage</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default observer(Details);
