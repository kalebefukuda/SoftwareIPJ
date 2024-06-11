document.querySelector('.form-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const usuario = document.querySelector('.input-login').value;
    const senha = document.querySelector('.input-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
    });

    const result = await response.json();
    if (result.status === 'success') {
        window.location.href = '/home';
    } else {
        alert(result.message);
    }
});
