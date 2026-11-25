import { app } from "/scripts/firebase/config.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
    deleteUser,
    updateEmail
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import { alterarSenha } from "/scripts/firebase/auth.js";

// =========================================
// FIREBASE
// =========================================

const auth = getAuth(app);
const db = getFirestore(app);


// =========================================
// ELEMENTOS DO PERFIL
// =========================================

const nomeUsuario = document.getElementById("nomeUsuario");
const emailUsuario = document.getElementById("emailUsuario");
const cursoUsuario = document.getElementById("cursoUsuario");
const fotoUsuario = document.getElementById("fotoUsuario");


// =========================================
// ELEMENTOS DO FORMULÁRIO
// =========================================

const formEditarPerfil = document.getElementById("formEditarPerfil");

const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoEstado = document.getElementById("estado");
const campoCidade = document.getElementById("cidade");
const campoCurso = document.getElementById("curso");

const btnSalvar = document.getElementById("btnSalvar");
const mensagemPerfil = document.getElementById("mensagemPerfil");


// ELEMENTOS DE ALTERAÇÃO DE SENHA

const viewMaterias = document.getElementById("viewMaterias");
const viewEditarPerfil = document.getElementById("viewEditarPerfil");
const viewAlterarSenha = document.getElementById("viewAlterarSenha");

const btnAlterarSenha = document.getElementById("btnAlterarSenha");
const btnVoltarSenha = document.getElementById("btnVoltarSenha");

const formAlterarSenha = document.getElementById("formAlterarSenha");

const campoSenhaAtual = document.getElementById("senhaAtual");
const campoNovaSenha = document.getElementById("novaSenha");
const campoConfirmarSenha = document.getElementById("confirmarSenha");

const btnSalvarSenha = document.getElementById("btnSalvarSenha");
const mensagemSenha = document.getElementById("mensagemSenha");
// =========================================
// BOTÕES DA SIDEBAR
// =========================================

const btnSair = document.getElementById("btnSair");
const btnExcluirConta = document.getElementById("btnExcluirConta");


// =========================================
// VARIÁVEIS
// =========================================

let usuarioAtual = null;
let perfilAtual = null;

let estadosCarregados = false;


// =========================================
// CURSOS
// =========================================

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


// =========================================
// FORMATAR CURSO
// =========================================

function formatarCurso(curso) {

    if (!curso) {
        return "Curso não informado";
    }

    return cursos[curso] || curso.replaceAll("_", " ");
}


// =========================================
// MENSAGENS
// =========================================

function mostrarMensagem(texto, tipo = "") {

    if (!mensagemPerfil) return;

    mensagemPerfil.textContent = texto;

    mensagemPerfil.className = tipo;

}


// =========================================
// BUSCAR PERFIL NO FIRESTORE
// =========================================

async function buscarPerfil(uid) {

    const referencia = doc(db, "usuarios", uid);

    const documento = await getDoc(referencia);

    if (!documento.exists()) {
        return null;
    }

    return documento.data();

}


// =========================================
// SALVAR PERFIL NO FIRESTORE
// =========================================

async function salvarPerfil(uid, dados) {

    const referencia = doc(db, "usuarios", uid);

    await setDoc(referencia, dados, {
        merge: true
    });

}


// =========================================
// EXCLUIR PERFIL DO FIRESTORE
// =========================================

async function excluirPerfilFirestore(uid) {

    const referencia = doc(db, "usuarios", uid);

    await deleteDoc(referencia);

}


// =========================================
// RESTAURAR PERFIL
// =========================================

async function restaurarPerfilFirestore(uid, dados) {

    const referencia = doc(db, "usuarios", uid);

    await setDoc(referencia, dados);

}


// =========================================
// ATUALIZAR SIDEBAR
// =========================================

function atualizarSidebar(perfil, usuario) {

    nomeUsuario.textContent =
        perfil.nome || usuario.displayName || "Nome não informado";

    emailUsuario.textContent =
        perfil.email || usuario.email || "E-mail não informado";


    const curso = formatarCurso(perfil.curso);

    cursoUsuario.textContent =
        `Cursando ${curso}`;


    if (perfil.foto) {

        fotoUsuario.src = perfil.foto;

    } else {

        fotoUsuario.src = "/assets/perfilPadrao.png";

    }

}


// =========================================
// CARREGAR PERFIL
// =========================================

