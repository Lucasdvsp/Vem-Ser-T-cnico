class SiteHeader extends HTMLElement {
    connectedCallback() {
        const page = location.pathname.split('/').pop();

        this.innerHTML = `
            <header class="header">
                <div class="header__left">${left}
                 <img src="/asssets/LogoTelaCadatro.png" alt="Vem Ser Técnico">
                </div>
                <div class="footer__right">
                    <p class="footerText">© 2026 Vem Ser Técnico. Todos os direitos reservados</p>
                </div>
            </header>
        `;
    }
}

customElements.define('site-header', SiteHeader);