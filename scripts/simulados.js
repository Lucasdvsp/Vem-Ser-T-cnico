const SIMULADOS = [
    // ETEC -> 50 questões e 4 horas (14400 segundos)
    { id: "etec-2026-1", banca: "ETEC", ano: "2026 - 1º Sem.", questoes: 50, duracaoTexto: "4h", duracaoSegundos: 4 * 3600 },
    { id: "etec-2025-2", banca: "ETEC", ano: "2025 - 2º Sem.", questoes: 50, duracaoTexto: "4h", duracaoSegundos: 4 * 3600 },
    { id: "etec-2025-1", banca: "ETEC", ano: "2025 - 1º Sem.", questoes: 50, duracaoTexto: "4h", duracaoSegundos: 4 * 3600 },
    { id: "etec-2024-2", banca: "ETEC", ano: "2024 - 2º Sem.", questoes: 50, duracaoTexto: "4h", duracaoSegundos: 4 * 3600 },
    { id: "etec-2024-1", banca: "ETEC", ano: "2024 - 1º Sem.", questoes: 50, duracaoTexto: "4h", duracaoSegundos: 4 * 3600 },
    { id: "etec-2023-2", banca: "ETEC", ano: "2023 - 2º Sem.", questoes: 50, duracaoTexto: "4h", duracaoSegundos: 4 * 3600 },

    // FATEC -> 60 questões e 5 horas (18000 segundos)
    { id: "fatec-2026-1", banca: "FATEC", ano: "2026 - 1º Sem.", questoes: 60, duracaoTexto: "5h", duracaoSegundos: 5 * 3600 },
    { id: "fatec-2025-2", banca: "FATEC", ano: "2025 - 2º Sem.", questoes: 60, duracaoTexto: "5h", duracaoSegundos: 5 * 3600 },
    { id: "fatec-2025-1", banca: "FATEC", ano: "2025 - 1º Sem.", questoes: 60, duracaoTexto: "5h", duracaoSegundos: 5 * 3600 },
    { id: "fatec-2024-2", banca: "FATEC", ano: "2024 - 2º Sem.", questoes: 60, duracaoTexto: "5h", duracaoSegundos: 5 * 3600 },
    { id: "fatec-2024-1", banca: "FATEC", ano: "2024 - 1º Sem.", questoes: 60, duracaoTexto: "5h", duracaoSegundos: 5 * 3600 },
    { id: "fatec-2023-2", banca: "FATEC", ano: "2023 - 2º Sem.", questoes: 60, duracaoTexto: "5h", duracaoSegundos: 5 * 3600 }
];

let filtroAtual = "tecnicas";

function criarCardSimulado(simulado) {
    const card = document.createElement("div");
    card.className = "cardSimuladoItem";
    card.dataset.id = simulado.id;
    card.dataset.banca = simulado.banca.toLowerCase();
    card.dataset.ano = simulado.ano.toLowerCase();

    card.innerHTML = `
        <div class="cardSimuladoBox">
            <span class="cardSimuladoQuestoes">${simulado.questoes} Questões</span>
            <span class="cardSimuladoTempo">${simulado.duracaoTexto}</span>
        </div>
        <span class="cardSimuladoAno">${simulado.ano}</span>
    `;

    card.addEventListener("click", () => {
        sessionStorage.setItem("simuladoSelecionado", JSON.stringify(simulado));
        window.location.href = `/prova.html?simulado=${encodeURIComponent(simulado.id)}`;
    });

    return card;
}

function renderizarSimulados(filtroTexto = "") {
    const container = document.getElementById("simuladosContainer");
    if (!container) return;

    container.innerHTML = "";
    const termo = filtroTexto.trim().toLowerCase();
    const bancas = ["ETEC", "FATEC"];

    bancas.forEach((banca) => {
        const itens = SIMULADOS.filter((item) => {
            const bateBanca = item.banca === banca;
            const bateBusca =
                !termo ||
                item.banca.toLowerCase().includes(termo) ||
                item.ano.toLowerCase().includes(termo) ||
                `${item.questoes} questões`.includes(termo);
            return bateBanca && bateBusca;
        });

        if (itens.length === 0) return;

        const bloco = document.createElement("div");
        bloco.className = "blocoInstituicao";

        const titulo = document.createElement("h2");
        titulo.className = "tituloInstituicao";
        titulo.textContent = banca;

        const wrapper = document.createElement("div");
        wrapper.className = "carrosselSimuladosWrapper";

        const btnEsq = document.createElement("button");
        btnEsq.type = "button";
        btnEsq.className = "setaCarrossel";
        btnEsq.setAttribute("aria-label", `Rolar ${banca} para a esquerda`);
        btnEsq.textContent = "‹";

        const trilho = document.createElement("div");
        trilho.className = "listaCardsSimulados";

        itens.forEach((simulado) => {
            trilho.appendChild(criarCardSimulado(simulado));
        });

        const btnDir = document.createElement("button");
        btnDir.type = "button";
        btnDir.className = "setaCarrossel";
        btnDir.setAttribute("aria-label", `Rolar ${banca} para a direita`);
        btnDir.textContent = "›";

        btnEsq.addEventListener("click", () => {
            trilho.scrollBy({ left: -400, behavior: "smooth" });
        });

        btnDir.addEventListener("click", () => {
            trilho.scrollBy({ left: 400, behavior: "smooth" });
        });

        wrapper.appendChild(btnEsq);
        wrapper.appendChild(trilho);
        wrapper.appendChild(btnDir);

        bloco.appendChild(titulo);
        bloco.appendChild(wrapper);
        container.appendChild(bloco);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarSimulados();

    const inputPesquisa = document.getElementById("pesquisaHome");
    if (inputPesquisa) {
        inputPesquisa.addEventListener("input", (e) => {
            renderizarSimulados(e.target.value);
        });
    }

    const botoesFiltro = document.querySelectorAll(".filtrosHome button");
    botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
            botoesFiltro.forEach((b) => b.classList.remove("filtroAtivo"));
            botao.classList.add("filtroAtivo");
            filtroAtual = botao.dataset.filtro || "tecnicas";
            renderizarSimulados(inputPesquisa ? inputPesquisa.value : "");
        });
    });
});