async function carregarPerfil(usuario) {

    try {

        const perfil = await buscarPerfil(usuario.uid);

        perfilAtual = perfil || {};

        atualizarSidebar(perfilAtual, usuario);

        await preencherFormulario(perfilAtual, usuario);

        console.log("Perfil carregado:", perfilAtual);

    } catch (error) {

        console.error("Erro ao carregar perfil:", error);

        nomeUsuario.textContent = "Erro ao carregar perfil";

        mostrarMensagem(
            "Não foi possível carregar seus dados.",
            "erro"
        );

    }

}


// =========================================
// API IBGE - ESTADOS
// =========================================

async function carregarEstados() {

    if (estadosCarregados) {
        return;
    }

    campoEstado.innerHTML =
        '<option value="">Carregando estados...</option>';

    try {

        const resposta = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os estados.");
        }

        const estados = await resposta.json();

        campoEstado.innerHTML =
            '<option value="">Selecione seu estado</option>';


        estados.forEach(estado => {

            const option = document.createElement("option");

            option.value = estado.id;

            option.textContent =
                `${estado.nome} (${estado.sigla})`;

            option.dataset.uf = estado.sigla;

            option.dataset.nome = estado.nome;

            campoEstado.appendChild(option);

        });

        estadosCarregados = true;

    } catch (error) {

        console.error("Erro ao carregar estados:", error);

        campoEstado.innerHTML =
            '<option value="">Erro ao carregar estados</option>';

        throw error;

    }

}


// =========================================
// API IBGE - CIDADES
// =========================================

