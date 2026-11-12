
import { cadastrarUsuario } from "./firebase/auth.js";

const formulario = document.getElementById("formTelaCadastro");
const botao = formulario.querySelector('button[type="submit"]');

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!nome || !cpf || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve possuir pelo menos 6 caracteres.");
        return;
    }

    try {
        botao.disabled = true;
        botao.textContent = "Cadastrando...";

        const usuario = await cadastrarUsuario(email, senha, nome);

        sessionStorage.setItem("cadastroEtapa1", JSON.stringify({
            nome,
            cpf,
            email
        }));

        console.log("Conta criada com sucesso!");
        console.log("UID:", usuario.uid);

        window.location.href = "/screens/Cadastro-Login/cadastro2.html";

    } catch (error) {

        console.error("Código do erro:", error.code);

        const mensagens = {
            "auth/email-already-in-use": "Este e-mail já está cadastrado.",
            "auth/invalid-email": "O e-mail informado é inválido.",
            "auth/weak-password": "A senha deve possuir pelo menos 6 caracteres.",
            "auth/network-request-failed": "Verifique sua conexão com a internet.",
            "auth/invalid-api-key": "A chave de API do Firebase é inválida."
        };

        alert(mensagens[error.code] || "Não foi possível realizar o cadastro.");

        botao.disabled = false;
        botao.textContent = "Próximo";
    }
});
