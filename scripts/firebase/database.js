
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { app } from "./config.js";

const db = getFirestore(app);


// =========================================
// CADASTRAR PERFIL
// =========================================

export async function cadastrarPerfil(uid, usuario) {

    if (!uid) {
        throw new Error("UID do usuário não informado.");
    }

    try {

        const referencia = doc(db, "usuarios", uid);

        await setDoc(referencia, {
            ...usuario,
            cadastroCompleto: true,
            dataCadastro: serverTimestamp()
        });

        console.log("Perfil cadastrado com sucesso!");

        return true;

    } catch (error) {

        console.error("Erro ao cadastrar perfil:", error);

        throw error;

    }
}


// =========================================
// BUSCAR PERFIL
// =========================================

export async function buscarPerfil(uid) {

    if (!uid) {
        throw new Error("UID do usuário não informado.");
    }

    try {

        const referencia = doc(db, "usuarios", uid);

        const documento = await getDoc(referencia);

        if (!documento.exists()) {
            return null;
        }

        return documento.data();

    } catch (error) {

        console.error("Erro ao buscar perfil:", error);

        throw error;

    }
}


// =========================================
// ATUALIZAR PERFIL
// Preserva os campos não enviados
// =========================================

export async function atualizarPerfil(uid, dados) {

    if (!uid) {
        throw new Error("UID do usuário não informado.");
    }

    try {

        const referencia = doc(db, "usuarios", uid);

        await setDoc(referencia, {
            ...dados,
            ultimaAtualizacao: serverTimestamp()
        }, {
            merge: true
        });

        console.log("Perfil atualizado com sucesso!");

        return true;

    } catch (error) {

        console.error("Erro ao atualizar perfil:", error);

        throw error;

    }
}


// =========================================
// EXCLUIR PERFIL
// =========================================

export async function excluirPerfil(uid) {

    if (!uid) {
        throw new Error("UID do usuário não informado.");
    }

    try {

        const referencia = doc(db, "usuarios", uid);

        await deleteDoc(referencia);

        console.log("Perfil removido do Firestore.");

        return true;

    } catch (error) {

        console.error("Erro ao excluir perfil:", error);

        throw error;

    }
}


// =========================================
// RESTAURAR PERFIL
// =========================================

export async function restaurarPerfil(uid, dados) {

    if (!uid) {
        throw new Error("UID do usuário não informado.");
    }

    if (!dados) {
        throw new Error("Dados do perfil não informados.");
    }

    try {

        const referencia = doc(db, "usuarios", uid);

        await setDoc(referencia, dados);

        console.log("Perfil restaurado com sucesso!");

        return true;

    } catch (error) {

        console.error("Erro ao restaurar perfil:", error);

        throw error;

    }
}


// =========================================
// EXPORTAR BANCO
// =========================================

export { db };
