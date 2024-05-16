document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    });

    if (response.ok) {
        // Se o login for bem-sucedido, redirecione para a página inicial
        window.location.href = '/home';
    } else {
        // Se o login falhar, exiba uma mensagem de erro
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
});