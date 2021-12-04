"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortUrlWebViewConfig = exports.OptionWebViewConfig = void 0;

const ShortUrlWebViewConfig = props => `   
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Okra React Native SDK</title>
        </head>
          <body  onload="buildWithShortUrl()" style="background-color:#fff;height:100vh">

            <script src="https://cdn.okra.ng/v2/bundle.js"></script>
            <script type="text/javascript">

                window.onload = buildWithShortUrl;

                function buildWithShortUrl(){ 
                    Okra.buildWithShortUrl({
                        short_url: '${props.short_url}',
                        onSuccess: function(data){
                            let response = {event:'option success', data}
                            window.ReactNativeWebView.postMessage(JSON.stringify(response)) 
                        },
                        onClose: function(){
                            let response = {event:'option close'}
                            window.ReactNativeWebView.postMessage(JSON.stringify(response))
                        },
                        BeforeClose: function(){
                          let response = {event:'option before close'}
                          window.ReactNativeWebView.postMessage(JSON.stringify(response))
                      },
                      onError: function(data){
                        let response = {event:'option error', data}
                        window.ReactNativeWebView.postMessage(JSON.stringify(response))
                    }

                    })
                }

            </script> 
          </body>

      </html> 
`;

exports.ShortUrlWebViewConfig = ShortUrlWebViewConfig;

const OptionWebViewConfig = props => {
  const {
    color
  } = props;
  let setColor = color ? color : 'rgb(58, 183, 149)';
  let setLogo = props.logo ? props.logo : 'https://media-exp1.licdn.com/dms/image/C4D0BAQHC76UBZ4sKVQ/company-logo_200_200/0/1573671434447?e=1644451200&v=beta&t=roLpHuqKsAsFGpfP39Ne5bqWKOWsBc0pB3Una1fK0WU';
  let setPayment = props.payment ? JSON.stringify(props.payment) : false;
  let setIsCorporate = props.isCorporate ? JSON.stringify(props.payment) : false;
  return `   
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okra React Native SDK</title>
  </head>
    <body onload="buildWithOptions()" style="background-color:#fff;height:100vh">

      <script src="https://cdn.okra.ng/v2/bundle.js"></script>
      <script type="text/javascript">

          window.onload = buildWithOptions; 
          function buildWithOptions(){ 
              Okra.buildWithOptions({
                name: '${props.name}',
                env: '${props.env}',
                app_id: '${props.app_id}',
                key: '${props.okraKey}', 
                token: '${props.token}',  
                products: "${props.products}",
                logo: '${setLogo}',          
                payment: '${setPayment}',
                color: '${setColor}',
                filter: '${props.filter}',
                isCorporate: '${setIsCorporate}',
                limit: '${props.limit}',
                callback_url: '${props.callback_url}',  
                connectMessage: '${props.connectMessage}',
                currency: '${props.currency}',
                widget_success: '${props.widget_success}',             
                widget_failed: '${props.widget_failed}',
                exp: '${props.exp}',  
                charge: '${props.charge}',
                onSuccess: function(data){
                      let response = {event:'option success', data}
                      window.ReactNativeWebView.postMessage(JSON.stringify(response)) 
                  },
                onClose: function(){
                      let response = {event:'option close'}
                      window.ReactNativeWebView.postMessage(JSON.stringify(response))
                  },
                  BeforeClose: function(){
                    let response = {event:'option before close'}
                    window.ReactNativeWebView.postMessage(JSON.stringify(response))
                },
                onError: function(data){
                  let response = {event:'option error', data}
                  window.ReactNativeWebView.postMessage(JSON.stringify(response))
              }
              })
          }

      </script> 
    </body>

</html> 
`;
};

exports.OptionWebViewConfig = OptionWebViewConfig;
//# sourceMappingURL=webview-config.js.map