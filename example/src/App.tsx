import * as React from 'react';

import { StyleSheet, View, Text, Alert } from 'react-native';
import { Okra } from  './src';


export default function App() {
  const handleResponse = (response:any, type:'success' | 'error') => {
    Alert.alert(type, JSON.stringify(response))
    console.log(type, JSON.stringify(response))
  }

  return (
    <View style={styles.container}>
      <Text>Demo: Build with ShortUrl</Text>
      {/* <Okra.BuildWithShortUrl
        short_url={'<your short url here>'}
        onSuccess={(response: any) => handleResponse(response, 'success')}
        onClose={(response: any) => {
          handleResponse(response, 'error')
        }}
      /> */}

      <Okra.BuildWithOptions
        name='tobi the builder'
        token='5da6358130a943486f33dced'
        okraKey='7d9d39f0-23a0-5b93-8603-6c03fb0e02c5'
        env='production'
        products={['auth', 'payment']}
        onClose={()=>{

        }}
        onSuccess={()=>{
          
        }}
        onError={()=>{
          
        }}
        onEvent={
          (e)=>{
            console.log(e)
          }
        }
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
