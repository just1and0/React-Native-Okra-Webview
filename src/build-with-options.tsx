import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native'
import { OkraBuildWithOptionsProps } from './types';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { OptionWebViewConfig } from './webview-config';

const BuildWithOptions = (props: OkraBuildWithOptionsProps) => {
    const { name, env, okraKey, token, products, color, logo, payment, filter, isCorporate, limit, callback_url, connectMessage, currency, widget_success, widget_failed, exp, onSuccess, onClose, onError, BeforeClose } = props;

    const [toggleModal, setToggleModal] = useState(true)
    const [isLoading, setisLoading] = useState(true);

    const onTransactionSuccess = (res: any) => {
        onSuccess({ status: 'options success', res })
    }

    const onTransactionCloseConfirmation = () => {
        Alert.alert(
            "End Transaction",
            "You are about to end this transaction, Are you sure you want to do this?",
            [
                {
                    text: "No",
                    onPress: () => onTransactionClose()
                },
                {
                    text: "Yes",
                    onPress: () => { onTransactionClose(), setToggleModal(false) },
                    style: "cancel",
                },
            ],
            {
                cancelable: true
            }
        );
    }

    const onTransactionClose = () => {
        onClose({ status: 'options close' })
    }


    const onTransactionError = (res: any) => {
        onError && onError({ status: 'options error', res })
    }

    const onTransactionBeforeClose = () => {
        BeforeClose && BeforeClose()
    }

    const messageReceived = (data: string) => {
        const webResponse = JSON.parse(data);

        switch (webResponse.event) {
            case 'option success':
                onTransactionSuccess(webResponse)
                break;

            case 'option close':
                onTransactionClose()
                break;

            case 'option error':
                onTransactionError(webResponse)
                break;

            case 'option before close':
                onTransactionBeforeClose()
                break;


            default:
                onTransactionClose()
                break;
        }
    };

    const onNavigationStateChange = (state: WebViewNavigation) => {
        const { url } = state;
        if (!url) return;
        if (url.includes('shouldClose=true')) {
            onTransactionClose()
        }
    };

    return (
        <View>
            <Modal visible={toggleModal} animationType={'slide'}>
                <SafeAreaView style={{ flex: 1 }}>
                    <WebView
                        source={{ html: OptionWebViewConfig({ name, env, okraKey, token, products, color, logo, payment, filter, isCorporate, limit, callback_url, connectMessage, currency, widget_success, widget_failed, exp }) }}
                        onMessage={(e) => {
                            messageReceived(e.nativeEvent?.data);
                        }}
                        onLoadStart={() => setisLoading(true)}
                        onLoadEnd={() => setisLoading(false)}
                        onNavigationStateChange={onNavigationStateChange}
                        cacheEnabled={false}
                        cacheMode={'LOAD_NO_CACHE'}
                    />

                    <View style={{ backgroundColor: color ? color : 'rgb(58, 183, 149)', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            {isLoading && (
                                <View>
                                    <ActivityIndicator size="large" color={'white'} />
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 15 }}>
                            <TouchableOpacity onPress={() => onTransactionCloseConfirmation()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'flex-end' }}>
                                    close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default BuildWithOptions;
