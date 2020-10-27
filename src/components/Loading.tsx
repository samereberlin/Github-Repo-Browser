import React from 'react';
import {ActivityIndicator, StyleSheet, ViewStyle} from 'react-native';

const styles = StyleSheet.create({
  loading: {flex: 1} as ViewStyle,
});

const Loading: React.FC = () => (
  <ActivityIndicator size="large" style={styles.loading} />
);

export default Loading;
