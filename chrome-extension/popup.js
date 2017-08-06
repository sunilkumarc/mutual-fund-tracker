setTimeout(() => {
    if (Cookies.get('rating_popup_showed') === undefined) {
        $('#popup').show();
        Cookies.set('rating_popup_showed', 1);
    }
}, 1000);