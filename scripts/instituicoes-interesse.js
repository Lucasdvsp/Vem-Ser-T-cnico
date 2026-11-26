
import { app } from "./firebase/config.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
    listarInstituicoes
} from "./api/instituicoesApi.js";

import {
    buscarInstituicaoInteresse,
    salvarInstituicaoInteresse
} from "./firebase/database.js";


const auth = getAuth(app);

const selectInstituicao = document.getElementById("instituicaoInteresse");

let usuarioAtual = null;


// =========================================
// CARREGAR INSTITUIÇÕES DA API
// =========================================

async function carregarInstituicoes() {

    const instituicoes = await listarInstituicoes();

    selectInstituicao.innerHTML = "";

    const opcaoInicial = document.createElement("option");

    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione uma instituição";

    selectInstituicao.appendChild(opcaoInicial);

    const fatecs = instituicoes.filter(
        item => item.tipo.toUpperCase() === "FATEC"
    );

    const etecs = instituicoes.filter(
        item => item.tipo.toUpperCase() === "ETEC"
    );

    function adicionarGrupo(nome, lista) {

        if (lista.length === 0) return;

        const grupo = document.createElement("optgroup");
        grupo.label = nome;

        lista.forEach(instituicao => {

            const opcao = document.createElement("option");

            opcao.value = instituicao.id;
            opcao.textContent = instituicao.nome;

            grupo.appendChild(opcao);

        });

        selectInstituicao.appendChild(grupo);
    }

    adicionarGrupo("FATECs", fatecs);
    adicionarGrupo("ETECs", etecs);
}


// =========================================
// RECUPERAR ESCOLHA DO USUÁRIO
// =========================================

async function carregarEscolhaUsuario(uid) {

    const instituicaoId = await buscarInstituicaoInteresse(uid);

    if (instituicaoId) {
        selectInstituicao.value = instituicaoId;
    } else {
        selectInstituicao.value = "";
    }
}


// =========================================
// SALVAR ESCOLHA DO USUÁRIO
// =========================================

async function salvarEscolhaUsuario() {

    if (!usuarioAtual) return;

    selectInstituicao.disabled = true;

    try {

        await salvarInstituicaoInteresse(
            usuarioAtual.uid,
            selectInstituicao.value
        );

        console.log("Instituição de interesse atualizada!");

    } catch (error) {

        console.error("Erro ao salvar instituição:", error);

        alert("Não foi possível salvar sua instituição de interesse.");

    } finally {

        selectInstituicao.disabled = false;

    }
}


// =========================================
// INICIALIZAÇÃO
// =========================================

async function iniciar() {

    if (!selectInstituicao) {
        console.error("Select de instituição não encontrado.");
        return;
    }

    selectInstituicao.disabled = true;

    try {

        await carregarInstituicoes();

        onAuthStateChanged(auth, async usuario => {

            usuarioAtual = usuario;

            if (!usuario) {
                selectInstituicao.disabled = true;
                return;
            }

            selectInstituicao.disabled = true;

            try {

                await carregarEscolhaUsuario(usuario.uid);

                selectInstituicao.disabled = false;

            } catch (error) {

                console.error("Erro ao carregar escolha:", error);

            }

        });

        selectInstituicao.addEventListener(
            "change",
            salvarEscolhaUsuario
        );

    } catch (error) {

        console.error("Erro ao inicializar instituição:", error);

        selectInstituicao.innerHTML = `
            <option value="">Não foi possível carregar as instituições</option>
        `;

    }
}

iniciar();
