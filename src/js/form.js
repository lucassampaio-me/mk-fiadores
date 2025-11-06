(function() {
    function init() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const telefoneInput = document.getElementById('telefone');
        const mensagemInput = document.getElementById('mensagem');
        const submitButton = form.querySelector('button[type="submit"]');

        function showError(input, message) {
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            input.classList.add('error');
        }

        function clearError(input) {
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            input.classList.remove('error');
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validateField(input) {
            clearError(input);

            if (input === nomeInput) {
                if (!input.value.trim()) {
                    showError(input, 'O nome é obrigatório');
                    return false;
                }
            }

            if (input === emailInput) {
                if (!input.value.trim()) {
                    showError(input, 'O e-mail é obrigatório');
                    return false;
                }
                if (!validateEmail(input.value.trim())) {
                    showError(input, 'Digite um e-mail válido');
                    return false;
                }
            }

            if (input === mensagemInput) {
                if (!input.value.trim()) {
                    showError(input, 'A mensagem é obrigatória');
                    return false;
                }
            }

            return true;
        }

        [nomeInput, emailInput, mensagemInput].forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isNomeValid = validateField(nomeInput);
            const isEmailValid = validateField(emailInput);
            const isMensagemValid = validateField(mensagemInput);

            if (!isNomeValid || !isEmailValid || !isMensagemValid) {
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome: nomeInput.value.trim(),
                        email: emailInput.value.trim(),
                        telefone: telefoneInput.value.trim(),
                        mensagem: mensagemInput.value.trim(),
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    if (window.trackFormSuccess) {
                        window.trackFormSuccess();
                    }
                    window.showToast('Mensagem enviada com sucesso!', 'success');
                    form.reset();
                } else {
                    window.showToast(data.error || 'Erro ao enviar mensagem', 'error');
                }
            } catch (error) {
                window.showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar mensagem <i class="ph-fill ph-paper-plane-tilt text-xl"></i>';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
