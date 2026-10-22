class SiteFooter extends HTMLElement {
    connectedCallback() {
        const page = location.pathname.split('/').pop();

        this.innerHTML = `
            <footer class="footer">
                <div class="footer__left">
                 <img src="asssets/LogoTelaCadastro.png" alt="Vem Ser Técnico">
                </div>
                <div class="footer__right">
                    <p class="footerText">© 2026 Vem Ser Técnico. Todos os direitos reservados</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);