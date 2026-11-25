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


// CADASTRAR PERFIL
export async function cadastrarPerfil(uid, usuario) {

    try {

        const referencia = doc(db, "usuarios", uid);

        await setDoc(referencia, {
            ...usuario,
            cadastroCompleto: true,
            dataCadastro: serverTimestamp()
        });

        console.log("Perfil cadastrado com sucesso!");

    } catch (error) {

        console.error("Erro ao cadastrar perfil:", error);
        throw error;
    }
}


// BUSCAR PERFIL
export async function buscarPerfil(uid) {

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


// EXCLUIR PERFIL DO FIRESTORE
export async function excluirPerfil(uid) {

    try {

        const referencia = doc(db, "usuarios", uid);

        await deleteDoc(referencia);

        console.log("Perfil removido do Firestore.");

    } catch (error) {

        console.error("Erro ao excluir perfil:", error);
        throw error;
    }
}


// RESTAURAR PERFIL CASO A EXCLUSÃO DA CONTA FALHE
export async function restaurarPerfil(uid, dados) {

    const referencia = doc(db, "usuarios", uid);

    await setDoc(referencia, dados);

}

export { db };