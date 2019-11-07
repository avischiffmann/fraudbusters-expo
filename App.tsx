import React from 'react';
import { StyleSheet } from 'react-native';

import { FBImagePicker } from './containers/FBImagePicker';

export default function App() {
  return (
    <FBImagePicker />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
