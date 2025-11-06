(function() {
    const SCROLL_THRESHOLD = 200;
    const MESSAGE_DISPLAY_TIME = 4000;
    const MESSAGE_INTERVAL = 15000;

    let messageTimeout;
    let isAboveThreshold = false;

    function init() {
        const widget = document.getElementById('whatsapp-widget');
        const message = document.getElementById('whatsapp-message');

        if (!widget || !message) return;

        window.addEventListener('scroll', function() {
            const wasAboveThreshold = isAboveThreshold;
            isAboveThreshold = window.scrollY > SCROLL_THRESHOLD;

            if (isAboveThreshold) {
                widget.classList.add('show');
                if (!wasAboveThreshold && !messageTimeout) {
                    setTimeout(showMessage, 3000);
                }
            } else {
                widget.classList.remove('show');
                if (messageTimeout) {
                    clearTimeout(messageTimeout);
                    messageTimeout = null;
                }
            }
        });

        function showMessage() {
            if (!isAboveThreshold) return;

            message.classList.add('show');

            setTimeout(function() {
                message.classList.remove('show');
            }, MESSAGE_DISPLAY_TIME);

            messageTimeout = setTimeout(showMessage, MESSAGE_INTERVAL);
        }

        setTimeout(function() {
            if (window.scrollY > SCROLL_THRESHOLD) {
                isAboveThreshold = true;
                showMessage();
            }
        }, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
