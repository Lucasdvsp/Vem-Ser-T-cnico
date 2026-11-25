// =========================================
// ELEMENTOS
// =========================================

const btnEditarPerfil =
    document.getElementById("btnEditarPerfil");

const btnVoltarMaterias =
    document.getElementById("btnVoltarMaterias");

const btnEditarDados =
    document.getElementById("btnEditarDados");

const viewMaterias =
    document.getElementById("viewMaterias");

const viewEditarPerfil =
    document.getElementById("viewEditarPerfil");


// =========================================
// ABRIR EDIÇÃO
// =========================================

function abrirEdicao(evento) {

    evento?.preventDefault();

    viewMaterias.hidden = true;

    viewEditarPerfil.hidden = false;

    window.location.hash = "editar-perfil";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================
// VOLTAR PARA MATÉRIAS
// =========================================

function voltarMaterias(evento) {

    evento?.preventDefault();

    viewEditarPerfil.hidden = true;

    viewMaterias.hidden = false;

    history.replaceState(
        null,
        "",
        window.location.pathname +
        window.location.search
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================
// EVENTOS
// =========================================

btnEditarPerfil?.addEventListener(
    "click",
    abrirEdicao
);

btnEditarDados?.addEventListener(
    "click",
    abrirEdicao
);

btnVoltarMaterias?.addEventListener(
    "click",
    voltarMaterias
);


// =========================================
// ESTADO INICIAL
// =========================================

// A tela de matérias é sempre a tela inicial.

viewMaterias.hidden = false;

viewEditarPerfil.hidden = true;