// Dados mockados dos supervisores (substitua por uma API real posteriormente)
const supervisores = [
    { username: 'supervisor1', password: 'senha123' },
    { username: 'supervisor2', password: 'senha456' },
    { username: 'supervisor3', password: 'senha789' },
    { username: 'supervisor4', password: 'senha101' },
    { username: 'supervisor5', password: 'senha112' }
];

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('supervisorLoginForm');
    const dashboard = document.getElementById('dashboard');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const supervisor = supervisores.find(s => s.username === username && s.password === password);

        if (supervisor) {
            loginForm.style.display = 'none';
            dashboard.style.display = 'block';
            alert('Login bem-sucedido!');
            initializeDashboard(supervisor.username);
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });
});

function initializeDashboard(username) {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = `
        <h2>Bem-vindo, ${username}!</h2>
        <div class="button-group">
            <button id="gerenciarFuncionarios">Gerenciar Funcionários</button>
            <button id="gerenciarTurnos">Gerenciar Turnos</button>
            <button id="criarEscala">Criar Escala</button>
            <button id="gerarRelatorio">Gerar Relatório</button>
        </div>
        <div id="conteudoDashboard"></div>
    `;

    // Adicione event listeners para os botões aqui
}
