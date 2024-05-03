// Função para carregar o cabeçalho e o rodapé
function includeHTML() {
    const headerPlaceholder = document.getElementById('header-placeholder');

    fetch('../components/Header.html')
        .then(response => response.text())
        .then(html => {
            headerPlaceholder.innerHTML = html;
        });
}

// Chama a função para incluir o cabeçalho 
includeHTML();
