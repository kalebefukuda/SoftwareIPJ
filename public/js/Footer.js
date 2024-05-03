// Função para carregar o rodapé
function includeHTML() {
    const footerPlaceholder = document.getElementById('footer-placeholder');

    fetch('../components/Footer.html')
        .then(response => response.text())
        .then(html => {
            footerPlaceholder.innerHTML = html;
        });
}

// Chama a função para o rodapé
includeHTML();