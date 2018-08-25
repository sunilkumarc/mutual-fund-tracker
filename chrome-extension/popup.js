setTimeout(() => {
    var mobile_client_popup = window.localStorage.getItem('donate-button-notification');
    if (mobile_client_popup == null) {
        $('#popup').show();
        window.localStorage.setItem('donate-button-notification', 1);
    } else if (mobile_client_popup > 0) {
        $('#popup').show();
        window.localStorage.setItem('donate-button-notification', mobile_client_popup-1);
    }
}, 1000);
