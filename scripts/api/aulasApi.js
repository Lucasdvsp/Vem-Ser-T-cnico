// =========================================
// CONFIGURAÇÃO
// =========================================

// JSON estático do site (caminho absoluto a partir da raiz)
const URL_AULAS = "/scripts/api/aulas.json";

// Chave = idMateria usado no aulas.json
export const MATERIAS = {
    algoritmos: "Programação e Algoritmos",
    POO:  "Programação Orientada a Objetos",
    web:  "Programação Web (HTML, CSS)"
};

export const CATEGORIAS = {
    web:         "Programação Web",
    logica:      "Lógica e Algoritmos",
    mobile:      "Desenvolvimento Mobile",
    informatica: "Fundamentos de Informática",
    bd:          "Banco de Dados",
    redes:       "Redes de Computadores",
    hardware:    "Hardware e Manutenção",
    seguranca:   "Segurança da Informação",
    design:      "Design e Experiência do Usuário"
};


// =========================================
// TRATAMENTO DOS DADOS
// =========================================

function extrairIdVideo(link) {

    if (typeof link !== "string") return null;

    try {
        const url = new URL(link);

        const parametro = url.searchParams.get("v");
        if (parametro && /^[\w-]{11}$/.test(parametro)) return parametro;

        // youtu.be/ID, /embed/ID, /shorts/ID
        const m = url.pathname.match(/^\/(?:embed\/|shorts\/)?([\w-]{11})$/);
        return m ? m[1] : null;

    } catch {
        return null;
    }
}

function montarAula(dados) {

    const videoId = extrairIdVideo(dados?.linkAula);

    if (!videoId || !dados.nomeAula) {
        console.warn("Aula ignorada (link ou nome inválido):", dados);
        return null;
    }

    return {
        id: videoId,
        nome: dados.nomeAula,
        descricao: dados.descAula || "",
        completo: Boolean(dados.completoAula),
        idMateria: dados.idMateria,
        materia:
            MATERIAS[dados.idMateria] ||
            dados.nomeMateria ||
            dados.idMateria ||
            "Outras aulas",
        idCategoria: dados.idCategoria,
        categoria: CATEGORIAS[dados.idCategoria] || "Outras aulas",
        playlist: dados.playlist || null,
        ordem: Number(dados.ordem) || 1,
        videoId,
        miniatura: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
    };
}


// =========================================
// CARREGAMENTO (UMA VEZ SÓ)
// =========================================

let cacheAulas = null;

async function carregarAulas() {

    if (cacheAulas) return cacheAulas;

    const resposta = await fetch(URL_AULAS, { cache: "no-cache" });

    if (!resposta.ok) {
        throw new Error(
            `Não foi possível carregar ${URL_AULAS} (erro ${resposta.status}).`
        );
    }

    let dados;

    try {
        dados = await resposta.json();
    } catch {
        throw new Error("O arquivo aulas.json está com formato inválido.");
    }

    if (!Array.isArray(dados)) {
        throw new Error("O arquivo aulas.json deve conter uma lista de aulas.");
    }

    // Remove inválidas e IDs repetidos
    const vistos = new Set();

    cacheAulas = dados
        .map(montarAula)
        .filter(aula => {
            if (!aula) return false;

            if (vistos.has(aula.id)) {
                console.warn("Aula duplicada ignorada:", aula.nome);
                return false;
            }

            vistos.add(aula.id);
            return true;
        });

    return cacheAulas;
}


// =========================================
// FUNÇÕES PÚBLICAS DA API
// =========================================

export async function listarAulas() {
    return carregarAulas();
}

export async function listarAulasPorMateria(idMateria) {
    const aulas = await carregarAulas();
    return aulas.filter(aula => aula.idMateria === idMateria);
}

export async function listarAulasPorCategoria(idCategoria) {
    const aulas = await carregarAulas();
    return aulas.filter(aula => aula.idCategoria === idCategoria);
}

export async function listarAulasPorPlaylist(playlist) {
    const aulas = await carregarAulas();
    return aulas
        .filter(aula => aula.playlist === playlist)
        .sort((a, b) => a.ordem - b.ordem);
}

export async function buscarAulaPorId(id) {
    const aulas = await carregarAulas();
    return aulas.find(aula => aula.id === id) || null;
}