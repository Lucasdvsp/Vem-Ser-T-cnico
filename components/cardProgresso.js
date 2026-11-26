class CardProgresso extends HTMLElement {

    set dados(valor) {
        this._dados = valor;
        this.render();
    }

    connectedCallback() {
        if (this._dados) this.render();
    }

    render() {
        if (this._dados.tipo === "aula") {
            this.renderAula();
        } else {
            this.renderAtividade();
        }
    }


    // Aula: igual ao card da tela de aulas, com "Continuar:" antes do nome
    renderAula() {

        const { id, titulo, url, miniatura } = this._dados;

        // o id da aula é o id do vídeo, então a miniatura pode ser recalculada
        const imagemUrl = miniatura ||
            `https://img.youtube.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;

        this.className = "cardProgresso cardProgresso--aula";

        this.innerHTML = `
            <a class="cardProgresso__link">

                <div class="cardProgresso__imagem">
                    <img alt="" loading="lazy">
                    <span class="cardProgresso__play" aria-hidden="true">▶</span>
                </div>

                <h3 class="cardProgresso__nomeAula">
                    <strong class="cardProgresso__continuar">Continuar:</strong>
                    <span class="cardProgresso__nome"></span>
                </h3>

            </a>
        `;

        const link = this.querySelector(".cardProgresso__link");
        const imagem = this.querySelector("img");

        link.href = url;
        link.title = titulo;

        imagem.src = imagemUrl;
        imagem.alt = `Miniatura da aula ${titulo}`;
        imagem.onerror = () => imagem.remove();   // fica o fundo vermelho

        // textContent evita que um título com HTML quebre a página
        this.querySelector(".cardProgresso__nome").textContent = titulo;
    }


    // Exercício e simulado: card rosa com barra de progresso
    renderAtividade() {

        const { tipo, titulo, materia, progresso = 0, url } = this._dados;

        this.className = `cardProgresso cardProgresso--${tipo}`;

        this.innerHTML = `
            <span class="cardProgresso__icone" aria-hidden="true"></span>

            <h3 class="cardProgresso__titulo"></h3>
            <p class="cardProgresso__materia"></p>

            <div class="cardProgresso__progresso">
                <div class="cardProgresso__barra">
                    <div class="cardProgresso__preenchimento"></div>
                </div>
                <span class="cardProgresso__percentual"></span>
            </div>

            <a class="cardProgresso__botao">Continuar</a>
        `;

        this.querySelector(".cardProgresso__titulo").textContent = titulo;
        this.querySelector(".cardProgresso__materia").textContent = materia;
        this.querySelector(".cardProgresso__botao").href = url;

        const valor = Math.max(0, Math.min(100, progresso));
        this.querySelector(".cardProgresso__preenchimento").style.width = `${valor}%`;
        this.querySelector(".cardProgresso__percentual").textContent = `${valor}%`;
    }
}

if (!customElements.get("card-progresso")) {
    customElements.define("card-progresso", CardProgresso);
}