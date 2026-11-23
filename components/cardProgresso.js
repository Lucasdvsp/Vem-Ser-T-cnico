class CardProgresso extends HTMLElement {

    set dados(valor) {
        this._dados = valor;
        this.render();
    }

    connectedCallback() {
        if (this._dados) this.render();
    }

    render() {
        const { tipo, titulo, materia, progresso = 0, url } = this._dados;
        const temBarra = tipo !== 'aula';

        this.className = `cardProgresso cardProgresso--${tipo}`;

        this.innerHTML = `
            <span class="cardProgresso__icone" aria-hidden="true"></span>

            <h3 class="cardProgresso__titulo"></h3>
            <p class="cardProgresso__materia"></p>

            ${temBarra ? `
                <div class="cardProgresso__progresso">
                    <div class="cardProgresso__barra">
                        <div class="cardProgresso__preenchimento"></div>
                    </div>
                    <span class="cardProgresso__percentual"></span>
                </div>
            ` : ''}

            <a class="cardProgresso__botao">Continuar</a>
        `;

        this.querySelector('.cardProgresso__titulo').textContent = titulo;
        this.querySelector('.cardProgresso__materia').textContent = materia;
        this.querySelector('.cardProgresso__botao').href = url;

        if (temBarra) {
            const valor = Math.max(0, Math.min(100, progresso));
            this.querySelector('.cardProgresso__preenchimento').style.width = `${valor}%`;
            this.querySelector('.cardProgresso__percentual').textContent = `${valor}%`;
        }
    }
}

if (!customElements.get('card-progresso')) {
    customElements.define('card-progresso', CardProgresso);
}