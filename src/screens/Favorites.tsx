import React from 'react';
import {Button, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Container from '../components/Container';

export interface FavoritesProps {
  navigation: StackNavigationProp<any>;
}

const Favorites: React.FC<FavoritesProps> = ({navigation}) => (
  <Container>
    <Text>Favorites screen!</Text>
    <Button
      title="Details"
      onPress={() => {
        navigation.navigate('GitHub Repo Details');
      }}
    />
  </Container>
);

export default Favorites;
