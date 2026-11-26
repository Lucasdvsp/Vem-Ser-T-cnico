const CHAVE = "vemSerTecnico_progresso";

function ler() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
        return [];
    }
}

function gravar(lista) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch (erro) {
        console.warn("Não foi possível salvar o progresso:", erro);
    }
}

export const ProgressoStorage = {

    listar() {
        return ler();
    },

    listarPorTipo(tipo) {
        return ler()
            .filter(item => item.tipo === tipo)
            .sort((a, b) => b.atualizadoEm - a.atualizadoEm);   // mais recente primeiro
    },

    // Cria o item ou atualiza se já existir (mesmo tipo + id)
    salvar(item) {
        const lista = ler();
        const indice = lista.findIndex(
            i => i.tipo === item.tipo && i.id === item.id
        );
        const atualizado = { ...item, atualizadoEm: Date.now() };

        if (indice >= 0) {
            lista[indice] = { ...lista[indice], ...atualizado };
        } else {
            lista.push(atualizado);
        }

        gravar(lista);
    },

    remover(tipo, id) {
        gravar(ler().filter(i => !(i.tipo === tipo && i.id === id)));
    }
};