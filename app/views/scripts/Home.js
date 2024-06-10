// Rotas ao clicar

document.getElementById('verMembrosBtn').addEventListener('click', function() {
    window.location.href = '/membros'; // Redirecionar para a rota /membros
});

document.getElementById('sociedadesBtn').addEventListener('click', function(){
    window.location.href = '/sociedade-interna';
})

document.getElementById('relatoriosBtn').addEventListener('click', function(){
    window.location.href = '/relatorios';
})

