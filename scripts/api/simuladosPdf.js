(() => {
    const SECOES_PDF = [
        {
            id: "fatec",
            titulo: "FATEC",
            itens: [
                { banca: "FATEC", ano: "2017", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201718392/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2017", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201729482/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2018", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201814793/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2018", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201827920/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2019", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201916513/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2019", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201928914/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2020", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202016520/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2022", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202228712/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2023", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202315287/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2023", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202327519/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2024", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202415903/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2024", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202426517/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2025", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202528719/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2026", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202619102/Prova.pdf?v=2.1" },
                { banca: "FATEC", ano: "2026", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202626241/Prova.pdf?v=2.1" }
            ]
        },
        {
            id: "etec",
            titulo: "ETEC",
            itens: [
                { banca: "ETEC", ano: "2017", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201718301/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2017", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201727490/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2018", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201816012/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2018", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201826901/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2019", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201917532/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2019", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201927134/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2020", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202017430/Prova_1modulo.pdf" },
                { banca: "ETEC", ano: "2023", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202311698/Prova.pdf" },
                { banca: "ETEC", ano: "2023", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202323718/Prova.pdf" },
                { banca: "ETEC", ano: "2024", detalhe: "2º Semestre (A)", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20242918930/Prova.pdf" },
                { banca: "ETEC", ano: "2024", detalhe: "2º Semestre (B)", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202423718/Prova.pdf" },
                { banca: "ETEC", ano: "2025", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20251468190/Prova.pdf" },
                { banca: "ETEC", ano: "2026", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20261176943/A-CADERNO-VESTIBULINHO-1SEM2026.pdf" },
                { banca: "ETEC", ano: "2026", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20262210689/A-CADERNO-VESTIBULINHO-2SEM2026.pdf" }
            ]
        },
        {
            id: "gabarito-etec",
            titulo: "GABARITO ETEC",
            itens: [
                { banca: "ETEC", ano: "2017", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201718301/Gabarito_1modulo.pdf" },
                { banca: "ETEC", ano: "2017", detalhe: "2º Sem. (Retificado)", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201727490/Gabarito_1modulo_retificado.pdf" },
                { banca: "ETEC", ano: "2018", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201816012/Gabarito_1modulo.pdf" },
                { banca: "ETEC", ano: "2019", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/201927134/Gabarito_1modulo.pdf" },
                { banca: "ETEC", ano: "2020", detalhe: "1º Sem. (Retificado)", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202017430/Gabarito_1modulo-retificado.pdf" },
                { banca: "ETEC", ano: "2023", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202311698/Gabarito.pdf" },
                { banca: "ETEC", ano: "2023", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202323718/Gabarito.pdf" },
                { banca: "ETEC", ano: "2024", detalhe: "2º Sem. (Retificado A)", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20242918930/Gabarito-retificado.pdf" },
                { banca: "ETEC", ano: "2024", detalhe: "2º Semestre (B)", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/202423718/Gabarito.pdf" },
                { banca: "ETEC", ano: "2025", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20251468190/Gabarito.pdf" },
                { banca: "ETEC", ano: "2026", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20261176943/A-GABARITO-VESTIBULINHO-1SEM2026.pdf" },
                { banca: "ETEC", ano: "2026", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibulinhoetec/gabarito/20262210689/A-GABARITO-VESTIBULINHO-2SEM2026.pdf" }
            ]
        },
        {
            id: "gabarito-fatec",
            titulo: "GABARITO FATEC",
            itens: [
                { banca: "FATEC", ano: "2017", detalhe: "1º Sem. (Retificado)", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201718392/Gabarito-retificado.pdf?v=2.1" },
                { banca: "FATEC", ano: "2017", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201729482/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2018", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201814793/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2018", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201827920/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2019", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201916513/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2019", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/201928914/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2020", detalhe: "1º Sem. (Retificado)", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202016520/Gabarito-retificado.pdf?v=2.1" },
                { banca: "FATEC", ano: "2022", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202228712/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2023", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202315287/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2023", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202327519/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2024", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202415903/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2024", detalhe: "2º Sem. (Retificado)", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202426517/Gabarito_retificado.pdf?v=2.1" },
                { banca: "FATEC", ano: "2025", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202528719/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2026", detalhe: "1º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202619102/Gabarito.pdf?v=2.1" },
                { banca: "FATEC", ano: "2026", detalhe: "2º Semestre", url: "https://fatweb.s3.amazonaws.com/vestibularfatec/gabarito/202626241/Gabarito.pdf?v=2.1" }
            ]
        }
    ];

    const ICONE_PDF = `
    <svg class="cardPdfIcone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="8" y1="13" x2="16" y2="13"></line>
        <line x1="8" y1="17" x2="13" y2="17"></line>
    </svg>
    `;

    function obterContainer() {
        return (
            document.getElementById("simuladosPdfContainer") ||
            document.getElementById("simuladosContainer")
        );
    }

    function criarCardPdf(item) {
        const link = document.createElement("a");
        link.className = "cardPdfItem";
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.innerHTML = `
            <div class="cardPdfBox">
                <span class="cardPdfLabel">${item.banca} ${item.ano}</span>
                ${ICONE_PDF}
            </div>
            <span class="cardPdfSubtitulo">${item.detalhe}</span>
        `;

        return link;
    }

    function renderizarSecoesPdf(filtro = "") {
        const container = obterContainer();
        if (!container) {
            console.warn("Container #simuladosPdfContainer ou #simuladosContainer não encontrado.");
            return;
        }

        container.innerHTML = "";
        const termo = filtro.trim().toLowerCase();

        SECOES_PDF.forEach((secao) => {
            const itensFiltrados = secao.itens.filter((item) => {
                if (!termo) return true;
                const combinado = `${secao.titulo} ${item.banca} ${item.ano} ${item.detalhe}`.toLowerCase();
                return combinado.includes(termo);
            });

            if (itensFiltrados.length === 0) return;

            const bloco = document.createElement("div");
            bloco.className = "blocoPdfSimulado";

            const h2 = document.createElement("h2");
            h2.className = "tituloSecaoPdf";
            h2.textContent = secao.titulo;

            const wrapper = document.createElement("div");
            wrapper.className = "carrosselPdfWrapper";

            const btnEsq = document.createElement("button");
            btnEsq.type = "button";
            btnEsq.className = "setaCarrosselPdf";
            btnEsq.setAttribute("aria-label", `Rolar ${secao.titulo} para a esquerda`);
            btnEsq.textContent = "‹";

            const trilho = document.createElement("div");
            trilho.className = "listaCardsPdf";

            itensFiltrados.forEach((item) => {
                trilho.appendChild(criarCardPdf(item));
            });

            const btnDir = document.createElement("button");
            btnDir.type = "button";
            btnDir.className = "setaCarrosselPdf";
            btnDir.setAttribute("aria-label", `Rolar ${secao.titulo} para a direita`);
            btnDir.textContent = "›";

            btnEsq.addEventListener("click", () => {
                trilho.scrollBy({ left: -340, behavior: "smooth" });
            });

            btnDir.addEventListener("click", () => {
                trilho.scrollBy({ left: 340, behavior: "smooth" });
            });

            wrapper.appendChild(btnEsq);
            wrapper.appendChild(trilho);
            wrapper.appendChild(btnDir);

            bloco.appendChild(h2);
            bloco.appendChild(wrapper);
            container.appendChild(bloco);
        });
    }

    function iniciar() {
        try {
            renderizarSecoesPdf();

            const inputPesquisa = document.getElementById("pesquisaHome");
            if (inputPesquisa) {
                inputPesquisa.addEventListener("input", (e) => {
                    renderizarSecoesPdf(e.target.value);
                });
            }
        } catch (err) {
            console.error("Erro ao iniciar simuladosPdf.js:", err);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();