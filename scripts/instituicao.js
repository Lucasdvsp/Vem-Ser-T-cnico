
import {
    buscarInstituicaoPorId
} from "./api/instituicoesApi.js";


// =========================================
// ELEMENTOS
// =========================================

const fotoInstituicao = document.getElementById("fotoInstituicao");

const sobreInstituicao = document.getElementById("sobreInstituicao");

const linkInformacoesInstituicao = document.getElementById(
    "linkInformacoesInstituicao"
);

const mensagemInstituicao = document.getElementById(
    "mensagemInstituicao"
);


// =========================================
// CARREGAR INSTITUIÇÃO
// =========================================

async function carregarInstituicao() {

    try {

        mensagemInstituicao.textContent = "Carregando instituição...";
        mensagemInstituicao.hidden = false;

        // Obtém o ID da URL
        const parametros = new URLSearchParams(window.location.search);

        const id = parametros.get("id");

        if (!id) {
            throw new Error("ID da instituição não informado.");
        }

        // Consulta a API
        const instituicao = await buscarInstituicaoPorId(id);

        if (!instituicao) {
            throw new Error("Instituição não encontrada.");
        }

        // Atualiza o título
        document.title = `Vem Ser Técnico - ${instituicao.nome}`;

        // Sobre
        sobreInstituicao.textContent = instituicao.sobre || "Informações não disponíveis.";

        // Foto
        if (instituicao.foto && instituicao.foto.trim() !== "") {

            fotoInstituicao.src = instituicao.foto;
            fotoInstituicao.alt = `Foto da ${instituicao.nome}`;
            fotoInstituicao.hidden = false;

            fotoInstituicao.onerror = () => {
                fotoInstituicao.hidden = true;
            };

        } else {
            fotoInstituicao.hidden = true;
        }

        // Link externo
        if (instituicao.informacoes) {

            linkInformacoesInstituicao.href = instituicao.informacoes;
            linkInformacoesInstituicao.hidden = false;

        } else {

            linkInformacoesInstituicao.hidden = true;

        }

        mensagemInstituicao.hidden = true;

    } catch (erro) {

        console.error("Erro ao carregar instituição:", erro);

        mensagemInstituicao.textContent = erro.message;
        mensagemInstituicao.hidden = false;

    }

}


// =========================================
// INICIALIZAÇÃO
// =========================================

carregarInstituicao();
// =========================================
// BOTÃO VOLTAR
// =========================================

document.getElementById("btnVoltarInstituicao")
    .addEventListener("click", () => {

        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "/instituicoes.html";
        }

    });