import React, {EffectCallback, useEffect} from 'react';
import {Button} from 'react-native';
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
  const {favorites, statusFavorites, fetchFavorites} = useStore();
  useEffect(fetchFavorites as EffectCallback, []);
  return (
    <Container>
      {statusFavorites === FetchingStatus.LOADING && <Loading />}
      {favorites.map((favorite) => (
        <Button
          key={favorite.id}
          title={favorite.name}
          onPress={() => {
            navigation.navigate('GitHub Repo Details', {id: favorite.id});
          }}
        />
      ))}
    </Container>
  );
};

export default observer(Favorites);
