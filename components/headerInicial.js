class SiteHeader extends HTMLElement {
    connectedCallback() {
        const page = location.pathname.split('/').pop();
        const isHome = page === '' || page === 'index.html';

        const left = isHome
            ? `<a href="/screens/sobre.html" class="header__sobre">Sobre</a>`
            : `<a href="/index.html" class="header__logo" aria-label="Voltar para a página inicial">
                   <img src="/asssets/LogoVerm.png" alt="Vem Ser Técnico">
               </a>`;

        this.innerHTML = `
            <header class="header">
                <div class="header__left">${left}</div>
                <div class="header__right">
                    <a href="/screens/Cadastro-Login/login.html" class="header__btn">Login</a>
                    <a href="/screens/Cadastro-Login/cadastro.html" class="header__btn">Cadastro</a>
                </div>
            </header>
        `;
    }
}

customElements.define('site-header', SiteHeader);