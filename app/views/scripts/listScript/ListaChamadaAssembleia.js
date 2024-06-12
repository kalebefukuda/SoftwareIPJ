document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/lista-chamada-assembleia');
        const data = await response.json();

        const tbody = document.getElementById('listachamadaAssembleia');
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.NOME}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar lista de comungantes masculinos:', error);
    }
});