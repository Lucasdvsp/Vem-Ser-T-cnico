const ProgressoStorage = {

    CHAVE: 'vemSerTecnico_progresso',

    listar() {
        try {
            return JSON.parse(localStorage.getItem(this.CHAVE)) || [];
        } catch {
            return [];
        }
    },

    listarPorTipo(tipo) {
        return this.listar()
            .filter(item => item.tipo === tipo)
            .sort((a, b) => b.atualizadoEm - a.atualizadoEm);
    },

    salvar(item) {
        const lista = this.listar();
        const indice = lista.findIndex(i => i.tipo === item.tipo && i.id === item.id);
        const atualizado = { ...item, atualizadoEm: Date.now() };

        if (indice >= 0) {
            lista[indice] = { ...lista[indice], ...atualizado };
        } else {
            lista.push(atualizado);
        }

        localStorage.setItem(this.CHAVE, JSON.stringify(lista));
    },

    remover(tipo, id) {
        const lista = this.listar().filter(i => !(i.tipo === tipo && i.id === id));
        localStorage.setItem(this.CHAVE, JSON.stringify(lista));
    }
};