setTimeout(() => {
    // Cookies.removeCookie('sync_feature_popup_showed');
    if (Cookies.get('sync_feature_popup_showed') === undefined) {
        $('#popup').show();
        Cookies.set('sync_feature_popup_showed', 1);
    }
}, 1000);