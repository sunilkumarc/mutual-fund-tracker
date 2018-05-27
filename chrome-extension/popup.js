setTimeout(() => {
    var mobile_client_popup = window.localStorage.getItem('details-page-communication');
    if (mobile_client_popup == null) {
        $('#popup').show();
        window.localStorage.setItem('details-page-communication', 4);
    } else if (mobile_client_popup > 0) {
        $('#popup').show();
        window.localStorage.setItem('details-page-communication', mobile_client_popup-1);
    }
}, 1000);
