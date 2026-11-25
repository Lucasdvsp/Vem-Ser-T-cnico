import { auth } from "./firebase/auth.js";
 
import {
    onAuthStateChanged,
    updateEmail
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
 
import {
    buscarPerfil,
    atualizarPerfil
} from "./firebase/database.js";
 
// ELEMENTOS
const formulario = document.getElementById("formEditarPerfil");
 
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const selectCidade = document.getElementById("cidade");
const selectCurso = document.getElementById("outroCurso");
 
const mensagem = document.getElementById("mensagemPerfil");
const botaoSalvar = document.getElementById("btnSalvar");
 
let usuarioAtual = null;
let perfilAtual = null;
 
// MUNICÍPIOS DO ESTADO DE SP
async function carregarMunicipios() {
    try {
        selectCidade.innerHTML =
            '<option value="">Carregando cidades...</option>';
 
        const resposta = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios?orderBy=nome"
        );
 
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os municípios.");
        }
 
        const municipios = await resposta.json();
 
        selectCidade.innerHTML =
            '<option value="">Selecione sua cidade</option>';
 
        municipios.forEach((municipio) => {
            const option = document.createElement("option");
 
            option.value = municipio.id;
            option.textContent = municipio.nome;
 
            selectCidade.appendChild(option);
        });
 
    } catch (error) {
        console.error("Erro ao carregar municípios:", error);
 
        selectCidade.innerHTML =
            '<option value="">Erro ao carregar cidades</option>';
 
        throw error;
    }
}
 
// FORMATAR CURSO
function formatarCurso(curso) {
    const cursos = {
        "Desenvolvimento_Sistemas": "Desenvolvimento de Sistemas",
        "Informática_Para_Internet": "Informática para a Internet",
        "Informática": "Informática",
        "ADS": "Análise e Desenvolvimento de Sistemas",
        "BigData": "Big Data em Negócios",
        "Desenvolvimento_Software_Multiplataforma": "Desenvolvimento de Software Multiplataforma",
        "Banco_de_Dados": "Banco de Dados",
        "Gestao_da_Tecnologia_da_Informacao": "Gestão da Tecnologia da Informação",
        "JogosDigitais": "Jogos Digitais",
        "Redes": "Redes de Computadores",
        "Ciencia_de_Dados_para_Negocios": "Ciência de Dados para Negócios",
        "Sistemas_para_Internet": "Sistemas para Internet"
    };
 
    return cursos[curso] || curso?.replaceAll("_", " ") || "";
}
 
// PREENCHER FORMULÁRIO COM OS DADOS ATUAIS
async function carregarDadosFormulario() {
    try {
        perfilAtual = await buscarPerfil(usuarioAtual.uid);
 
        if (!perfilAtual) {
            throw new Error("Perfil não encontrado no Firestore.");
        }
 
        inputNome.value = perfilAtual.nome || "";
 
        inputEmail.value =
            perfilAtual.email || usuarioAtual.email || "";
 
        // A cidade é armazenada como objeto:
        // cidade: { id: 123, nome: "Taboão da Serra" }
 
        const cidadeId = perfilAtual.cidade?.id;
 
        if (cidadeId) {
            selectCidade.value = String(cidadeId);
        }
 
        // Selecionar o curso atual
        if (perfilAtual.curso) {
            selectCurso.value = perfilAtual.curso;
        }
 
    } catch (error) {
        console.error("Erro ao carregar formulário:", error);
 
        mensagem.textContent =
            "Não foi possível carregar seus dados.";
 
        mensagem.style.color = "#c9233b";
    }
}
 
// VERIFICAR AUTENTICAÇÃO
onAuthStateChanged(auth, async (usuario) => {
    if (!usuario) {
        window.location.href =
            "/screens/Cadastro-Login/login.html";
 
        return;
    }
 
    usuarioAtual = usuario;
 
    try {
        await carregarMunicipios();
        await carregarDadosFormulario();
    } catch (error) {
        console.error(error);
    }
});
 
// SALVAR ALTERAÇÕES
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
 
    if (!usuarioAtual || !perfilAtual) {
        mensagem.textContent =
            "Não foi possível identificar seu perfil.";
 
        return;
    }
 
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const cidadeId = selectCidade.value;
    const curso = selectCurso.value;
 
    if (!nome || !email) {
        mensagem.textContent =
            "Preencha nome e e-mail.";
 
        return;
    }
 
    // Manter cidade atual se nenhuma nova for selecionada
    let cidade = perfilAtual.cidade || null;
 
    if (cidadeId) {
        const opcao =
            selectCidade.options[selectCidade.selectedIndex];
 
        cidade = {
            id: Number(cidadeId),
            nome: opcao.textContent
        };
    }
 
    // Manter curso atual caso não seja selecionado outro
    const cursoAtualizado = curso || perfilAtual.curso || "";
 
    const dadosAtualizados = {
        nome,
        email,
        cidade,
        curso: cursoAtualizado
    };
 
    try {
        botaoSalvar.disabled = true;
        botaoSalvar.textContent = "Salvando...";
 
        // Atualizar e-mail no Firebase Authentication
        if (email !== usuarioAtual.email) {
            await updateEmail(usuarioAtual, email);
        }
 
        // Atualizar dados no Firestore
        await atualizarPerfil(
            usuarioAtual.uid,
            dadosAtualizados
        );
 
        perfilAtual = {
            ...perfilAtual,
            ...dadosAtualizados
        };
 
        mensagem.textContent =
            "Perfil atualizado com sucesso!";
 
        mensagem.style.color = "#218838";
 
        // Atualizar informações da sidebar
        const nomeSidebar =
            document.getElementById("nomeUsuario");
 
        const emailSidebar =
            document.getElementById("emailUsuario");
 
        const cursoSidebar =
            document.getElementById("cursoUsuario");
 
        if (nomeSidebar) {
            nomeSidebar.textContent = nome;
        }
 
        if (emailSidebar) {
            emailSidebar.textContent = email;
        }
 
        if (cursoSidebar) {
            cursoSidebar.textContent =
                `Cursando ${formatarCurso(cursoAtualizado)}`;
        }
 
    } catch (error) {
        console.error("Erro ao salvar perfil:", error);
 
        if (error.code === "auth/requires-recent-login") {
            mensagem.textContent =
                "Faça login novamente para alterar seu e-mail.";
        } else if (error.code === "auth/invalid-email") {
            mensagem.textContent =
                "O endereço de e-mail informado é inválido.";
        } else {
            mensagem.textContent =
                "Não foi possível salvar as alterações.";
        }
 
        mensagem.style.color = "#c9233b";
 
    } finally {
        botaoSalvar.disabled = false;
        botaoSalvar.textContent = "Salvar";
    }
});