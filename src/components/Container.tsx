import React from 'react';
import {StyleSheet, SafeAreaView, ViewStyle} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  } as ViewStyle,
});

const Container: React.FC = ({children}) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);

export default Container;
