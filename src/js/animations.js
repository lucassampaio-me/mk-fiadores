gsap.registerPlugin(ScrollTrigger, SplitText);

// Timeline da seção principal
function initHeroAnimations() {
    const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    // Split text no título H1 e no "+10 mil locações realizadas"
    const splitTitle = new SplitText('.hero-title', { type: 'chars,words' });
    const splitCardTitle = new SplitText('.hero-card-title', { type: 'chars,words' });

    // Estado inicial dos elementos
    gsap.set('#header', { opacity: 0 });
    gsap.set(splitTitle.chars, { opacity: 0, y: 50, rotationX: -90 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
    gsap.set('.hero-destaque-wrapper', { opacity: 0, y: 30 });
    gsap.set('.hero-card', { opacity: 0, scale: 0.9 });
    gsap.set('.hero-avatar', { opacity: 0, x: 20 });
    gsap.set(splitCardTitle.chars, { opacity: 0, y: 20 });
    gsap.set('.hero-card-subtitle', { opacity: 0 });
    gsap.set('.hero-video-container', { opacity: 0, y: 50 });
    gsap.set('.hero-video', { scale: 1.3, filter: 'blur(0px)', opacity: 1 });

    // Animações em sequência
    tl.to('#header', {
        opacity: 1,
        duration: 0.8
    })
    .to(splitTitle.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(2.0)'
    }, '-=0.6')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.8')
    .to('.hero-destaque-wrapper', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.6')
    .to('.hero-card', {
        opacity: 1,
        scale: 1,
        duration: 0.8
    }, '-=0.6')
    .to('.hero-avatar', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1
    }, '-=0.6')
    .to(splitCardTitle.chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02
    }, '-=0.6')
    .to('.hero-card-subtitle', {
        opacity: 1,
        duration: 0.5
    }, '-=0.6')
    .to('.hero-video-container', {
        opacity: 1,
        y: 0,
        duration: 1
    }, '-=0.6')
    .to('.hero-video', {
        scale: 1,
        duration: 1
    }, '<');
    gsap.to('.hero-video-container .hero-video', {
        scrollTrigger: {
            trigger: '.hero-video-container',
            start: '10% 10%',
            end: 'bottom 40%',
            scrub: true,
        },
        filter: 'blur(10px)',
        opacity: 0.4,
        ease: 'linear'
    });
}

// Animação da seção Fiador Profissional
function initFiadorProfissionalAnimations() {
    // Split text no título H2 por linhas
    const splitFiadorTitle = new SplitText('.fiador-title', { type: 'lines' });

    // Wrap das linhas para overflow hidden
    gsap.set(splitFiadorTitle.lines, { overflow: 'hidden' });

    // Split interno para animar
    const splitFiadorTitleInner = new SplitText('.fiador-title', { type: 'lines' });

    // Estado inicial dos elementos
    gsap.set('.fiador-badge', { opacity: 0, scale: 0.8 });
    gsap.set(splitFiadorTitleInner.lines, { y: 100, opacity: 0 });
    gsap.set('.fiador-description', { opacity: 0, y: 30 });
    gsap.set('.fiador-card-wrapper', { opacity: 0, y: 60, scale: 0.95 });
    gsap.set('.fiador-icon-wrapper', { rotation: 360, scale: 0 });
    gsap.set('.fiador-content-wrapper', { opacity: 0, x: -20 });

    // Timeline com ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#fiador-profissional',
            start: 'top 70%',
            end: 'bottom center',
            toggleActions: 'play none none none'
        }
    });

    // Animações
    tl.to('.fiador-badge', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    })
    .to(splitFiadorTitleInner.lines, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.fiador-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.fiador-card-wrapper', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.fiador-icon-wrapper', {
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=1.2')
    .to('.fiador-content-wrapper', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=1.0');
}

// Animação da seção Nossos Serviços
function initServicosAnimations() {
    // Split text no título H2 por linhas
    const splitServicosTitle = new SplitText('.servicos-title', { type: 'lines' });
    gsap.set(splitServicosTitle.lines, { overflow: 'hidden' });
    const splitServicosTitleInner = new SplitText('.servicos-title', { type: 'lines' });

    // Estado inicial dos elementos
    const isMobile = window.innerWidth < 900;

    gsap.set('.servicos-badge', { opacity: 0, scale: 0.8 });
    gsap.set(splitServicosTitleInner.lines, { y: 100, rotationX: -45, opacity: 0 });
    gsap.set('.servicos-description-1', { opacity: 0, y: 30 });
    gsap.set('.servicos-description-2', { opacity: 0, y: 30 });
    gsap.set('.servicos-image-container', { opacity: 0, x: 50 });
    gsap.set('.servicos-image', { scale: 1.2 });
    gsap.set('.servicos-card-wrapper', { opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? -40 : 0 });
    gsap.set('.servicos-card-icon', { scale: 0 });
    gsap.set('.servicos-card-content', { opacity: 0, x: -20 });

    // Timeline com ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#servicos',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Animações
    tl.to('.servicos-badge', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    })
    .to(splitServicosTitleInner.lines, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.servicos-description-1', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.servicos-description-2', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.servicos-image-container', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .to('.servicos-image', {
        scale: 1,
        duration: 1,
        ease: 'power3.out'
    }, '<')
    .to('.servicos-card-wrapper', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.servicos-card-icon', {
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    }, '-=1.0')
    .to('.servicos-card-content', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.8');
}

