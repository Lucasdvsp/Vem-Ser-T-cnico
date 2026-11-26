
const URL_API = new URL("./instituicoes.json", import.meta.url);

let cacheInstituicoes = null;

async function carregarInstituicoes() {
    if (cacheInstituicoes) {
        return cacheInstituicoes;
    }

    const resposta = await fetch(URL_API);

    if (!resposta.ok) {
        throw new Error("Erro ao carregar os dados das instituições.");
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
        throw new Error("O arquivo de instituições possui um formato inválido.");
    }

    cacheInstituicoes = dados;

    return cacheInstituicoes;
}


// Lista todas as instituições
export async function listarInstituicoes() {
    return await carregarInstituicoes();
}


// Busca uma instituição pelo ID
export async function buscarInstituicaoPorId(id) {
    const instituicoes = await carregarInstituicoes();

    return instituicoes.find(
        instituicao => instituicao.id === id
    ) || null;
}


// Filtra instituições por tipo (ETEC ou FATEC)
export async function listarInstituicoesPorTipo(tipo) {
    const instituicoes = await carregarInstituicoes();

    return instituicoes.filter(
        instituicao =>
            instituicao.tipo.toUpperCase() === tipo.toUpperCase()
    );
}
