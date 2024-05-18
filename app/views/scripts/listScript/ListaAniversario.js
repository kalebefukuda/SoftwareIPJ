document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/lista-aniversarios');
        const data = await response.json();

        const tbody = document.getElementById('aniversariantes');
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${new Date(item.data_nascimento).toLocaleDateString('pt-BR')}</td>
                <td>${item.idade}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar lista de aniversariantes:', error);
    }
});