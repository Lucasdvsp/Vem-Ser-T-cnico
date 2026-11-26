import { listarAulas } from "/scripts/api/aulasApi.js";


// =========================================
// ELEMENTOS DO HTML
// =========================================

const listaCategorias = document.getElementById("listaCategorias");
const pesquisaAulas = document.getElementById("pesquisaAulas");
const btnPesquisarAula = document.getElementById("btnPesquisarAula");
const mensagemAulas = document.getElementById("mensagemAulas");

let todasAulas = [];


// =========================================
// MENSAGENS DA INTERFACE
// =========================================

function exibirMensagem(mensagem) {
    mensagemAulas.textContent = mensagem;
    mensagemAulas.hidden = false;
}

function ocultarMensagem() {
    mensagemAulas.textContent = "";
    mensagemAulas.hidden = true;
}


// =========================================
// CRIAÇÃO DOS CARDS
// =========================================

function criarCardAula(aula) {

    const card = document.createElement("a");

    card.href = `aula.html?id=${encodeURIComponent(aula.id)}`;
    card.classList.add("cardAula");
    card.dataset.aulaId = aula.id;

    // Área da miniatura
    const areaImagem = document.createElement("div");
    areaImagem.classList.add("imagemAula");

    const imagem = document.createElement("img");
    imagem.src = aula.miniatura;
    imagem.alt = `Miniatura da aula ${aula.nome}`;
    imagem.loading = "lazy";

    imagem.onerror = () => {
        imagem.remove();
        areaImagem.classList.add("imagemIndisponivel");
    };

    areaImagem.appendChild(imagem);

    // Ícone de play
    const play = document.createElement("span");
    play.classList.add("iconePlay");
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";
    areaImagem.appendChild(play);

    // Nome
    const nome = document.createElement("h3");
    nome.textContent = aula.nome;
    nome.title = aula.nome;

    card.appendChild(areaImagem);
    card.appendChild(nome);

    // Playlist de origem (quando existir)
    if (aula.playlist) {
        const origem = document.createElement("p");
        origem.classList.add("origemAula");
        origem.textContent = `${aula.playlist} · Aula ${aula.ordem}`;
        card.appendChild(origem);
    }

    return card;
}


// =========================================
// CRIAÇÃO DAS SEÇÕES (UMA POR CATEGORIA)
// =========================================

function criarSecaoCategoria(nomeCategoria, aulas) {

    const secao = document.createElement("section");
    secao.classList.add("secaoAulas");

    secao.innerHTML = `
        <div class="tituloSecaoAulas"><h2></h2></div>

        <div class="carrosselAulas">

            <button class="setaCarrossel setaAnterior" type="button"
                    aria-label="Aulas anteriores">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
            </button>

            <div class="listaAulas"></div>

            <button class="setaCarrossel setaProxima" type="button"
                    aria-label="Próximas aulas">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>

        </div>
    `;

    secao.querySelector("h2").textContent = nomeCategoria.toUpperCase();

    const lista = secao.querySelector(".listaAulas");

    aulas.forEach(aula => lista.appendChild(criarCardAula(aula)));

    configurarCarrossel(secao.querySelector(".carrosselAulas"));

    return secao;
}


// =========================================
// RENDERIZAÇÃO
// =========================================

function renderizarAulas(aulas) {

    listaCategorias.innerHTML = "";

    // Agrupa por categoria mantendo a ordem do JSON
    const grupos = new Map();

    aulas.forEach(aula => {
        if (!grupos.has(aula.categoria)) grupos.set(aula.categoria, []);
        grupos.get(aula.categoria).push(aula);
    });

    grupos.forEach((aulasDoGrupo, categoria) => {
        listaCategorias.appendChild(
            criarSecaoCategoria(categoria, aulasDoGrupo)
        );
    });

    if (aulas.length === 0) {
        exibirMensagem("Nenhuma aula encontrada.");
    } else {
        ocultarMensagem();
    }
}


// =========================================
// PESQUISA
// =========================================

function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
}

function pesquisarAulas() {

    const termo = normalizar(pesquisaAulas.value.trim());

    if (termo === "") {
        renderizarAulas(todasAulas);
        return;
    }

    const resultado = todasAulas.filter(aula =>
        normalizar(aula.nome).includes(termo) ||
        normalizar(aula.descricao).includes(termo) ||
        normalizar(aula.categoria).includes(termo) ||
        normalizar(aula.playlist || "").includes(termo)
    );

    renderizarAulas(resultado);
}

btnPesquisarAula.addEventListener("click", pesquisarAulas);
pesquisaAulas.addEventListener("input", pesquisarAulas);


// =========================================
// CARROSSEL
// =========================================

function configurarCarrossel(carrossel) {

    const lista = carrossel.querySelector(".listaAulas");
    const btnAnterior = carrossel.querySelector(".setaAnterior");
    const btnProxima = carrossel.querySelector(".setaProxima");

    function atualizarSetas() {

        const rolavel = lista.scrollWidth > lista.clientWidth + 1;

        btnAnterior.disabled = !rolavel || lista.scrollLeft <= 1;

        btnProxima.disabled =
            !rolavel ||
            lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - 1;
    }

    function deslocar(direcao) {

        const card = lista.querySelector(".cardAula");
        if (!card) return;

        const gap = parseFloat(getComputedStyle(lista).columnGap) || 0;

        lista.scrollBy({
            left: (card.getBoundingClientRect().width + gap) * direcao,
            behavior: "smooth"
        });
    }

    btnAnterior.addEventListener("click", () => deslocar(-1));
    btnProxima.addEventListener("click", () => deslocar(1));
    lista.addEventListener("scroll", atualizarSetas);

    // Atualiza quando a seção entra na página ou a tela muda de tamanho
    new ResizeObserver(atualizarSetas).observe(lista);

    atualizarSetas();
}


// =========================================
// INICIALIZAÇÃO
// =========================================

async function inicializarAulas() {

    try {

        exibirMensagem("Carregando aulas...");

        todasAulas = await listarAulas();

        renderizarAulas(todasAulas);

    } catch (erro) {

        console.error("Erro ao carregar aulas:", erro);

        listaCategorias.innerHTML = "";

        exibirMensagem(erro.message);
    }
}

inicializarAulas();