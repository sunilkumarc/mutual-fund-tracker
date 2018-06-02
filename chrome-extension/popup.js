setTimeout(() => {
    var mobile_client_popup = window.localStorage.getItem('android-app-release-notification-2');
    if (mobile_client_popup == null) {
        $('#popup').show();
        window.localStorage.setItem('android-app-release-notification-2', 2);
    } else if (mobile_client_popup > 0) {
        $('#popup').show();
        window.localStorage.setItem('android-app-release-notification-2', mobile_client_popup-1);
    }
}, 1000);
