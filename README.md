# React-Native-Okra-Webview
Official Okra SDK for React Native/Expo applications. Don't forget to star ✨

### About Okra
Okra’s API empowers companies and developers to build products with seamless access to inclusive financial data and secure payments.


![alt text](https://files.readme.io/41dcda7-react-native-black.svg)

React Native SDK for implementing the OkraJS widget - OkraJS is a safe and secure web drop-in module and this library provides a front-end web (also available in [iOS](https://github.com/okraHQ/okra-ios-sdk) and [Android](https://github.com/okraHQ/okra-android-sdk)) SDK for [account authentication](https://docs.okra.ng/docs/widget-properties) and [payment initiation](https://docs.okra.ng/docs/creating-a-charge) for each bank that Okra [supports](https://docs.okra.ng/docs/bank-coverage).

## Try the demo
Checkout the [widget flow](https://okra.ng/) to view how the Okra Widget works. *Click "See How it Works"*

## Before getting started
- Checkout our [get started guide](https://docs.okra.ng/docs/get-started-with-okra) to create your developer account and retrieve your Client Token, API Keys, and Private Keys.
- Create a [sandbox customer](https://docs.okra.ng/docs/creating-sandbox-customers), so you can get connecting immediately.

## buildWithShortURL
- If you are using the `buildWithShortURL` version, you will first need to [create a link](https://docs.okra.ng/docs/widget-customization) on your dashboard, and use the `short url` returend at the end of the creation flow.

*Bonus Points*
- Setup [Slack Notifications](https://docs.okra.ng/docs/slack-integration) so you can see your API call statuses and re-run calls in real-time!

## Installing

Using npm:

```bash
$ npm install react-native-okra-webview
```

Using yarn:

```bash
$ yarn add react-native-okra-webview
```
### you'll also need to install `react-native-webview`, to install run ;

```bash
$ yarn add react-native-webview
```

## Usuage
For React Native based application import it and use
```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import { Okra } from 'react-native-okra-webview';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View  style={{flex:1}}>

        <Okra.BuildWithShortUrl
          short_url={'your-shourt-url'}
          onSuccess={(response: any) => {
            Alert.alert('Success!', JSON.stringify(response))
          }}
          onClose={(response: any) => {
            Alert.alert('error!', JSON.stringify(response))
          }}
        />

      </View>
    </SafeAreaView>
  );
};

export default App;
```
For others, just use
```js
 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useState } from 'react';
 import {
   Alert,
   SafeAreaView,
   StatusBar,
   useColorScheme,
   View,
 } from 'react-native';

import { Okra } from 'react-native-okra-webview';

 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

   return (
     <SafeAreaView style={{flex:1}}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style={[style().container, style().flex]}>
         <Okra.BuildWithOptions
           env="<your-env-value>"
           name="<your-name-value>"
           token="<your-token-value>"
           okraKey="<your-key-value>"
           products={['auth', 'identity', 'balance', 'transactions' ]}
           onSuccess={(response: any) => {
             Alert.alert('Success!', JSON.stringify(response))
           }}
           onClose={(response: any) => {
             Alert.alert('error!', JSON.stringify(response))
           }}
         />
       </View>
     </SafeAreaView>
   );
 };

 export default App;
```


## Okra.buildWithOptions Options

|Name                   | Type           | Required            | Default Value       | Description         |
|-----------------------|----------------|---------------------|---------------------|---------------------|
|  `app_id `            | `String`       | true                |                     | Your app id from your Okra Dashboard.
|  `okraKey `               | `String`       | true                |                     | Your public key from your Okra Dashboard.
|  `token `             | `String`       | true                |                     | Your token from your Okra Dashboard.
|  `env `               | `String`       | false               |`production`         | production(live)/production-sandbox (test)
|  `products`           | `Array`        | true                | `['Auth']`          | The Okra products you want to use with the widget.
|  `payment`            | `Booelan`      | false               |                     | Whether you want to initiate a payment (https://docs.okra.ng/docs/payments)
|  `charge `            | `Object`       | false               |                     | Payment charge opject (https://docs.okra.ng/docs/creating-a-charge)
|  `products`           | `Array`        | true                | `['Auth']`          | The Okra products you want to use with the widget.
|  `logo `              | `String(URL)`  | false               | Okra's Logo         |
|  `name `              | `String`       | false               | Your Company's name | Name on the widget
|  `color`              | `HEX   `       | false               | #3AB795             | Theme on the widget
|  `limit`              | `Number`       | false               | 24                  | Statement length
|  `filter`             | `Object`       | false               |                     | Filter for widget
|  `isCorporate`        | `Boolen`       | false               | `false`             | Corporate or Individual account
|  `connectMessage`     | `String`       | false               |                     | Instruction to connnect account
|  `widget_success`     | `String`       | false               |                     | Widget Success Message
|  `widget_failed`      | `String`       | false               |                     | Widget Failed Message
|  `callback_url`       | `String(Url)`  | false               |                     |
|  `currency`           | `String`       | false               | NGN                 | Wallet to bill
|  `exp`                | `Date`         | false               | Won't expire        | Expirary date of widget
|  `options`            | `Object`       | false               |                     | You can pass a object custom values eg id
|  `onSuccess`          | `Function`     | false               |                     | Action to perform after widget is successful
|  `onClose`            | `Function`     | false               |                     | Action to perform if widget is closed
|  `onError`            | `Function`     | false               |                     | Action to perform on widget Error
|  `BeforeClose`        | `Function`     | false               |                     | Action to perform before widget close

View a complete list of customizable options [here](https://docs.okra.ng/docs/widget-properties)

## Okra.buildWithShortUrl Options

|Name                   | Type           | Required            | Description         |
|-----------------------|----------------|---------------------|---------------------|
|  `short_url`          | `String`       | true                | Your generated url from our [App builder](https://docs.okra.ng/docs/widget-customization).
|  `onSuccess`          | `Function`     | false               | Action to perform after widget is successful
|  `onClose`            | `Function`     | false               | Action to perform if widget is closed
|  `onError`            | `Function`     | false               | Action to perform on widget Error
|  `BeforeClose`        | `Function`     | false               | Action to perform before widget close

## Done connecting?
Checkout our [API Overiview](https://docs.okra.ng/docs/api-overview) and see how to use the data you've received and [other products](https://docs.okra.ng/docs/selfie-verification) you can use to create more personalized experiences for your customers!

## Not a developer?
Get started without writing a single line of code, Try our App Builder! [Click here to get started](https://dash.okra.ng/link-builder)

## Thanks & Credits
- (Bob RN package template)[https://github.com/callstack/react-native-builder-bob]
- (okraHQ/okra-react-native docs)[https://github.com/okraHQ/okra-react-native/blob/master/README.md]

## Contributions

Want to help make this package even more awesome? feel free to send in your PR to dev branch and we'd review it and ensure it gets added to the next release 😊 

## Licensing

This project is licensed under MIT license.
