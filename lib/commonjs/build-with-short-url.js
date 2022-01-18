"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeWebview = require("react-native-webview");

var _webviewConfig = require("./webview-config");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BuildWithShortUrl = props => {
  const {
    short_url,
    onSuccess,
    onClose,
    onError,
    BeforeClose
  } = props;
  const [toggleModal, setToggleModal] = (0, _react.useState)(true);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);

  const onTransactionSuccess = res => {
    onSuccess({
      status: 'options success',
      res
    });
  };

  const onTransactionCloseConfirmation = () => {
    _reactNative.Alert.alert("End Transaction", "You are about to end this transaction, Are you sure you want to do this?", [{
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

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: toggleModal,
    animationType: 'slide'
  }, /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    source: {
      html: (0, _webviewConfig.ShortUrlWebViewConfig)({
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      backgroundColor: 'rgb(58, 183, 149)',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, isLoading && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: 'white'
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 3,
      paddingHorizontal: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => onTransactionCloseConfirmation()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'flex-end'
    }
  }, "close")))))));
};

var _default = BuildWithShortUrl;
exports.default = _default;
//# sourceMappingURL=build-with-short-url.js.map