document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const inputName = document.querySelector(".input-name-sociedade");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeSociedade = inputName.value.trim();
        if (!nomeSociedade) {
            alert("Por favor, insira um nome para a sociedade.");
            return;
        }

        const data = {
            nome_sociedade: nomeSociedade
        };

        fetch('/sociedade-interna/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(result => {
            if (result.ok) {
                console.log('Sociedade cadastrada com sucesso:', result);
                alert('Sociedade cadastrada com sucesso');
                window.location.href = "/sociedade-interna"; // Redireciona para a página de sociedades internas
            } else {
                console.error('Erro ao cadastrar sociedade:', result.error);
                alert('Erro ao cadastrar sociedade: ' + result.error);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados: ' + error.message);
        });
    });
});
