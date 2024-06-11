document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/lista-nao-comungantes-fem');
        const data = await response.json();

        const tbody = document.getElementById('listanaocomunfem');
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.numero_de_rol}</td>
                <td>${new Date(item.data_nascimento).toLocaleDateString('pt-BR')}</td>
                <td>${item.local_residencia}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar lista de comungantes masculinos:', error);
    }
});