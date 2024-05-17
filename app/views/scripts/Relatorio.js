document.addEventListener("DOMContentLoaded", function () {
    const AniversariantesBtn = document.getElementById("listaAniversario");
    if (AniversariantesBtn) {
        AniversariantesBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-aniversarios";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const assembleiaBtn = document.getElementById("listaAssembleia");
    if (assembleiaBtn) {
        assembleiaBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-chamada-assembleia";
        });
    }
});
