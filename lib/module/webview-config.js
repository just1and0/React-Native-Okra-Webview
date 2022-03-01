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
                    },
                    onEvent: function(data){
                      let response = {event:'option event', data}
                      window.ReactNativeWebView.postMessage(JSON.stringify(response))
                  }

                    })
                }

            </script> 
          </body>

      </html> 
`;

const OptionWebViewConfig = props => {
  const {
    color
  } = props;
  let setLogo = props.logo ? props.logo : `https://media-exp1.licdn.com/dms/image/C4D0BAQHC76UBZ4sKVQ/company-logo_200_200/0/1573671434447?e=1644451200&v=beta&t=roLpHuqKsAsFGpfP39Ne5bqWKOWsBc0pB3Una1fK0WU`;
  let setColor = color ? color : 'rgb(58, 183, 149)';
  let setPayment = props.payment ? `${props.payment}` : 'false';
  let setProducts = props.products && `products:${JSON.stringify(props.products)},`;
  let setFilter = props.filter ? `filter:${JSON.stringify(props.filter)},` : `filter:${JSON.stringify([])},`;
  let setCharge = props.charge ? `charge:${JSON.stringify(props.charge)},` : `filter:${JSON.stringify([])},`;
  let setIsCorporate = props.isCorporate ? `${props.isCorporate}` : 'false';
  let setcallback_url = props.callback_url ? `${props.callback_url}` : null;
  let setConnectMessage = props.connectMessage ? `${props.connectMessage}` : null;
  let setwidget_success = props.widget_success ? `${props.widget_success}` : `Your account was linked successfully with ${props.name}`;
  let setwidget_failed = props.widget_failed ? `${props.widget_failed}` : `Something went wrong while linking your account to ${props.name}`;
  let setExp = props.exp ? `${props.exp}` : null;
  let setCurrency = props.currency ? `${props.currency}` : 'NGN';
  let setLimit = props.limit ? `${props.limit}` : null;
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
                payment:${setPayment},
                isCorporate:${setIsCorporate},
                logo:'${setLogo}',
                callback_url:'${setcallback_url}',
                exp:'${setExp}',
                connectMessage:'${setConnectMessage}',
                widget_success:'${setwidget_success}',
                widget_failed:'${setwidget_failed}',
                currency:'${setCurrency}',
                ${setFilter}
                color: '${setColor}',
                limit: ${setLimit},
                ${setProducts}
                ${setCharge}
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
              },
              onEvent: function(data){
                let response = {event:'option event', data}
                window.ReactNativeWebView.postMessage(JSON.stringify(response))
            }
              })
          }

      </script> 
    </body>

</html> 
`;
};

export { ShortUrlWebViewConfig, OptionWebViewConfig };
//# sourceMappingURL=webview-config.js.map