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

document.addEventListener("DOMContentLoaded", function () {
    const comunFemBtn = document.getElementById("listaComunFem");
    if (comunFemBtn) {
        comunFemBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-comungantes-fem";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const comunMasBtn = document.getElementById("listaComunMas");
    if (comunMasBtn) {
        comunMasBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-comungantes-mas";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const naoComunFemBtn = document.getElementById("listaNaoComunFem");
    if (naoComunFemBtn) {
        naoComunFemBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-nao-comungantes-fem";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const naoComunMasBtn = document.getElementById("listaNaoComunMas");
    if (naoComunMasBtn) {
        naoComunMasBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-nao-comungantes-mas";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const comunSedeBtn = document.getElementById("listaComunSede");
    if (comunSedeBtn) {
        comunSedeBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-comungantes-sede";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const comunSedeBtn = document.getElementById("listaDataCasamento");
    if (comunSedeBtn) {
        comunSedeBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-data-casamento";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const comunSedeBtn = document.getElementById("listaAdmAssembleia");
    if (comunSedeBtn) {
        comunSedeBtn.addEventListener("click", function () {
            window.location.href = "/relatorios/lista-chamada-assembleia-adm";
        });
    }
});







