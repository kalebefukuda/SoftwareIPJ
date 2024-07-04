document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/membros/api/membros');
        const membros = await response.json();

        const membrosContainer = document.getElementById('membrosContainer');

        membros.forEach(membro => {
            const card = document.createElement('div');
            card.classList.add('card-result');

            card.innerHTML = `
                <div class="img-result">
                    <img class="campo-foto-card" src="../assets/Ellipse.png" alt="Foto do membro">
                </div>
                <div class="text-result-membro">
                    <div class="text-icon">
                        <h3 class="memberName">${membro.NOME}</h3>
                        <button class="edit-icon">
                            <ion-icon name="pencil-outline"></ion-icon>
                        </button>
                    </div>
                    <div class="telefone-membro">
                        <ion-icon name="phone-portrait-outline"></ion-icon>
                        <h5>${membro.TELEFONE}</h5>
                    </div>
                </div>
            `;

            membrosContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar membros:', error);
    }

    function applyInitialSelectedClass(field) {
        if (field.value) {
            field.classList.remove('initial');
            field.classList.add('selected');
        } else {
            field.classList.remove('selected');
            field.classList.add('initial');
        }
    }
    
    // Sexo
    const campoSexo = document.getElementById('sexo');
    if (campoSexo) {
        campoSexo.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoSexo);
    }

    // Comungante
    const campoComungante = document.getElementById('comungante');
    if (campoComungante) {
        campoComungante.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoComungante);
    }
});
