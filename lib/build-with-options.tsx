import React, { useState } from 'react';
import { View, Modal, Text, Pressable, SafeAreaView, ActivityIndicator } from 'react-native'
import { OkraBuildWithOptionsProps } from './types';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { OptionWebViewConfig } from './webview-config';

const BuildWithOptions = (props: OkraBuildWithOptionsProps) => {
    const { name, env, app_id, okraKey, token, products, color, logo, payment, filter, isCorporate, limit, callback_url, connectMessage,currency,  widget_success, widget_failed, exp, onSuccess, onClose, onError, BeforeClose } = props;

    const [toggleModal, setToggleModal] = useState(true)
    const [isLoading, setisLoading] = useState(true);

    const onTransactionSuccess = (res: any) => {
        onSuccess({ status: 'options success', res })
        setToggleModal(false)
    }

    const onTransactionClose = () => {
        onClose({ status: 'options close' })
        setToggleModal(false)
    }


    const onTransactionError = (res: any) => {
        onError && onError({ status: 'options error', res })
        setToggleModal(false)
    }

    const onTransactionBeforeClose = () => {
        BeforeClose && BeforeClose()
        setToggleModal(false)
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
                setToggleModal(false)
                break;

            case 'option before close':
                onTransactionBeforeClose()
                setToggleModal(false)
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
                        source={{ html: OptionWebViewConfig({ name, env, okraKey, token, products, color, logo, payment, filter, isCorporate, limit, callback_url, connectMessage,currency,  widget_success, widget_failed, exp  }) }}
                        onMessage={(e) => {
                            messageReceived(e.nativeEvent?.data);
                        }}
                        onLoadStart={() => setisLoading(true)}
                        onLoadEnd={() => setisLoading(false)}
                        onNavigationStateChange={onNavigationStateChange}
                        cacheEnabled={false}
                        cacheMode={'LOAD_NO_CACHE'}
                    />

                    <View style={{ backgroundColor: color? color : 'rgb(58, 183, 149)', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            {isLoading && (
                                <View>
                                    <ActivityIndicator size="large" color={'white'} />
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 15 }}>
                            <Pressable onPress={() => onTransactionClose()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'flex-end' }}>
                                    close
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default BuildWithOptions;