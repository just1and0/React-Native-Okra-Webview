import React, { useState } from 'react';
import { View, Modal, SafeAreaView, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { ShortUrlWebViewConfig } from './webview-config';

const BuildWithShortUrl = props => {
  const {
    short_url,
    onSuccess,
    onClose,
    onError,
    BeforeClose,
    onEvent
  } = props;
  const [toggleModal, setToggleModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const onTransactionSuccess = res => {
    onSuccess({
      status: 'options success',
      res
    });
  };

  const onTransactionCloseConfirmation = () => {
    Alert.alert("End Transaction", "You are about to end this transaction, Are you sure you want to do this?", [{
      text: "No",
      onPress: () => onTransactionClose()
    }, {
      text: "Yes",
      onPress: () => {
        onTransactionClose(), setToggleModal(false);
      },
      style: "cancel"
    }], {
      cancelable: true
    });
  };

  const onTransactionClose = () => {
    onClose({
      status: 'options close'
    });
  };

  const onTransactionError = res => {
    onError && onError({
      status: 'options error',
      res
    });
  };

  const onTransactionBeforeClose = () => {
    BeforeClose && BeforeClose();
  };

  const messageReceived = data => {
    const webResponse = JSON.parse(data);

    switch (webResponse.event) {
      case 'option success':
        onTransactionSuccess(webResponse);
        break;

      case 'option close':
        onTransactionClose();
        break;

      case 'option error':
        onTransactionError(webResponse);
        break;

      case 'option before close':
        onTransactionBeforeClose();
        break;

      case 'option event':
        onEvent && onEvent(webResponse);
        break;

      default:
        onTransactionClose();
        break;
    }
  };

  const onNavigationStateChange = state => {
    const {
      url
    } = state;
    if (!url) return;

    if (url.includes('shouldClose=true')) {
      onTransactionClose();
    }
  };

  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Modal, {
    visible: toggleModal,
    animationType: 'slide'
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(WebView, {
    source: {
      html: ShortUrlWebViewConfig({
        short_url
      })
    },
    onMessage: e => {
      var _e$nativeEvent;

      messageReceived((_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.data);
    },
    onLoadStart: () => setIsLoading(true),
    onLoadEnd: () => setIsLoading(false),
    onNavigationStateChange: onNavigationStateChange,
    cacheEnabled: false,
    cacheMode: 'LOAD_NO_CACHE'
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: 'rgb(58, 183, 149)',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, isLoading && /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: "large",
    color: 'white'
  }))), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 3,
      paddingHorizontal: 15
    }
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => onTransactionCloseConfirmation()
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'flex-end'
    }
  }, "close")))))));
};

export default BuildWithShortUrl;
//# sourceMappingURL=build-with-short-url.js.map