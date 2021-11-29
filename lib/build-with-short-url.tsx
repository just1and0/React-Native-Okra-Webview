import React, { useState } from 'react';
import { View, Modal, SafeAreaView, ActivityIndicator, Pressable, Text } from 'react-native'
import { OkraBuildWithShortUrlProps } from './types';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { ShortUrlWebViewConfig } from './webview-config';

const BuildWithShortUrl = (props: OkraBuildWithShortUrlProps) => {
    const { short_url, onSuccess, onClose, onError, BeforeClose } = props;

    const [toggleModal, setToggleModal] = useState(true)
    const [isLoading, setIsLoading] = useState(true);

    const onTransactionSuccess = (res: any) => {
        setToggleModal(false)

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
                setToggleModal(false)
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
                        source={{ html: ShortUrlWebViewConfig({ short_url }) }}
                        onMessage={(e) => {
                            messageReceived(e.nativeEvent?.data);
                        }}
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                        onNavigationStateChange={onNavigationStateChange}
                        cacheEnabled={false}
                        cacheMode={'LOAD_NO_CACHE'}
                    />
                    <View style={{ backgroundColor: 'rgb(58, 183, 149)', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, flexDirection: 'row' }}>
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

export default BuildWithShortUrl;