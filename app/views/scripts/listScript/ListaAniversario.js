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

    document.getElementById('printBtn').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        /* ADICIONAR IMAGEM NO PDF */
        
        // const imgData = 'https://catolicasc-my.sharepoint.com/:i:/g/personal/j_xavier_catolicasc_edu_br/EU1Qz-VNTddPrYt6EAUEKvMBciVsW88qrCSGJJRbQFO7Iw?e=LH8QgZ';
        // doc.addImage(imgData, 'PNG', 15, 10, 180, 60); 
        // Posição (15, 10), largura 180 e altura 60

        doc.addFont('https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnedw.ttf', 'Poppins', 'normal');

        doc.autoTable({
            html: 'table',
            styles: {
                font: 'Poppins', // Usar a fonte Poppins
                fontSize: 12,
                cellPadding: 3,
                valign: 'middle',
                halign: 'center',
                cellWidth: 'auto',
            },
            headStyles: {
                font: 'Poppins',
                fillColor: [255, 255, 255],
                textColor: [1, 91, 64],
                fontSize: 16,
                fontStyle: 'bold',
                halign: 'center',
                cellPadding: 10,
            },
            margin: { top: 30 },
            didDrawPage: function (data) {
                doc.setDrawColor(0);
                doc.setLineWidth(0.1);
                doc.line(20, 50, 190, 50);
            }
        });

        doc.save('aniversariantes.pdf');
    });
});