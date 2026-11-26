import { ProgressoStorage } from "/scripts/progressoStorage.js";
import { listarAulas } from "/scripts/api/aulasApi.js";


const SECOES = {
    aula:      "#secaoAulas",
    exercicio: "#secaoExercicios",
    simulado:  "#secaoSimulados"
};

const MENSAGENS_VAZIO = {
    aula:      "Você ainda não assistiu nenhuma aula.",
    exercicio: "Você ainda não começou nenhum exercício.",
    simulado:  "Você ainda não começou nenhum simulado."
};


// =========================================
// REMOVE AULAS SALVAS QUE NÃO EXISTEM MAIS
// =========================================

async function limparAulasInvalidas() {

    try {

        const aulas = await listarAulas();
        const idsValidos = new Set(aulas.map(aula => aula.id));

        ProgressoStorage.listarPorTipo("aula").forEach(item => {
            if (!idsValidos.has(item.id)) {
                ProgressoStorage.remover("aula", item.id);
            }
        });

    } catch (erro) {

        // Se o JSON não carregar, mantém o que está salvo
        console.warn("Não foi possível validar as aulas salvas:", erro);
    }
}


// =========================================
// RENDERIZAÇÃO
// =========================================

function renderizarCards() {

    Object.entries(SECOES).forEach(([tipo, seletor]) => {

        const lista = document.querySelector(`${seletor} .listaCards`);
        lista.innerHTML = "";

        const itens = ProgressoStorage.listarPorTipo(tipo);

        if (itens.length === 0) {
            const aviso = document.createElement("p");
            aviso.className = "listaCards__vazio";
            aviso.textContent = MENSAGENS_VAZIO[tipo];
            lista.appendChild(aviso);
            return;
        }

        itens.forEach(item => {
            const card = document.createElement("card-progresso");
            card.dados = item;
            lista.appendChild(card);
        });
    });
}


// =========================================
// INICIALIZAÇÃO
// =========================================

async function inicializarHome() {
    await limparAulasInvalidas();
    renderizarCards();
}

inicializarHome();