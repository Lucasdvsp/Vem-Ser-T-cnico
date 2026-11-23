const SECOES = {
    aula:      '#secaoAulas',
    exercicio: '#secaoExercicios',
    simulado:  '#secaoSimulados'
};

const MENSAGENS_VAZIO = {
    aula:      'Você ainda não assistiu nenhuma aula.',
    exercicio: 'Você ainda não começou nenhum exercício.',
    simulado:  'Você ainda não começou nenhum simulado.'
};

function renderizarCards() {
    Object.entries(SECOES).forEach(([tipo, seletor]) => {
        const lista = document.querySelector(`${seletor} .listaCards`);
        lista.innerHTML = '';

        const itens = ProgressoStorage.listarPorTipo(tipo);

        if (itens.length === 0) {
            const aviso = document.createElement('p');
            aviso.className = 'listaCards__vazio';
            aviso.textContent = MENSAGENS_VAZIO[tipo];
            lista.appendChild(aviso);
            return;
        }

        itens.forEach(item => {
            const card = document.createElement('card-progresso');
            card.dados = item;
            lista.appendChild(card);
        });
    });
}

renderizarCards();