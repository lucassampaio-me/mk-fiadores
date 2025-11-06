(function() {
    function createToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = type === 'success'
            ? '<i class="ph-fill ph-check-circle"></i>'
            : '<i class="ph-fill ph-x-circle"></i>';

        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    window.showToast = createToast;
})();