async function carregarCidades(
    estadoId,
    cidadeSelecionada = null
) {

    campoCidade.disabled = true;

    campoCidade.innerHTML =
        '<option value="">Carregando municípios...</option>';


    if (!estadoId) {

        campoCidade.innerHTML =
            '<option value="">Selecione um estado primeiro</option>';

        return;

    }


    try {

        const resposta = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios?orderBy=nome`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar municípios.");
        }

        const cidades = await resposta.json();

        campoCidade.innerHTML =
            '<option value="">Selecione sua cidade</option>';


        cidades.forEach(cidade => {

            const option = document.createElement("option");

            option.value = cidade.id;

            option.textContent = cidade.nome;

            campoCidade.appendChild(option);

        });


        // Selecionar cidade salva

        if (cidadeSelecionada) {

            if (typeof cidadeSelecionada === "object") {

                if (cidadeSelecionada.id) {

                    campoCidade.value =
                        String(cidadeSelecionada.id);

                } else if (cidadeSelecionada.nome) {

                    selecionarCidadePorNome(
                        cidadeSelecionada.nome
                    );

                }

            } else {

                selecionarCidadePorNome(
                    cidadeSelecionada
                );

            }

        }


        campoCidade.disabled = false;

    } catch (error) {

        console.error("Erro ao carregar municípios:", error);

        campoCidade.innerHTML =
            '<option value="">Erro ao carregar municípios</option>';

        campoCidade.disabled = true;

        throw error;

    }

}


// =========================================
// SELECIONAR CIDADE PELO NOME
// =========================================

function selecionarCidadePorNome(nome) {

    if (!nome) return;

    const cidadeEncontrada = [...campoCidade.options].find(
        option =>
            option.textContent.trim().toLowerCase() ===
            String(nome).trim().toLowerCase()
    );

    if (cidadeEncontrada) {

        campoCidade.value = cidadeEncontrada.value;

    }

}


// =========================================
// DESCOBRIR ESTADO DE CIDADE LEGADA
// =========================================

async function localizarCidadeAntiga(nomeCidade) {

    if (!nomeCidade) return null;

    try {

        const resposta = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome"
        );

        if (!resposta.ok) {
            return null;
        }

        const municipios = await resposta.json();

        const cidadeEncontrada = municipios.find(
            municipio =>
                municipio.nome.toLowerCase() ===
                String(nomeCidade).trim().toLowerCase()
        );

        if (!cidadeEncontrada) {
            return null;
        }

        return {

            cidadeId: cidadeEncontrada.id,

            estadoId: cidadeEncontrada.microrregiao
                ?.mesorregiao
                ?.UF
                ?.id || null,

            cidadeNome: cidadeEncontrada.nome

        };

    } catch (error) {

        console.error(
            "Erro ao localizar cidade antiga:",
            error
        );

        return null;

    }

}


// =========================================
// PREENCHER FORMULÁRIO
// =========================================

async function preencherFormulario(perfil, usuario) {

    campoNome.value =
        perfil.nome || usuario.displayName || "";

    campoEmail.value =
        perfil.email || usuario.email || "";

    campoCurso.value =
        perfil.curso || "";


    // ESTADOS

    await carregarEstados();


    const cidadeSalva = perfil.cidade || null;

    const estadoSalvo = perfil.estado || null;


    let estadoId = null;


    // Estado em objeto

    if (estadoSalvo && typeof estadoSalvo === "object") {

        estadoId = estadoSalvo.id || null;

        if (!estadoId && estadoSalvo.uf) {

            const estadoEncontrado = [...campoEstado.options].find(
                option =>
                    option.dataset.uf === estadoSalvo.uf
            );

            estadoId = estadoEncontrado?.value || null;

        }

    }


    // Estado salvo diretamente como ID

    if (!estadoId && estadoSalvo) {

        estadoId = estadoSalvo;

    }


    // Estado identificado pelo ID da cidade

    if (!estadoId && typeof cidadeSalva === "object" && cidadeSalva.id) {

        estadoId = String(cidadeSalva.id).substring(0, 2);

    }


    // Compatibilidade com perfis antigos
    // que armazenavam somente o nome da cidade

    if (!estadoId && typeof cidadeSalva === "string") {

        const localizacao = await localizarCidadeAntiga(cidadeSalva);

        if (localizacao) {

            estadoId = localizacao.estadoId;

        }

    }


    if (estadoId) {

        campoEstado.value = String(estadoId);

        await carregarCidades(
            estadoId,
            cidadeSalva
        );

    } else {

        campoCidade.innerHTML =
            '<option value="">Selecione um estado primeiro</option>';

        campoCidade.disabled = true;

    }

}


// =========================================
// EVENTO ESTADO
// =========================================

campoEstado.addEventListener("change", async () => {

    await carregarCidades(campoEstado.value);

});


// =========================================
// AUTENTICAÇÃO
// =========================================

onAuthStateChanged(auth, async usuario => {

    if (usuario) {

        usuarioAtual = usuario;

        await carregarPerfil(usuario);

    } else {

        window.location.replace(
            "/screens/Cadastro-Login/login.html"
        );

    }

});


// =========================================
// SALVAR PERFIL
// =========================================

formEditarPerfil.addEventListener("submit", async evento => {

    evento.preventDefault();


    if (!usuarioAtual) {

        mostrarMensagem(
            "Você não está autenticado.",
            "erro"
        );

        return;

    }


    const nome = campoNome.value.trim();

    const email = campoEmail.value.trim();

    const curso = campoCurso.value;

    const estadoId = campoEstado.value;

    const cidadeId = campoCidade.value;


    // VALIDAR NOME

    if (!nome) {

        mostrarMensagem("Informe seu nome.", "erro");

        campoNome.focus();

        return;

    }


    // VALIDAR EMAIL

    if (!email) {

        mostrarMensagem("Informe seu e-mail.", "erro");

        campoEmail.focus();

        return;

    }


    // VALIDAR ESTADO

    if (!estadoId) {

        mostrarMensagem(
            "Selecione seu estado.",
            "erro"
        );

        campoEstado.focus();

        return;

    }


    // VALIDAR CIDADE

    if (!cidadeId) {

        mostrarMensagem(
            "Selecione sua cidade.",
            "erro"
        );

        campoCidade.focus();

        return;

    }


    // VALIDAR CURSO

    if (!curso) {

        mostrarMensagem(
            "Selecione seu curso.",
            "erro"
        );

        campoCurso.focus();

        return;

    }


    const cidadeOption =
        campoCidade.selectedOptions[0];

    const estadoOption =
        campoEstado.selectedOptions[0];


    const novosDados = {

        nome,

        email,

        curso,

        cidade: {

            id: Number(cidadeId),

            nome: cidadeOption.textContent

        },

        estado: {

            id: Number(estadoId),

            uf: estadoOption.dataset.uf,

            nome: estadoOption.dataset.nome

        }

    };


    const perfilAnterior = {
        ...perfilAtual
    };


    const emailAnterior = usuarioAtual.email;


    try {

        btnSalvar.disabled = true;

        btnSalvar.textContent = "Salvando...";

        mostrarMensagem("");


        // ATUALIZAR EMAIL NO AUTH
        // Apenas se houve alteração

        if (email !== emailAnterior) {

            await updateEmail(
                usuarioAtual,
                email
            );

        }


        // SALVAR FIRESTORE

        await salvarPerfil(
            usuarioAtual.uid,
            novosDados
        );


        // ATUALIZAR LOCALMENTE

        perfilAtual = {

            ...perfilAtual,

            ...novosDados

        };


        atualizarSidebar(
            perfilAtual,
            usuarioAtual
        );


        mostrarMensagem(
            "Perfil atualizado com sucesso!",
            "sucesso"
        );


    } catch (error) {

        console.error(
            "Erro ao atualizar perfil:",
            error
        );


        // TENTAR RESTAURAR EMAIL
        // Se o Firestore falhar após atualizar o Auth

        if (
            email !== emailAnterior &&
            usuarioAtual.email === email
        ) {

            try {

                await updateEmail(
                    usuarioAtual,
                    emailAnterior
                );

            } catch (erroRollback) {

                console.error(
                    "Não foi possível restaurar o e-mail:",
                    erroRollback
                );

            }

        }


        if (error.code === "auth/requires-recent-login") {

            mostrarMensagem(
                "Por segurança, faça login novamente para alterar seu e-mail.",
                "erro"
            );

        } else if (error.code === "auth/invalid-email") {

            mostrarMensagem(
                "O e-mail informado é inválido.",
                "erro"
            );

        } else if (error.code === "auth/email-already-in-use") {

            mostrarMensagem(
                "Este e-mail já está sendo usado por outra conta.",
                "erro"
            );

        } else {

            mostrarMensagem(
                "Erro ao salvar perfil: " + error.message,
                "erro"
            );

        }


        perfilAtual = perfilAnterior;


    } finally {

        btnSalvar.disabled = false;

        btnSalvar.textContent =
            "Salvar alterações";

    }

});


// =========================================
// SAIR DA CONTA
// =========================================

btnSair.addEventListener("click", async evento => {

    evento.preventDefault();


    const confirmar = confirm(
        "Deseja realmente sair da sua conta?"
    );

    if (!confirmar) return;


    try {

        btnSair.style.pointerEvents = "none";

        await signOut(auth);

        window.location.replace(
            "/screens/Cadastro-Login/login.html"
        );

    } catch (error) {

        console.error("Erro ao sair:", error);

        alert(
            "Não foi possível sair da conta.\n\n" +
            error.message
        );

        btnSair.style.pointerEvents = "auto";

    }

});


// =========================================
// EXCLUIR CONTA
// =========================================

btnExcluirConta.addEventListener("click", async evento => {

    evento.preventDefault();


    if (!usuarioAtual) {

        alert("Nenhum usuário autenticado.");

        return;

    }


    const confirmar = confirm(
        "ATENÇÃO!\n\n" +
        "Deseja realmente excluir sua conta?\n\n" +
        "Essa ação é permanente e você perderá seus dados."
    );

    if (!confirmar) return;


    const segundaConfirmacao = confirm(
        "Tem certeza absoluta?\n\n" +
        "Sua conta será excluída permanentemente."
    );

    if (!segundaConfirmacao) return;


    try {

        btnExcluirConta.style.pointerEvents = "none";

        btnExcluirConta.style.opacity = "0.5";


        // GUARDAR DADOS PARA POSSÍVEL RESTAURAÇÃO

        const dadosBackup = perfilAtual
            ? { ...perfilAtual }
            : null;


        // EXCLUIR DOCUMENTO

        await excluirPerfilFirestore(
            usuarioAtual.uid
        );


        // EXCLUIR CONTA AUTH

        await deleteUser(usuarioAtual);


        alert("Conta excluída com sucesso!");

        window.location.replace(
            "/screens/Cadastro-Login/login.html"
        );


    } catch (error) {

        console.error(
            "Erro ao excluir conta:",
            error
        );


        // RESTAURAR DOCUMENTO CASO A EXCLUSÃO AUTH FALHE

        try {

            if (perfilAtual) {

                await restaurarPerfilFirestore(
                    usuarioAtual.uid,
                    perfilAtual
                );

            }

        } catch (erroRestauracao) {

            console.error(
                "Erro ao restaurar perfil:",
                erroRestauracao
            );

            alert(
                "A exclusão falhou e houve um erro ao restaurar o perfil. " +
                "Entre em contato com o suporte."
            );

        }


        if (error.code === "auth/requires-recent-login") {

            alert(
                "O Firebase exige uma autenticação recente.\n\n" +
                "Faça login novamente e tente excluir sua conta."
            );

        } else {

            alert(
                "Não foi possível excluir a conta.\n\n" +
                error.message
            );

        }


        btnExcluirConta.style.pointerEvents = "auto";

        btnExcluirConta.style.opacity = "1";

    }

});

// =========================================
// NAVEGAÇÃO - ALTERAR SENHA
// =========================================

btnAlterarSenha.addEventListener("click", evento => {

    evento.preventDefault();

    viewMaterias.hidden = true;
    viewEditarPerfil.hidden = true;
    viewAlterarSenha.hidden = false;

    formAlterarSenha.reset();

    mensagemSenha.textContent = "";
    mensagemSenha.className = "";

});


// =========================================
// VOLTAR AO PERFIL
// =========================================

btnVoltarSenha.addEventListener("click", () => {

    viewAlterarSenha.hidden = true;
    viewEditarPerfil.hidden = true;
    viewMaterias.hidden = false;

    formAlterarSenha.reset();

    mensagemSenha.textContent = "";
    mensagemSenha.className = "";

});


// =========================================
// MENSAGEM DE ALTERAÇÃO DE SENHA
// =========================================

function mostrarMensagemSenha(texto, tipo = "") {

    mensagemSenha.textContent = texto;
    mensagemSenha.className = tipo;

}


// =========================================
// ALTERAR SENHA
// =========================================

formAlterarSenha.addEventListener("submit", async evento => {

    evento.preventDefault();

    const senhaAtual = campoSenhaAtual.value;
    const novaSenha = campoNovaSenha.value;
    const confirmarSenha = campoConfirmarSenha.value;


    // VALIDAR SENHA ATUAL

    if (!senhaAtual) {

        mostrarMensagemSenha(
            "Informe sua senha atual.",
            "erro"
        );

        campoSenhaAtual.focus();
        return;

    }


    // VALIDAR TAMANHO DA NOVA SENHA

    if (novaSenha.length < 6) {

        mostrarMensagemSenha(
            "A nova senha deve ter pelo menos 6 caracteres.",
            "erro"
        );

        campoNovaSenha.focus();
        return;

    }


    // IMPEDIR REPETIÇÃO DA SENHA ATUAL

    if (senhaAtual === novaSenha) {

        mostrarMensagemSenha(
            "A nova senha deve ser diferente da atual.",
            "erro"
        );

        campoNovaSenha.focus();
        return;

    }


    // CONFIRMAR SENHA

    if (novaSenha !== confirmarSenha) {

        mostrarMensagemSenha(
            "As novas senhas não coincidem.",
            "erro"
        );

        campoConfirmarSenha.focus();
        return;

    }


    try {

        btnSalvarSenha.disabled = true;
        btnSalvarSenha.textContent = "Alterando...";

        mostrarMensagemSenha("");


        // CHAMAR FIREBASE AUTHENTICATION

        await alterarSenha(
            senhaAtual,
            novaSenha
        );


        mostrarMensagemSenha(
            "Senha alterada com sucesso!",
            "sucesso"
        );


        // LIMPAR CAMPOS

        formAlterarSenha.reset();


    } catch (error) {

        console.error(
            "Erro ao alterar senha:",
            error
        );


        const mensagens = {

            "auth/wrong-password":
                "A senha atual está incorreta.",

            "auth/invalid-credential":
                "A senha atual está incorreta.",

            "auth/weak-password":
                "A nova senha é muito fraca.",

            "auth/requires-recent-login":
                "Sua sessão expirou. Entre novamente para alterar a senha.",

            "auth/too-many-requests":
                "Muitas tentativas. Tente novamente mais tarde.",

            "auth/network-request-failed":
                "Verifique sua conexão com a internet."

        };


        mostrarMensagemSenha(
            mensagens[error.code] ||
            "Não foi possível alterar sua senha.",
            "erro"
        );

    } finally {

        btnSalvarSenha.disabled = false;
        btnSalvarSenha.textContent = "Alterar senha";

    }

});
// =========================================
// VISUALIZAR / OCULTAR SENHA
// =========================================

document.querySelectorAll("#formAlterarSenha .btnVerSenha")
    .forEach(botao => {

        botao.addEventListener("click", () => {

            const campo = botao.parentElement.querySelector("input");

            const mostrar = campo.type === "password";

            campo.type = mostrar ? "text" : "password";

            botao.setAttribute(
                "aria-label",
                mostrar ? "Ocultar senha" : "Mostrar senha"
            );

            botao.setAttribute("aria-pressed", String(mostrar));

            botao.innerHTML = mostrar
                ? `
                    <svg viewBox="0 0 24 24">
                        <path d="M3 3l18 18"/>
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
                        <path d="M9.9 5.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3.1 3.9"/>
                        <path d="M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.6"/>
                    </svg>
                `
                : `
                    <svg viewBox="0 0 24 24">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                `;
        });
    });