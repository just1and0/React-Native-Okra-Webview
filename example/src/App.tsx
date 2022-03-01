import * as React from 'react';

import { StyleSheet, View, Text, Alert } from 'react-native';
import { Okra } from 'react-native-okra-webview';


export default function App() {
  const handleResponse = (response:any, type:'success' | 'error') => {
    Alert.alert(type, JSON.stringify(response))
    console.log(type, JSON.stringify(response))
  }

  return (
    <View style={styles.container}>
      <Text>Demo: Build with ShortUrl</Text>
      <Okra.BuildWithShortUrl
        short_url={'<your short url here>'}
        onSuccess={(response: any) => handleResponse(response, 'success')}
        onClose={(response: any) => {
          handleResponse(response, 'error')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
