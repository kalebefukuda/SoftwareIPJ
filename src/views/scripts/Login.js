document.querySelector('.form-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const usuario = document.querySelector('.input-login').value;
    const senha = document.querySelector('.input-password').value;
    const errorMessage = document.querySelector('.error-message');

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
    });

    const result = await response.json();
    if (result.status === 'success') {
        window.location.href = '/home';
    } else {
        let customMessage = "";
        switch(result.message) {
            default:
                customMessage = "Usuário ou senha incorreto! Verifique suas informações e tente novamente.";
                break;
        }
        errorMessage.textContent = customMessage;
        errorMessage.style.display = 'block';
    }
});
