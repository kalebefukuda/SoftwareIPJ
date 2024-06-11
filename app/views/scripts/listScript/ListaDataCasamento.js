document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/lista-data-casamento');
        const data = await response.json();

        const tbody = document.getElementById('listadatacasamento');
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.DATA_CASAMENTO}</td>
                <td>${item.CASAL}</td>
                <td>${item.ANOS_CASAMENTO}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar lista de casamentos:', error);
    }
});
