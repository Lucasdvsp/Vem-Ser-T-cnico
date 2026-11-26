import { buscarAulaPorId } from "/scripts/api/aulasApi.js";


// =========================================
// ELEMENTOS
// =========================================

const playerAula = document.getElementById("playerAula");
const tituloAula = document.getElementById("tituloAula");
const textoResumo = document.getElementById("textoResumo");
const btnVerMais = document.getElementById("btnVerMais");
const mensagemAula = document.getElementById("mensagemAula");
const btnVoltarAula = document.getElementById("btnVoltarAula");

const LIMITE_RESUMO = 220;   // caracteres mostrados antes do "Ver Mais"


// =========================================
// BOTÃO VOLTAR
// =========================================

btnVoltarAula.addEventListener("click", () => {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        // aulas.html fica na mesma pasta de aula.html (caminho absoluto)
        window.location.href =
            new URL("aulas.html", window.location.href).pathname;
    }
});


// =========================================
// RESUMO COM "VER MAIS"
// =========================================

function configurarResumo(texto) {

    const resumo = texto || "Resumo não disponível.";

    if (resumo.length <= LIMITE_RESUMO) {
        textoResumo.textContent = resumo;
        btnVerMais.hidden = true;
        return;
    }

    // Corta no último espaço, para não partir uma palavra ao meio
    const corte = resumo.lastIndexOf(" ", LIMITE_RESUMO);
    const curto = resumo.slice(0, corte > 0 ? corte : LIMITE_RESUMO) + "... ";

    let expandido = false;

    function atualizar() {
        textoResumo.textContent = expandido ? resumo + " " : curto;
        btnVerMais.textContent = expandido ? "Ver Menos" : "Ver Mais";
        btnVerMais.setAttribute("aria-expanded", String(expandido));
    }

    btnVerMais.hidden = false;

    btnVerMais.addEventListener("click", () => {
        expandido = !expandido;
        atualizar();
    });

    atualizar();
}


// =========================================
// PROGRESSO (isolado: nunca pode impedir o vídeo)
// =========================================

async function obterStorage() {
    const modulo = await import("/scripts/progressoStorage.js");
    return modulo.ProgressoStorage;
}

async function salvarProgresso(aula) {

    try {

        const ProgressoStorage = await obterStorage();

        ProgressoStorage.salvar({
            id: aula.id,
            tipo: "aula",
            titulo: aula.nome,
            materia: aula.categoria,
            miniatura: aula.miniatura,

            // Caminho real desta página (ex.: /aula.html?id=XzkZO2qjgec)
            url: `${window.location.pathname}?id=${encodeURIComponent(aula.id)}`
        });

    } catch (erro) {

        console.error(
            "ERRO NO PROGRESSO: o vídeo funciona, mas o card da home " +
            "não será criado. Confira /scripts/progressoStorage.js.",
            erro
        );
    }
}

// Vídeo terminou: tira o card "Continuar" da home
async function concluirAula(aula) {

    try {

        const ProgressoStorage = await obterStorage();

        ProgressoStorage.remover("aula", aula.id);

    } catch (erro) {

        console.error("Não foi possível remover o card da aula:", erro);
    }
}


// =========================================
// API DO PLAYER DO YOUTUBE (detecta o fim do vídeo)
// =========================================

function carregarApiYoutube() {

    return new Promise((resolve, reject) => {

        if (window.YT && window.YT.Player) {
            resolve(window.YT);
            return;
        }

        const anterior = window.onYouTubeIframeAPIReady;

        window.onYouTubeIframeAPIReady = () => {
            if (typeof anterior === "function") anterior();
            resolve(window.YT);
        };

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.onerror = () => reject(new Error("Falha ao carregar a API do YouTube."));
        document.head.appendChild(script);
    });
}

async function monitorarFimDoVideo(aula) {

    try {

        const YT = await carregarApiYoutube();

        new YT.Player("playerAula", {
            events: {
                onStateChange: evento => {
                    if (evento.data === YT.PlayerState.ENDED) {
                        concluirAula(aula);
                    }
                }
            }
        });

    } catch (erro) {

        // O vídeo continua tocando, só não detecta o fim
        console.warn("Não foi possível monitorar o fim do vídeo:", erro);
    }
}


// =========================================
// CARREGAR AULA
// =========================================

async function carregarAula() {

    try {

        mensagemAula.textContent = "Carregando aula...";
        mensagemAula.hidden = false;

        // Obtém o ID da URL
        const id = new URLSearchParams(window.location.search).get("id");

        if (!id) {
            throw new Error("ID da aula não informado.");
        }

        // Consulta a API
        const aula = await buscarAulaPorId(id);

        if (!aula) {
            throw new Error("Aula não encontrada.");
        }

        // Título da página e da aula
        document.title = `Vem Ser Técnico - ${aula.nome}`;
        tituloAula.textContent = aula.nome;

        // Resumo
        configurarResumo(aula.descricao);

        // Vídeo embutido (o aluno não sai da plataforma)
        // enablejsapi + origin permitem detectar quando o vídeo termina
        playerAula.title = aula.nome;
        playerAula.src =
            `${aula.embedUrl}&enablejsapi=1` +
            `&origin=${encodeURIComponent(window.location.origin)}`;
        playerAula.hidden = false;

        mensagemAula.hidden = true;

        // Card "Continuar" da home e remoção ao fim do vídeo (sem bloquear o vídeo)
        salvarProgresso(aula);
        monitorarFimDoVideo(aula);

    } catch (erro) {

        console.error("Erro ao carregar aula:", erro);

        mensagemAula.textContent = erro.message;
        mensagemAula.hidden = false;
    }
}


// =========================================
// INICIALIZAÇÃO
// =========================================

carregarAula();