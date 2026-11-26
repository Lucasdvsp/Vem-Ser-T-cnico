
import {
    listarInstituicoes,
    listarInstituicoesPorTipo
} from "./api/instituicoesApi.js";


// =========================================
// ELEMENTOS DO HTML
// =========================================

const listaFatecs = document.getElementById("listaFatecs");
const listaEtecs = document.getElementById("listaEtecs");

const secaoFatecs = document.getElementById("secaoFatecs");
const secaoEtecs = document.getElementById("secaoEtecs");

const pesquisaInstituicoes = document.getElementById("pesquisaInstituicoes");
const btnPesquisarInstituicao = document.getElementById("btnPesquisarInstituicao");

const mensagemInstituicoes = document.getElementById("mensagemInstituicoes");

let todasInstituicoes = [];


// =========================================
// MENSAGENS DA INTERFACE
// =========================================

function exibirMensagem(mensagem) {
    mensagemInstituicoes.textContent = mensagem;
    mensagemInstituicoes.hidden = false;
}

function ocultarMensagem() {
    mensagemInstituicoes.textContent = "";
    mensagemInstituicoes.hidden = true;
}


// =========================================
// CRIAÇÃO DOS CARDS
// =========================================

function criarCardInstituicao(instituicao) {

    const card = document.createElement("a");

    card.href = `instituicao.html?id=${encodeURIComponent(instituicao.id)}`;
    card.classList.add("cardInstituicao");

    // Área da imagem
    const areaImagem = document.createElement("div");
    areaImagem.classList.add("imagemInstituicao");

    if (instituicao.foto && instituicao.foto.trim() !== "") {

        const imagem = document.createElement("img");

        imagem.src = instituicao.foto;
        imagem.alt = `Fachada da ${instituicao.nome}`;
        imagem.loading = "lazy";

        imagem.onerror = () => {
            imagem.remove();
            areaImagem.classList.add("imagemIndisponivel");
        };

        areaImagem.appendChild(imagem);

    } else {
        areaImagem.classList.add("imagemIndisponivel");
    }

    // Identificação da instituição
    const identificacao = document.createElement("span");
    identificacao.textContent = instituicao.tipo;

    areaImagem.appendChild(identificacao);

    // Nome
    const nome = document.createElement("h3");
    nome.textContent = instituicao.nome;

    card.appendChild(areaImagem);
    card.appendChild(nome);

    return card;
}

// =========================================
// RENDERIZAÇÃO DAS INSTITUIÇÕES
// =========================================

function renderizarInstituicoes(instituicoes) {

    listaFatecs.innerHTML = "";
    listaEtecs.innerHTML = "";

    const fatecs = instituicoes.filter(
        instituicao => instituicao.tipo.toUpperCase() === "FATEC"
    );

    const etecs = instituicoes.filter(
        instituicao => instituicao.tipo.toUpperCase() === "ETEC"
    );

    // Renderiza FATECs
    fatecs.forEach(instituicao => {
        listaFatecs.appendChild(
            criarCardInstituicao(instituicao)
        );
    });

    // Renderiza ETECs
    etecs.forEach(instituicao => {
        listaEtecs.appendChild(
            criarCardInstituicao(instituicao)
        );
    });

    // Esconde seções sem resultados
    secaoFatecs.hidden = fatecs.length === 0;
    secaoEtecs.hidden = etecs.length === 0;

    // Mensagem quando não houver resultados
    if (instituicoes.length === 0) {
        exibirMensagem("Nenhuma instituição encontrada.");
    } else {
        ocultarMensagem();
    }

    // Reinicia a posição dos carrosséis
    listaFatecs.scrollLeft = 0;
    listaEtecs.scrollLeft = 0;
}


// =========================================
// PESQUISA
// =========================================

function pesquisarInstituicoes() {

    const termo = pesquisaInstituicoes.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    if (termo === "") {
        renderizarInstituicoes(todasInstituicoes);
        return;
    }

    const resultado = todasInstituicoes.filter(instituicao =>
        instituicao.nome.toLocaleLowerCase("pt-BR").includes(termo)
    );

    renderizarInstituicoes(resultado);
}


// Botão de pesquisa
btnPesquisarInstituicao.addEventListener("click", pesquisarInstituicoes);


// Pesquisa enquanto digita
pesquisaInstituicoes.addEventListener("input", pesquisarInstituicoes);


// =========================================
// CARROSSEL
// =========================================

function configurarCarrosseis() {

    const carrosseis = document.querySelectorAll(".carrosselInstituicoes");

    carrosseis.forEach(carrossel => {

        const lista = carrossel.querySelector(".listaInstituicoes");
        const btnAnterior = carrossel.querySelector(".setaAnterior");
        const btnProxima = carrossel.querySelector(".setaProxima");

        function atualizarSetas() {

            const possuiConteudoRolavel =
                lista.scrollWidth > lista.clientWidth + 1;

            btnAnterior.disabled =
                !possuiConteudoRolavel || lista.scrollLeft <= 1;

            btnProxima.disabled =
                !possuiConteudoRolavel ||
                lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - 1;
        }

        function deslocarCarrossel(direcao) {

            const card = lista.querySelector(".cardInstituicao");

            if (!card) return;

            const estilo = getComputedStyle(lista);
            const gap = parseFloat(estilo.columnGap) ||
                        parseFloat(estilo.gap) || 0;

            const distancia = card.getBoundingClientRect().width + gap;

            lista.scrollBy({
                left: distancia * direcao,
                behavior: "smooth"
            });
        }

        btnAnterior.addEventListener("click", () => {
            deslocarCarrossel(-1);
        });

        btnProxima.addEventListener("click", () => {
            deslocarCarrossel(1);
        });

        lista.addEventListener("scroll", atualizarSetas);

        // Atualiza após alterações no tamanho da tela ou dos cards
        const observador = new ResizeObserver(atualizarSetas);

        observador.observe(lista);

        atualizarSetas();

    });
}


// =========================================
// INICIALIZAÇÃO
// =========================================

async function inicializarInstituicoes() {

    try {

        exibirMensagem("Carregando instituições...");

        todasInstituicoes = await listarInstituicoes();

        renderizarInstituicoes(todasInstituicoes);

        configurarCarrosseis();

    } catch (erro) {

        console.error("Erro ao carregar instituições:", erro);

        listaFatecs.innerHTML = "";
        listaEtecs.innerHTML = "";

        secaoFatecs.hidden = true;
        secaoEtecs.hidden = true;

        exibirMensagem(
            "Não foi possível carregar as instituições. Tente novamente mais tarde."
        );
    }
}


// Executa a página
inicializarInstituicoes();
