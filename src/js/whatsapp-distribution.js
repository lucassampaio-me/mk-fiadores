const SUPABASE_URL = 'https://okwebinnqidvsfqlprrk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2ViaW5ucWlkdnNmcWxwcnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODI1NjksImV4cCI6MjA3NTE1ODU2OX0.fpm8Z_4C4q-0QN6MKw1PkzPllLrz1a7-PTBBEtmMgqM';

async function getNextWhatsAppNumber() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_next_whatsapp`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar número');

        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

async function getAssignedNumber() {
    let assignedNumber = localStorage.getItem('whatsapp_assigned_number');

    if (!assignedNumber) {
        const numberData = await getNextWhatsAppNumber();
        if (numberData && numberData.phone_number) {
            assignedNumber = numberData.phone_number;
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
