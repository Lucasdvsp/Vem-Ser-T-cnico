
import { auth } from "./firebase/auth.js";
import { cadastrarPerfil } from "./firebase/database.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// ELEMENTOS DA TELA
const formulario = document.getElementById("formTelaCadastro");
const botao = formulario.querySelector('button[type="submit"]');

const selectCidade = document.getElementById(
    "CidadeInputCadastro2"
);

const inputDataNascimento = document.getElementById(
    "DataNascimentoInputCadastro2"
);

const selectCurso = document.getElementById(
    "cursoInputCadastro2"
);

const selectSerie = document.getElementById(
    "sérieInputCadastro2"
);

// DADOS DA PRIMEIRA ETAPA
const dadosEtapa1 = JSON.parse(
    sessionStorage.getItem("cadastroEtapa1") || "null"
);

let usuarioAutenticado = null;

// VERIFICAR AUTENTICAÇÃO
onAuthStateChanged(auth, (usuario) => {

    if (!usuario) {
        alert("Você precisa realizar a primeira etapa do cadastro.");
        window.location.href = "/screens/Cadastro-Login/cadastro.html";
        return;
    }

    usuarioAutenticado = usuario;

    if (!dadosEtapa1) {
        alert("Não encontramos os dados da primeira etapa.");
        window.location.href = "/screens/Cadastro-Login/cadastro.html";
        return;
    }

});

// CARREGAR MUNICÍPIOS DO IBGE
async function carregarMunicipios() {

    try {

        const resposta = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios?orderBy=nome"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a API do IBGE.");
        }

        const municipios = await resposta.json();

        selectCidade.innerHTML =
            '<option value="">Selecione sua cidade</option>';

        municipios.forEach(municipio => {

            const option = document.createElement("option");

            option.value = municipio.id;
            option.textContent = municipio.nome;

            selectCidade.appendChild(option);

        });

    } catch (error) {

        console.error("Erro ao carregar municípios:", error);

        selectCidade.innerHTML =
            '<option value="">Erro ao carregar municípios</option>';

    }

}

carregarMunicipios();

// FINALIZAR CADASTRO
formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!usuarioAutenticado) {
        alert("Aguarde a verificação da sua conta.");
        return;
    }

    if (!dadosEtapa1) {
        alert("Dados da primeira etapa não encontrados.");
        return;
    }

    // CAPTURAR DADOS
    const dataNascimento = inputDataNascimento.value;
    const curso = selectCurso.value;
    const serie = selectSerie.value;
    const cidadeId = selectCidade.value;

    const cidadeNome =
        selectCidade.options[selectCidade.selectedIndex].textContent;

    // VALIDAR CAMPOS
    if (!dataNascimento || !cidadeId || !curso || !serie) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        botao.disabled = true;
        botao.textContent = "Finalizando cadastro...";

        // ORGANIZAR DADOS DO USUÁRIO
        const usuario = {

            nome: dadosEtapa1.nome,
            cpf: dadosEtapa1.cpf,
            email: dadosEtapa1.email,

            dataNascimento: dataNascimento,

            cidade: {
                id: Number(cidadeId),
                nome: cidadeNome
            },

            curso: curso,
            serie: serie

        };

        // SALVAR NO FIRESTORE
        await cadastrarPerfil(
            usuarioAutenticado.uid,
            usuario
        );

        // LIMPAR DADOS TEMPORÁRIOS
        sessionStorage.removeItem("cadastroEtapa1");

        console.log("Cadastro completo:", usuario);

        alert("Cadastro realizado com sucesso!");

        // REDIRECIONAR PARA A HOME DA PLATAFORMA
        window.location.href = "/screens/Plataforma/home.html";

    } catch (error) {

        console.error("Erro ao finalizar cadastro:", error);

        alert("Não foi possível finalizar seu cadastro.");

        botao.disabled = false;
        botao.textContent = "Próximo";

    }

});
