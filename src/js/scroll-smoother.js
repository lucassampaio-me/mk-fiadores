(function() {
    function init() {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5,
            effects: true,
            smoothTouch: 1
        });

        function scrollToSection(target) {
            const element = document.querySelector(target);
            if (element) {
                smoother.scrollTo(element, true, 'top top');
            }
        }

        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(href);
                }
            });
        });

        if (window.location.hash) {
            setTimeout(() => {
                scrollToSection(window.location.hash);
            }, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
