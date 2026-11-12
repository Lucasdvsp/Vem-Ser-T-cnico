
import { logarUsuario } from "./firebase/auth.js";
import { buscarPerfil } from "./firebase/database.js";

const formulario = document.getElementById("formTelaCadastro");
const botao = formulario.querySelector('button[type="submit"]');

// REALIZAR LOGIN
formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha o e-mail e a senha.");
        return;
    }

    try {

        botao.disabled = true;
        botao.textContent = "Entrando...";

        // AUTENTICAR USUÁRIO
        const usuario = await logarUsuario(email, senha);

        console.log("Login realizado!");
        console.log("UID:", usuario.uid);

        // BUSCAR PERFIL NO FIRESTORE
        const perfil = await buscarPerfil(usuario.uid);

        if (!perfil) {
            alert("Não encontramos o perfil deste usuário no banco de dados.");
            botao.disabled = false;
            botao.textContent = "Entrar";
            return;
        }

        if (!perfil.cadastroCompleto) {
            alert("Seu cadastro ainda não foi concluído.");
            botao.disabled = false;
            botao.textContent = "Entrar";
            return;
        }

        // EXIBIR DADOS RECUPERADOS
        console.log("Perfil recuperado:", perfil);
        console.log("Nome:", perfil.nome);
        console.log("Curso:", perfil.curso);
        console.log("Cidade:", perfil.cidade.nome);

        alert(`Bem-vindo, ${perfil.nome}!`);

        // REDIRECIONAR
        window.location.href = "/screens/home.html";

    } catch (error) {

        console.error("Erro no login:", error);
        console.error("Código:", error.code);

        const mensagens = {
            "auth/invalid-credential": "E-mail ou senha incorretos.",
            "auth/user-not-found": "Não encontramos uma conta com esse e-mail.",
            "auth/wrong-password": "Senha incorreta.",
            "auth/invalid-email": "O e-mail informado é inválido.",
            "auth/user-disabled": "Esta conta foi desativada.",
            "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
            "auth/network-request-failed": "Verifique sua conexão com a internet."
        };

        alert(
            mensagens[error.code] ||
            "Não foi possível realizar o login."
        );

        botao.disabled = false;
        botao.textContent = "Entrar";

    }

});
