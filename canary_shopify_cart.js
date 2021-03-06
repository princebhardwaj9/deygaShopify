window.addEventListener('message', function (eventData) {
    app.sendTextMessage('In Script');
    try {
        if (JSON.parse(eventData.data)) {
            let event = JSON.parse(eventData.data);
            if (event.event_code === "custom-event" && event.data && event.data.code === "add-cart") {
                jQuery.post('/cart/add.js', {
                    items: event.data.data
                });
                return;
            } else if (event.event_code === "custom-event" && event.data && event.data.code === "update-cart") {
                jQuery.post('/cart/update.js', {
                    updates: event.data.data
                });
                return;
            } else if (event.event_code === "custom-event" && event.data && event.data.code === "clear-cart") {
                jQuery.post('/cart/clear.js');
                return;
            } else if (event.event_code === "custom-event" && event.data && event.data.code === "get-cart") {
//                 let pid = event.data.pid;
                console.log('IN Get cart script');
                jQuery.getJSON(`/recommendations/products.json?product_id=1521860509809&limit=4`, function (
                    response
                ) {
                    let recommendedProducts = response.products;
                    if (recommendedProducts.length > 0) {
                        document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
                            event_code: 'ym-recomend-event',
                            data: JSON.stringify({
                                event: {
                                    code: "product-recomend-event",
                                    data: recommendedProducts
                                }
                            })
                        }), '*');

                    }
                });
                return;
            } else if (event.event_code === "custom-event" && event.data && event.data.code === "page_open") {
                var newWindow = window.open(event.data.data, "_self");
                return;
            } else {
                return;
            }
        }
    } catch (error) {
        return;
    }
}, false);
