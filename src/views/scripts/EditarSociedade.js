document.addEventListener('DOMContentLoaded', async function() {
    const idSociedade = window.location.pathname.split('/').pop(); // Captura o ID da URL

    const form = document.getElementById('form-editar-sociedade');
    const nomeSociedadeInput = document.getElementById('nomeSociedade');
    const fotoSociedadeInput = document.getElementById('foto-sociedade');
    const fotoPreview = document.getElementById('foto-preview');

    // Função para processar os dados da sociedade
    function processarDados(data) {
        return {
            NOME_SOCIEDADE: data.sociedade[0].NOME_SOCIEDADE,
            FOTO_SOCIEDADE: data.sociedade[0].FOTO_SOCIEDADE
        };
    }

    // Carregar os dados atuais da sociedade
    try {
        const response = await fetch(`/api/sociedade-cadastrada/${idSociedade}`);
        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            console.error('Erro ao carregar sociedade:', data.error);
            return;
        }

        const sociedade = processarDados(data);
        nomeSociedadeInput.value = sociedade.NOME_SOCIEDADE;
        fotoPreview.src = sociedade.FOTO_SOCIEDADE || '/assets/ImgCadastroSoci.svg';
    } catch (error) {
        console.error('Erro ao carregar sociedade:', error);
    }

    // Atualizar pré-visualização da imagem quando o arquivo for selecionado
    fotoSociedadeInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fotoPreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Salvar alterações
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nomeSociedade = nomeSociedadeInput.value;
        const fotoSociedade = fotoSociedadeInput.files[0];

        const formData = new FormData();
        formData.append('nome_sociedade', nomeSociedade);
        if (fotoSociedade) {
            formData.append('foto_sociedade', fotoSociedade);
        }

        try {
            const response = await fetch(`/api/sociedade-interna/editar-sociedade/${idSociedade}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                window.location.href = `/sociedade-interna`;
            } else {
                const errorData = await response.json();
                console.error('Erro ao editar sociedade:', errorData.error);
            }
        } catch (error) {
            console.error('Erro ao editar sociedade:', error);
        }
    });
});
