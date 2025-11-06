async function getNextWhatsAppNumber() {
    try {
        const response = await fetch('/api/whatsapp');

        if (!response.ok) throw new Error('Erro ao buscar número');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

async function getAssignedNumber() {
    let assignedNumber = localStorage.getItem('whatsapp_assigned_number');

    if (!assignedNumber) {
        const numberData = await getNextWhatsAppNumber();
        if (numberData && numberData.phoneNumber) {
            assignedNumber = numberData.phoneNumber;
            localStorage.setItem('whatsapp_assigned_number', assignedNumber);
        }
    }

    return assignedNumber;
}

document.addEventListener('DOMContentLoaded', async () => {
    const distributedButtons = document.querySelectorAll('[data-whatsapp-distributed="true"]');

    for (const button of distributedButtons) {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Track WhatsApp click based on button location
            if (window.trackWhatsAppClick) {
                let location = 'widget';

                if (button.closest('.whatsapp-widget')) {
                    location = 'widget';
                } else if (button.closest('header')) {
                    location = 'btn_header';
                } else if (button.closest('.cta')) {
                    location = 'cta';
                } else if (button.closest('#contato')) {
                    location = 'section_contact';
                }

                window.trackWhatsAppClick(location);
            }

            const phoneNumber = await getAssignedNumber();

            if (phoneNumber) {
                const message = encodeURIComponent('Olá, gostaria de falar com um atendente');
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            } else {
                console.error('Não foi possível obter o número do WhatsApp');
            }
        });
    }
});
