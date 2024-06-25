document.addEventListener('DOMContentLoaded', function () {

    /* Função para aplicar classes de estilo do place-holder */
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

    //Comungante
    const campoComungante = document.getElementById('comungante');
    if (campoComungante) {
        campoComungante.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoComungante);
    }

    /* ----------------------------------------------------------- */
    
});