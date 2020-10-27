import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import Container from '../components/Container';
import {FetchingStatus} from '../store/types';
import Loading from '../components/Loading';
import {RootStackParamList} from './types';
import {useStore} from '../store/StoreContext';

export interface DetailsProps {
  route: RouteProp<RootStackParamList, 'Details'>;
}

const Details: React.FC<DetailsProps> = ({route}) => {
  const {details, statusDetails, fetchDetails} = useStore();
  useEffect(() => {
    fetchDetails(route.params.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      {statusDetails === FetchingStatus.LOADING && <Loading />}
      <Text>
        ID: {details.id}, name: {details.name}
      </Text>
    </Container>
  );
};

export default observer(Details);
