
class NavBarPlataforma extends HTMLElement {

    connectedCallback() {

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

                    <a href="/screens/home.html"
                       class="navAtiva">
                        Home
                    </a>

                    <a href="#secaoAulas">Aulas</a>

                    <a href="#secaoExercicios">Exercícios</a>

                    <a href="#secaoSimulados">Simulados</a>

                    <a href="#instituicoes">Instituições</a>

                </nav>

                <a href="#perfil"
                   class="navBarPlataforma__perfil"
                   aria-label="Meu perfil">

                    <span class="iconePerfil">
                        <span class="cabecaPerfil"></span>
                        <span class="corpoPerfil"></span>
                    </span>

                </a>

            </header>
        `;
    }
}

if (!customElements.get('nav-bar')) {
    customElements.define('nav-bar', NavBarPlataforma);
}