// Animação da seção CTA
function initCtaAnimations() {
    // Split text no título por palavras
    const splitCtaTitle = new SplitText('.cta-title', { type: 'words' });

    // Estado inicial dos elementos
    gsap.set(splitCtaTitle.words, { opacity: 0, scale: 0.8 });
    gsap.set('.cta-description', { opacity: 0, y: 30 });
    gsap.set('.cta-button-wrapper', { opacity: 0, scale: 0.8 });
    gsap.set('.cta-bg', { opacity: 0, scale: 1.3 });

    // Timeline com ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Animações
    tl.to('.cta-bg', {
        opacity: 0.1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
    })
    .to(splitCtaTitle.words, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)'
    }, '-=1.2')
    .to('.cta-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.cta-button-wrapper', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.3');
}

// Animação da seção Sobre Nós
function initSobreNosAnimations() {
    // Split text no título H2 por linhas
    const splitSobreTitle = new SplitText('.sobre-title', { type: 'lines' });
    gsap.set(splitSobreTitle.lines, { overflow: 'hidden' });
    const splitSobreTitleInner = new SplitText('.sobre-title', { type: 'lines' });

    // Estado inicial dos elementos
    gsap.set('.sobre-image-container', { opacity: 0, x: -50 });
    gsap.set('.sobre-image', { scale: 1.2 });
    gsap.set('.sobre-badge', { opacity: 0, scale: 0.8 });
    gsap.set(splitSobreTitleInner.lines, { y: 100, rotationX: -45, opacity: 0 });
    gsap.set('.sobre-description-1', { opacity: 0, y: 30 });
    gsap.set('.sobre-description-2', { opacity: 0, y: 30 });
    gsap.set('.sobre-item-wrapper', { opacity: 0, x: 40 });
    gsap.set('.sobre-item-icon', { scale: 0 });
    gsap.set('.sobre-item-content', { opacity: 0, x: 20 });

    // Timeline com ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#sobre-nos',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Animações
    const isMobile = window.innerWidth < 900;

    if (isMobile) {
        tl.to('.sobre-badge', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)'
        })
        .to(splitSobreTitleInner.lines, {
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.sobre-description-1', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.sobre-description-2', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.sobre-item-wrapper', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.sobre-item-icon', {
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=1.0')
        .to('.sobre-item-content', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        }, '-=0.8')
        .to('.sobre-image-container', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.sobre-image', {
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        }, '<');
    } else {
        tl.to('.sobre-image-container', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.sobre-image', {
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        }, '<')
        .to('.sobre-badge', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '-=0.8')
        .to(splitSobreTitleInner.lines, {
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.sobre-description-1', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.sobre-description-2', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.sobre-item-wrapper', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.sobre-item-icon', {
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=1.0')
        .to('.sobre-item-content', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        }, '-=0.8');
    }
}

// Animação da seção Fale Conosco
function initContatoAnimations() {
    // Split text no título H2 por linhas
    const splitContatoTitle = new SplitText('.contato-title', { type: 'lines' });
    gsap.set(splitContatoTitle.lines, { overflow: 'hidden' });
    const splitContatoTitleInner = new SplitText('.contato-title', { type: 'lines' });

    // Estado inicial dos elementos
    gsap.set('.contato-badge', { opacity: 0, scale: 0.8 });
    gsap.set(splitContatoTitleInner.lines, { y: 100, rotationX: -45, opacity: 0 });
    gsap.set('.contato-description', { opacity: 0, y: 30 });
    gsap.set('.contato-cards-column', { opacity: 0, y: 50 });
    gsap.set('.contato-form-column', { opacity: 0, y: 50 });

    // Timeline com ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contato',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Animações
    tl.to('.contato-badge', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    })
    .to(splitContatoTitleInner.lines, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.contato-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.contato-cards-column', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.contato-form-column', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '<');
}

// Inicializa quando a página carregar
window.addEventListener('load', () => {
    initHeroAnimations();
    initFiadorProfissionalAnimations();
    initServicosAnimations();
    initCtaAnimations();
    initSobreNosAnimations();
    initContatoAnimations();

    // Remove a classe para permitir animações
    document.body.classList.add('loaded');
});
