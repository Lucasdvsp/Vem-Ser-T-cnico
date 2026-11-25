
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { app } from "./config.js";

const auth = getAuth(app);

// CADASTRAR USUÁRIO
export async function cadastrarUsuario(email, senha, nome) {
    try {
        const resultado = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );

        await updateProfile(resultado.user, {
            displayName: nome
        });

        return resultado.user;

    } catch (error) {
        console.error("Erro no cadastro:", error);
        throw error;
    }
}

// FAZER LOGIN
export async function logarUsuario(email, senha) {
    try {
        const resultado = await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        return resultado.user;

    } catch (error) {
        console.error("Erro no login:", error);
        throw error;
    }
}

// FAZER LOGOUT
export async function sairDaConta() {
    try {
        await signOut(auth);

    } catch (error) {
        console.error("Erro no logout:", error);
        throw error;
    }
}

// ALTERAR SENHA
export async function alterarSenha(senhaAtual, novaSenha) {
    try {
        const usuario = auth.currentUser;

        if (!usuario) {
            throw new Error("Nenhum usuário autenticado.");
        }

        if (!usuario.email) {
            throw new Error("E-mail do usuário não encontrado.");
        }

        // Criar credencial com e-mail e senha atual
        const credencial = EmailAuthProvider.credential(
            usuario.email,
            senhaAtual
        );

        // Confirmar a identidade do usuário
        await reauthenticateWithCredential(
            usuario,
            credencial
        );

        // Atualizar senha no Firebase Authentication
        await updatePassword(
            usuario,
            novaSenha
        );

        console.log("Senha alterada com sucesso!");

        return true;

    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        throw error;
    }
}

export { auth };
