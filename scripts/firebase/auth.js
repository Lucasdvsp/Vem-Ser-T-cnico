import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { app } from './config'

const auth = getAuth(app)

export async function cadastrarUsuario(email, senha){
    try{
        const usuario = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );
        return usuario.user;
    } catch (error){
        console.error("Erro no cadastro", error);
        throw error;
    }
}
export async function logarUsuario(email, senha){
    try{
        const usuario = await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );
        return usuario.user;
    } catch (error){
        console.error("Erro no login", error);
        throw error;
    }
}
export async function sairDaConta(){
    try {
        await signOut(auth);
    } catch (error){
        console.error("Erro no logout", error)
        throw error;
    }
}

export { auth }