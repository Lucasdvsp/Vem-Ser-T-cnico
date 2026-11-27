// /scripts/tema-global.js
(function () {
    const tema = localStorage.getItem("vst_tema") || "claro";
    const fonte = localStorage.getItem("vst_fonte") || "media";

    const ehEscuro = tema === "escuro";
    const fonteValida = ["pequena", "media", "grande"].includes(fonte) ? fonte : "media";
    const classesFonte = ["fonte-pequena", "fonte-media", "fonte-grande"];

    document.documentElement.classList.toggle("tema-escuro", ehEscuro);
    document.documentElement.classList.remove(...classesFonte);
    document.documentElement.classList.add(`fonte-${fonteValida}`);

    function aplicarNoBody() {
        if (!document.body) return;
        document.body.classList.toggle("tema-escuro", ehEscuro);
        document.body.classList.remove(...classesFonte);
        document.body.classList.add(`fonte-${fonteValida}`);
    }

    if (document.body) {
        aplicarNoBody();
    } else {
        document.addEventListener("DOMContentLoaded", aplicarNoBody);
    }
})();