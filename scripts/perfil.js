import {
    buscarPerfil,
    excluirPerfil,
    restaurarPerfil
} from "/scripts/firebase/database.js";

import { app } from "/scripts/firebase/config.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
    deleteUser
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


const auth = getAuth(app);


// =========================================
// ELEMENTOS
// =========================================

const nomeUsuario = document.getElementById("nomeUsuario");
const emailUsuario = document.getElementById("emailUsuario");
const cursoUsuario = document.getElementById("cursoUsuario");
const fotoUsuario = document.getElementById("fotoUsuario");

const btnSair = document.getElementById("btnSair");
const btnExcluirConta = document.getElementById("btnExcluirConta");

let usuarioAtual = null;
let perfilAtual = null;


// =========================================
// FORMATAR CURSO
// =========================================

function formatarCurso(curso) {

    if (!curso) {
        return "Curso não informado";
    }

    const cursos = {

        "Desenvolvimento_Sistemas":
            "Desenvolvimento de Sistemas",

        "Informática_Para_Internet":
            "Informática para a Internet",

        "Informática":
            "Informática",

        "Informática ":
            "Informática",

        "ADS":
            "Análise e Desenvolvimento de Sistemas",

        "BigData":
            "Big Data em Negócios",

        "Desenvolvimento_Software_Multiplataforma":
            "Desenvolvimento de Software Multiplataforma",

        "Banco_de_Dados":
            "Banco de Dados",

        "Gestao_da_Tecnologia_da_Informacao":
            "Gestão da Tecnologia da Informação",

        "JogosDigitais":
            "Jogos Digitais",

        "Redes":
            "Redes de Computadores",

        "Ciencia_de_Dados_para_Negocios":
            "Ciência de Dados para Negócios",

        "Sistemas_para_Internet":
            "Sistemas para Internet"

    };

    return cursos[curso] || curso.replaceAll("_", " ");
}


// =========================================
// CARREGAR PERFIL
// =========================================

async function carregarPerfil(usuario) {

    try {

        const perfil = await buscarPerfil(usuario.uid);

        if (!perfil) {

            console.error("Perfil não encontrado.");

            nomeUsuario.textContent = "Perfil não encontrado";
            emailUsuario.textContent = "";
            cursoUsuario.textContent = "";

            return;
        }

        perfilAtual = perfil;

        nomeUsuario.textContent =
            perfil.nome || "Nome não informado";

        emailUsuario.textContent =
            perfil.email || usuario.email || "E-mail não informado";

        cursoUsuario.textContent =
            `Cursando ${formatarCurso(perfil.curso)}`;

        if (perfil.foto && fotoUsuario) {
            fotoUsuario.src = perfil.foto;
        }

        console.log("Perfil carregado:", perfil);

    } catch (error) {

        console.error("Erro ao carregar perfil:", error);

        nomeUsuario.textContent = "Erro ao carregar perfil";
    }
}


// =========================================
// VERIFICAR AUTENTICAÇÃO
// =========================================

onAuthStateChanged(auth, async (usuario) => {

    if (usuario) {

        usuarioAtual = usuario;

        await carregarPerfil(usuario);

    } else {

        window.location.href =
            "/screens/Cadastro-Login/login.html";
    }

});


// =========================================
// BOTÃO SAIR
// =========================================

btnSair?.addEventListener("click", async (evento) => {

    evento.preventDefault();

    const confirmar = confirm(
        "Deseja realmente sair da sua conta?"
    );

    if (!confirmar) {
        return;
    }

    try {

        await signOut(auth);

        window.location.href =
            "/screens/Cadastro-Login/login.html";

    } catch (error) {

        console.error("Erro ao sair:", error);

        alert("Não foi possível sair da conta.");
    }

});


// =========================================
// BOTÃO EXCLUIR CONTA
// =========================================

btnExcluirConta?.addEventListener("click", async (evento) => {

    evento.preventDefault();

    if (!usuarioAtual) {

        alert("Nenhum usuário autenticado.");
        return;
    }

    // PRIMEIRA CONFIRMAÇÃO
    const confirmar = confirm(
        "ATENÇÃO!\n\n" +
        "Deseja realmente excluir sua conta?\n\n" +
        "Essa ação é permanente e você perderá seus dados de perfil."
    );

    if (!confirmar) {
        return;
    }

    // SEGUNDA CONFIRMAÇÃO
    const segundaConfirmacao = confirm(
        "Tem certeza absoluta?\n\n" +
        "Sua conta será excluída permanentemente."
    );

    if (!segundaConfirmacao) {
        return;
    }

    try {

        // DESABILITAR BOTÃO DURANTE PROCESSO
        btnExcluirConta.style.pointerEvents = "none";
        btnExcluirConta.style.opacity = "0.5";

        // 1. EXCLUIR PERFIL DO FIRESTORE
        await excluirPerfil(usuarioAtual.uid);

        // 2. EXCLUIR CONTA DO FIREBASE AUTH
        await deleteUser(usuarioAtual);

        alert("Sua conta foi excluída com sucesso!");

        window.location.href =
            "/screens/Cadastro-Login/login.html";

    } catch (error) {

        console.error("Erro ao excluir conta:", error);

        // TENTAR RESTAURAR O PERFIL
        if (perfilAtual) {

            try {

                await restaurarPerfil(
                    usuarioAtual.uid,
                    perfilAtual
                );

                console.log("Perfil restaurado com sucesso.");

            } catch (erroRestauracao) {

                console.error(
                    "Falha ao restaurar perfil:",
                    erroRestauracao
                );

                alert(
                    "ATENÇÃO: não foi possível excluir sua conta " +
                    "e também houve uma falha ao restaurar seu perfil. " +
                    "Verifique o Firestore."
                );
            }
        }

        // TRATAMENTO DOS ERROS
        if (error.code === "auth/requires-recent-login") {

            alert(
                "Por segurança, o Firebase exige uma autenticação recente.\n\n" +
                "Seu perfil foi restaurado, se necessário. " +
                "Faça login novamente e tente excluir sua conta."
            );

        } else {

            alert(
                "Não foi possível excluir sua conta.\n\n" +
                "Erro: " + error.message
            );
        }

        // REATIVAR BOTÃO
        btnExcluirConta.style.pointerEvents = "auto";
        btnExcluirConta.style.opacity = "1";
    }

});