import React from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import Container from '../components/Container';
import {RootStackParamList} from './types';
import {useStore} from '../store/StoreContext';

export interface DetailsProps {
  route: RouteProp<RootStackParamList, 'Details'>;
}

const Details: React.FC<DetailsProps> = ({route}) => {
  const {favoriteNames, updateFavorite} = useStore();
  const {repo} = route.params;
  const isFavorite = favoriteNames.includes(repo.full_name);

  return (
    <Container>
      <Text>
        {repo.id} {repo.full_name}
      </Text>
      <Text>Favorite: {isFavorite ? 'Yes' : 'No'}</Text>
      <Button
        title="Update favorite"
        onPress={() => updateFavorite(repo, !isFavorite)}
      />
    </Container>
  );
};

export default observer(Details);
