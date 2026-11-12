
import { auth } from "./firebase/auth.js";
import { buscarPerfil } from "./firebase/database.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// OBTER PERFIL DO USUÁRIO AUTENTICADO
export function obterPerfilUsuario() {

    return new Promise((resolve, reject) => {

        const cancelarObservacao = onAuthStateChanged(
            auth,
            async (usuario) => {

                cancelarObservacao();

                if (!usuario) {
                    resolve(null);
                    return;
                }

                try {

                    const perfil = await buscarPerfil(usuario.uid);

                    resolve(perfil);

                } catch (error) {

                    reject(error);

                }

            },
            (error) => {
                reject(error);
            }
        );

    });

}
