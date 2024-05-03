// Função para carregar o cabeçalho e o rodapé
function includeHTML() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    fetch('../components/Header.html')
        .then(response => response.text())
        .then(html => {
            headerPlaceholder.innerHTML = html;
        });

    fetch('../components/Footer.html')
        .then(response => response.text())
        .then(html => {
            footerPlaceholder.innerHTML = html;
        });
}

// Chama a função para incluir o cabeçalho e o rodapé
includeHTML();