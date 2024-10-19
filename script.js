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

    document.getElementById('gerenciarFuncionarios').addEventListener('click', gerenciarFuncionarios);
    document.getElementById('gerenciarTurnos').addEventListener('click', gerenciarTurnos);
    document.getElementById('criarEscala').addEventListener('click', criarEscala);
    document.getElementById('gerarRelatorio').addEventListener('click', gerarRelatorio);
}

function gerenciarFuncionarios() {
    const conteudo = document.getElementById('conteudoDashboard');
    conteudo.innerHTML = `
        <h3>Gerenciar Funcionários</h3>
        <form id="funcionarioForm">
            <div class="form-group">
                <label for="nomeFuncionario">Nome:</label>
                <input type="text" id="nomeFuncionario" required>
            </div>
            <div class="form-group">
                <label for="idFuncionario">ID:</label>
                <input type="text" id="idFuncionario" required>
            </div>
            <div class="form-group">
                <label for="cargoFuncionario">Cargo:</label>
                <input type="text" id="cargoFuncionario" required>
            </div>
            <button type="submit">Adicionar Funcionário</button>
        </form>
        <div id="listaFuncionarios"></div>
    `;

    document.getElementById('funcionarioForm').addEventListener('submit', adicionarFuncionario);
    atualizarListaFuncionarios();
}

function gerenciarTurnos() {
    const conteudo = document.getElementById('conteudoDashboard');
    conteudo.innerHTML = `
        <h3>Gerenciar Turnos</h3>
        <form id="turnoForm">
            <div class="form-group">
                <label for="nomeTurno">Nome do Turno:</label>
                <input type="text" id="nomeTurno" required>
            </div>
            <div class="form-group">
                <label for="horarioInicio">Horário de Início:</label>
                <input type="time" id="horarioInicio" required>
            </div>
            <div class="form-group">
                <label for="horarioFim">Horário de Fim:</label>
                <input type="time" id="horarioFim" required>
            </div>
            <button type="submit">Adicionar Turno</button>
        </form>
        <div id="listaTurnos"></div>
    `;

    document.getElementById('turnoForm').addEventListener('submit', adicionarTurno);
    atualizarListaTurnos();
}

function criarEscala() {
    const conteudo = document.getElementById('conteudoDashboard');
    conteudo.innerHTML = `
        <h3>Criar Escala</h3>
        <form id="escalaForm">
            <div class="form-group">
                <label for="dataEscala">Data:</label>
                <input type="date" id="dataEscala" required>
            </div>
            <div class="form-group">
                <label for="turnoEscala">Turno:</label>
                <select id="turnoEscala" required></select>
            </div>
            <div class="form-group">
                <label for="funcionarioEscala">Funcionário:</label>
                <select id="funcionarioEscala" required></select>
            </div>
            <button type="submit">Adicionar à Escala</button>
        </form>
        <div id="escalaAtual"></div>
    `;

    preencherSelects();
    document.getElementById('escalaForm').addEventListener('submit', adicionarEscala);
    atualizarEscalaAtual();
}

function gerarRelatorio() {
    const conteudo = document.getElementById('conteudoDashboard');
    conteudo.innerHTML = `
        <h3>Gerar Relatório</h3>
        <form id="relatorioForm">
            <div class="form-group">
                <label for="dataInicio">Data de Início:</label>
                <input type="date" id="dataInicio" required>
            </div>
            <div class="form-group">
                <label for="dataFim">Data de Fim:</label>
                <input type="date" id="dataFim" required>
            </div>
            <button type="submit">Gerar Relatório</button>
        </form>
        <div id="relatorioEscala"></div>
    `;

    document.getElementById('relatorioForm').addEventListener('submit', gerarRelatorioEscala);
}

function adicionarFuncionario(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeFuncionario').value;
    const id = document.getElementById('idFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');
    funcionarios.push({ nome, id, cargo });
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    atualizarListaFuncionarios();
    e.target.reset();
}

function adicionarTurno(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeTurno').value;
    const inicio = document.getElementById('horarioInicio').value;
    const fim = document.getElementById('horarioFim').value;

    const turnos = JSON.parse(localStorage.getItem('turnos') || '[]');
    turnos.push({ nome, inicio, fim });
    localStorage.setItem('turnos', JSON.stringify(turnos));

    atualizarListaTurnos();
    e.target.reset();
}

function adicionarEscala(e) {
    e.preventDefault();
    const data = document.getElementById('dataEscala').value;
    const turno = document.getElementById('turnoEscala').value;
    const funcionarioId = document.getElementById('funcionarioEscala').value;

    const escalas = JSON.parse(localStorage.getItem('escalas') || '[]');
    escalas.push({ data, turno, funcionarioId });
    localStorage.setItem('escalas', JSON.stringify(escalas));

    atualizarEscalaAtual();
    e.target.reset();
}

function atualizarListaFuncionarios() {
    const lista = document.getElementById('listaFuncionarios');
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');
    lista.innerHTML = funcionarios.map(f => `<p>${f.nome} - ${f.id} - ${f.cargo}</p>`).join('');
}

function atualizarListaTurnos() {
    const lista = document.getElementById('listaTurnos');
    const turnos = JSON.parse(localStorage.getItem('turnos') || '[]');
    lista.innerHTML = turnos.map(t => `<p>${t.nome}: ${t.inicio} - ${t.fim}</p>`).join('');
}

function atualizarEscalaAtual() {
    const escalaAtual = document.getElementById('escalaAtual');
    const escalas = JSON.parse(localStorage.getItem('escalas') || '[]');
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');

    escalaAtual.innerHTML = escalas.map(e => {
        const funcionario = funcionarios.find(f => f.id === e.funcionarioId);
        return `<p>${e.data}: ${funcionario.nome} - ${e.turno}</p>`;
    }).join('');
}

function preencherSelects() {
    const turnoSelect = document.getElementById('turnoEscala');
    const funcionarioSelect = document.getElementById('funcionarioEscala');
    
    const turnos = JSON.parse(localStorage.getItem('turnos') || '[]');
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');

    turnoSelect.innerHTML = turnos.map(t => `<option value="${t.nome}">${t.nome}</option>`).join('');
    funcionarioSelect.innerHTML = funcionarios.map(f => `<option value="${f.id}">${f.nome}</option>`).join('');
}

function gerarRelatorioEscala(e) {
    e.preventDefault();
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);

    const escalas = JSON.parse(localStorage.getItem('escalas') || '[]');
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');

    const escalasFiltradas = escalas.filter(escala => {
        const dataEscala = new Date(escala.data);
        return dataEscala >= dataInicio && dataEscala <= dataFim;
    });

    const relatorio = escalasFiltradas.map(escala => {
        const funcionario = funcionarios.find(f => f.id === escala.funcionarioId);
        return `<p>${escala.data}: ${funcionario.nome} - ${escala.turno}</p>`;
    }).join('');

    document.getElementById('relatorioEscala').innerHTML = relatorio || '<p>Nenhuma escala encontrada para o período selecionado.</p>';
}
