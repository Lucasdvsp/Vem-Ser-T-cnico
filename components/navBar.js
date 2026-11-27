class NavBarPlataforma extends HTMLElement {

    connectedCallback() {
        try {
            this.innerHTML = `
                <header class="navBarPlataforma">

                    <a href="/screens/home.html"
                       class="navBarPlataforma__logo"
                       aria-label="Página inicial">

                        <img
                            src="/asssets/LogoVerm.png"
                            alt="Vem Ser Técnico"
                        >

                    </a>

                    <nav class="navBarPlataforma__nav"
                         aria-label="Navegação principal">

                        <a href="/screens/home.html">Home</a>

                        <a href="/screens/Telas-Aulas/aulas.html">Aulas</a>

                        <a href="/screens/exercicios.html">Exercícios</a>

                        <a href="/screens/simulados.html">Simulados</a>

                        <a href="/screens/Tela-Instituicoes/instituicoes.html">Instituições</a>

                    </nav>

                    <a href="/screens/perfil.html"
                       class="navBarPlataforma__perfil"
                       aria-label="Meu perfil">

                        <span class="iconePerfil">
                            <span class="cabecaPerfil"></span>
                            <span class="corpoPerfil"></span>
                        </span>

                    </a>

                </header>
            `;

            this.marcarLinkAtivo();
        } catch (erro) {
            console.error("Erro ao renderizar nav-bar:", erro);
        }
    }

    normalizarRota(caminho) {
        return (caminho || "")
            .toLowerCase()
            .replace(/\/index\.html$/, "/")
            .replace(/\/+$/, "") || "/";
    }

    marcarLinkAtivo() {
        const rotaAtual = this.normalizarRota(window.location.pathname);
        const links = this.querySelectorAll(".navBarPlataforma__nav a");

        links.forEach(link => {
            const href = link.getAttribute("href");
            if (!href) return;

            let caminhoLink = href;
            try {
                caminhoLink = new URL(href, window.location.origin).pathname;
            } catch (_) {
                caminhoLink = href;
            }

            const rotaLink = this.normalizarRota(caminhoLink);
            const estaAtivo = rotaAtual === rotaLink;

            link.classList.toggle("navAtiva", estaAtivo);
        });
    }
}

if (!customElements.get('nav-bar')) {
    customElements.define('nav-bar', NavBarPlataforma);
}