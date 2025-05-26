const copyButton = document.getElementById('copy-pix');
const pixKeySpan = document.getElementById('pix-key');
const feedbackMessage = document.getElementById('copy-feedback');

copyButton.addEventListener('click', async () => {
    // Read the actual email from the data attribute
    const pixKey = pixKeySpan.getAttribute('data-pix-key');

    if (!pixKey) {
        console.error('PIX key data attribute not found.');
        feedbackMessage.textContent = 'Erro: Chave PIX não encontrada.';
        feedbackMessage.style.color = '#ff1744'; // Error color
        return;
    }

    try {
        // Use the modern Clipboard API
        await navigator.clipboard.writeText(pixKey);
        feedbackMessage.textContent = 'Chave PIX copiada!';
        feedbackMessage.style.color = '#a7ffeb'; // Success color

        // Clear the message after a few seconds
        setTimeout(() => {
            feedbackMessage.textContent = '';
        }, 3000);

    } catch (err) {
        console.error('Failed to copy text: ', err);
        feedbackMessage.textContent = 'Erro ao copiar a chave PIX. Tentando método alternativo...';
        feedbackMessage.style.color = '#ff1744'; // Error color

         // Fallback for older browsers (less reliable)
        const textarea = document.createElement('textarea');
        textarea.value = pixKey;
        // Avoid scrolling to bottom
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.position = "fixed";
        textarea.style.opacity = "0"; // Hide the textarea

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand('copy');
             feedbackMessage.textContent = 'Chave PIX copiada (método alternativo)!';
             feedbackMessage.style.color = '#a7ffeb'; // Success color
             setTimeout(() => { feedbackMessage.textContent = ''; }, 3000);
        } catch (err) {
             feedbackMessage.textContent = 'Não foi possível copiar a chave PIX. Copie manualmente: ' + pixKey;
             feedbackMessage.style.color = '#ff1744'; // Error color
        }

        document.body.removeChild(textarea);
    }
});