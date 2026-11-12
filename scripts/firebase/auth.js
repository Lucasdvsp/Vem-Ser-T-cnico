
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
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

export { auth };
