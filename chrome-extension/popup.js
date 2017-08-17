setTimeout(() => {
    var mobile_client_popup = window.localStorage.getItem('mobile_client_popup_showed');
    if (mobile_client_popup == null) {
        $('#popup').show();
        window.localStorage.setItem('mobile_client_popup_showed', 1);
    }
}, 1000);
