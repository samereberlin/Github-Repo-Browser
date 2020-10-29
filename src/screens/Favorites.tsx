import React, {EffectCallback, useEffect} from 'react';
import {Button, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {StackNavigationProp} from '@react-navigation/stack';

import Container from '../components/Container';
import {FetchingStatus} from '../store/types';
import Loading from '../components/Loading';
import {useStore} from '../store/StoreContext';

export interface FavoritesProps {
  navigation: StackNavigationProp<any>;
}

const Favorites: React.FC<FavoritesProps> = ({navigation}) => {
  const {
    favorites,
    favoritesErrMsg,
    statusFavorites,
    fetchFavorites,
  } = useStore();
  useEffect(fetchFavorites as EffectCallback, []);

  let content;
  switch (statusFavorites) {
    case FetchingStatus.LOADING:
      content = <Loading />;
      break;
    case FetchingStatus.ERROR:
      content = <Text>Error fetching Favorites: {favoritesErrMsg}</Text>;
      break;
    default:
      content = (
        <>
          {favorites.map((favorite) => (
            <Button
              key={favorite.id}
              title={favorite.name}
              onPress={() => {
                navigation.navigate('GitHub Repo Details', {repo: favorite});
              }}
            />
          ))}
        </>
      );
  }

  return <Container>{content}</Container>;
};

export default observer(Favorites);
