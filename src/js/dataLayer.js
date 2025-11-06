// dataLayer.js - Google Tag Manager Events

// Initialize dataLayer if not exists
window.dataLayer = window.dataLayer || [];

// WhatsApp Click Event
window.trackWhatsAppClick = function(location) {
  console.log('trackWhatsAppClick chamado de:', location);
  console.trace('Stack trace do disparo:');
  window.dataLayer.push({
    event: 'whatsapp_click',
    whatsapp_location: location
  });
};

// Form Success Event
window.trackFormSuccess = function() {
  window.dataLayer.push({
    event: 'form_success'
  });
};

// Auto-track WhatsApp links in header
document.addEventListener('DOMContentLoaded', function() {
  // Track header WhatsApp links (apenas links diretos com wa.me que NÃO sejam distribuídos)
  const headerLinks = document.querySelectorAll('header a[href*="wa.me"]:not([data-whatsapp-distributed])');
  headerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.trackWhatsAppClick('links_info');
      // Redireciona após o tracking
      setTimeout(() => {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }, 100);
    });
  });
});
