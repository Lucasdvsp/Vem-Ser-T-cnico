import { ProgressoStorage } from "/scripts/processoStorage.js";

// Matérias baseadas na API de aulas
export const MATERIAS_EXERCICIOS = {
    algoritmos: "Programação e Algoritmos",
    POO: "Programação Orientada a Objetos",
    web: "Programação Web (HTML, CSS)",
    mobile: "Programação Mobile (React-Native)"
};

const TIPO_PROGRESSO = "exercicio";

// 1 exercício por aula da lista, alinhado ao conteúdo de cada aula
const EXERCICIOS_POR_AULA = [
    // =========================================
    // PROGRAMAÇÃO ORIENTADA A OBJETOS (POO)
    // =========================================
    {
        id: "ex-poo-01",
        idMateria: "POO",
        aulaReferencia: "Onde está o Mundo 4 de Python? - Guia Definitivo de POO para Iniciantes",
        dificuldade: "Básico",
        titulo: "Mapa de Transição para POO",
        enunciado: "Liste três situações de um programa estruturado em Python que ficam mais organizadas ao migrar para Programação Orientada a Objetos e explique brevemente o papel de cada uma.",
        dica: "Pense em dados e comportamentos que pertencem ao mesmo conceito e costumam ser repetidos em várias funções.",
        concluido: false
    },
    {
        id: "ex-poo-02",
        idMateria: "POO",
        aulaReferencia: "Crise do Software: O motivo do surgimento da POO - Aula 01",
        dificuldade: "Básico",
        titulo: "Problemas da Crise do Software",
        enunciado: "Descreva dois gargalos típicos da crise do software (como dificuldade de manutenção ou alto acoplamento) e mostre como a separação em módulos e objetos ajuda a reduzir esse impacto.",
        dica: "Relacione o tamanho crescente dos sistemas com o custo de alterar um código mal encapsulado.",
        concluido: false
    },
    {
        id: "ex-poo-03",
        idMateria: "POO",
        aulaReferencia: "As 6 Vantagens da POO - Aula 02",
        dificuldade: "Básico",
        titulo: "Aplicando Vantagens da POO em um Cenário Real",
        enunciado: "Escolha 4 vantagens da POO (como reutilização, organização, manutenção, extensibilidade, modularidade ou encapsulamento) e exemplifique cada uma no contexto de um sistema escolar.",
        dica: "Conecte cada vantagem a uma ação concreta, como reutilizar uma classe base ou isolar regras internas.",
        concluido: false
    },
    {
        id: "ex-poo-04",
        idMateria: "POO",
        aulaReferencia: "POO para Iniciantes: Classes, Objetos, Atributos - Aula 03",
        dificuldade: "Básico",
        titulo: "Diferenciando Classe, Objeto e Atributo",
        enunciado: "Defina o que é uma classe, o que é um objeto instanciado a partir dela e quais atributos descrevem o estado de um objeto 'Produto' em uma loja.",
        dica: "A classe é o molde; o objeto é a instância concreta; os atributos são as características variáveis de cada instância.",
        concluido: false
    },
    {
        id: "ex-poo-05",
        idMateria: "POO",
        aulaReferencia: "PyCharm mudou! Treinando Python no PC, celular e tablet",
        dificuldade: "Básico",
        titulo: "Ambiente Multi-Dispositivo para Python",
        enunciado: "Organize um fluxo de estudos em Python alternando entre desktop e dispositivos móveis (ou navegador/IDE), garantindo que seus scripts fiquem salvos e executáveis sem conflito de ambiente.",
        dica: "Padronize a estrutura de pastas e mantenha o código sincronizado ou acessível entre os dispositivos.",
        concluido: false
    },
    {
        id: "ex-poo-06",
        idMateria: "POO",
        aulaReferencia: "Criando Classes e Objetos na Prática - Aula 04",
        dificuldade: "Básico",
        titulo: "Primeira Classe em Python na Prática",
        enunciado: "Escreva uma classe 'Aluno' em Python com atributos de nome e curso, crie pelo menos dois objetos distintos e exiba os dados de cada instância.",
        dica: "Cada objeto criado deve guardar seus próprios valores sem sobrescrever o outro.",
        concluido: false
    },
    {
        id: "ex-poo-07",
        idMateria: "POO",
        aulaReferencia: "Rich no Python: Cores, Emojis, Tabelas e Debug - Aula Extra",
        dificuldade: "Intermediário",
        titulo: "Saída Formatada com Rich",
        enunciado: "Utilize a biblioteca 'rich' em Python para exibir um resumo de objetos ou registros em formato de tabela colorida e inspecionar dados durante o debug.",
        dica: "Use Console e Table do módulo rich.console / rich.table para estruturar colunas e estilos.",
        concluido: false
    },
    {
        id: "ex-poo-08",
        idMateria: "POO",
        aulaReferencia: "Sistema de Análise de Churrasco com Python - Desafio 18",
        dificuldade: "Intermediário",
        titulo: "Classe de Análise de Churrasco",
        enunciado: "Modele uma classe 'Churrasco' em Python que receba a quantidade de participantes e calcule estimativas de carne, bebidas ou custos por meio de métodos da própria classe.",
        dica: "Centralize as regras de cálculo em métodos dedicados em vez de espalhá-las fora da classe.",
        concluido: false
    },
    {
        id: "ex-poo-09",
        idMateria: "POO",
        aulaReferencia: "Livro com Validação de Limite de Páginas - Desafio 19",
        dificuldade: "Intermediário",
        titulo: "Classe Livro com Limite de Páginas",
        enunciado: "Crie uma classe 'Livro' com total de páginas e página atual, implementando um método de leitura que impeça avançar além do total de páginas do livro.",
        dica: "Valide se (pagina_atual + quantidade) ultrapassa o limite antes de atualizar o estado.",
        concluido: false
    },
    {
        id: "ex-poo-10",
        idMateria: "POO",
        aulaReferencia: "Caneta que escreve colorido em Python - Desafio 21",
        dificuldade: "Intermediário",
        titulo: "Classe Caneta com Controle de Cor",
        enunciado: "Implemente uma classe 'Caneta' em Python com atributo de cor e estado (tampada/destampada), permitindo escrever mensagens apenas quando destampada e aplicando a cor escolhida.",
        dica: "Verifique o estado da caneta dentro do método escrever() antes de imprimir o texto.",
        concluido: false
    },
    {
        id: "ex-poo-11",
        idMateria: "POO",
        aulaReferencia: "Controle Remoto em Python - Desafio 22",
        dificuldade: "Intermediário",
        titulo: "Classe ControleRemoto",
        enunciado: "Modele uma classe 'ControleRemoto' com atributos de ligado, volume e canal, criando métodos para ligar/desligar, ajustar volume dentro de limites e trocar de canal.",
        dica: "Garanta que volume e canal respeitem valores mínimos e máximos ao serem alterados.",
        concluido: false
    },
    {
        id: "ex-poo-12",
        idMateria: "POO",
        aulaReferencia: "Herança em Python - Aula 7",
        dificuldade: "Intermediário",
        titulo: "Herança entre Classes em Python",
        enunciado: "Crie uma classe genérica 'Veiculo' e duas subclasses especializadas ('Carro' e 'Moto') que herdem atributos comuns e adicionem propriedades ou métodos específicos.",
        dica: "Evite duplicar atributos compartilhados repetindo a lógica na superclasse.",
        concluido: false
    },
    {
        id: "ex-poo-13",
        idMateria: "POO",
        aulaReferencia: "Abstração: Pilar Central da POO - Aula 8",
        dificuldade: "Intermediário",
        titulo: "Abstração de Entidade em POO",
        enunciado: "A partir de um domínio complexo (como 'Pagamento' ou 'Dispositivo'), defina quais detalhes internos devem ficar ocultos e quais operações essenciais devem ficar expostas.",
        dica: "Foque no 'o que faz' pela interface pública e isole o 'como faz' na implementação.",
        concluido: false
    },

    // =========================================
    // PROGRAMAÇÃO WEB (HTML, CSS)
    // =========================================
    {
        id: "ex-web-01",
        idMateria: "web",
        aulaReferencia: "O que vamos aprender no módulo 01?",
        dificuldade: "Básico",
        titulo: "Roteiro do Módulo 1 de HTML5 e CSS3",
        enunciado: "Monte um resumo estruturado com os principais tópicos iniciais do Módulo 1 (estrutura HTML, textos, imagens, links, multimídia e primeiros passos com CSS).",
        dica: "Separe o que pertence à estrutura/conteúdo (HTML) do que pertence à apresentação visual (CSS).",
        concluido: false
    },
    {
        id: "ex-web-02",
        idMateria: "web",
        aulaReferencia: "Front-end, Back-end e Full stack",
        dificuldade: "Básico",
        titulo: "Papéis de Front-end, Back-end e Full Stack",
        enunciado: "Explique a responsabilidade do front-end (o que roda e é exibido no navegador) e do back-end (regras de negócio, autenticação e banco de dados) no fluxo de uma aplicação web.",
        dica: "Use o exemplo de um formulário de login ou catálogo de cursos para ilustrar a comunicação entre as camadas.",
        concluido: false
    },
    {
        id: "ex-web-03",
        idMateria: "web",
        aulaReferencia: "Melhores livros para aprender HTML5 e CSS3",
        dificuldade: "Básico",
        titulo: "Plano de Leitura e Consulta Técnica",
        enunciado: "Defina como combinar leitura teórica de referência (livros ou documentação) com prática diária de código para fixar semântica HTML e propriedades CSS.",
        dica: "Associe cada conceito lido a um pequeno arquivo HTML/CSS de teste imediato.",
        concluido: false
    },
    {
        id: "ex-web-04",
        idMateria: "web",
        aulaReferencia: "Fim do Módulo 1: Certificados liberados",
        dificuldade: "Básico",
        titulo: "Checklist de Conclusão do Módulo 1",
        enunciado: "Liste os passos necessários para fechar o Módulo 1 com segurança: revisar exercícios, testar os códigos no navegador e conferir os requisitos de avaliação e emissão de certificado.",
        dica: "Revise os pontos de maior dúvida antes de fazer qualquer avaliação final do módulo.",
        concluido: false
    },
    {
        id: "ex-web-05",
        idMateria: "web",
        aulaReferencia: "Será que este curso é para mim?",
        dificuldade: "Básico",
        titulo: "Autoavaliação de Ritmo e Objetivo",
        enunciado: "Escreva um plano de estudo semanal realista para o curso de HTML5 e CSS3 indicando dias, tempo por sessão e como lidar com tópicos mais difíceis.",
        dica: "Consistência em sessões curtas e frequentes costuma render mais que maratonas esporádicas.",
        concluido: false
    },
    {
        id: "ex-web-06",
        idMateria: "web",
        aulaReferencia: "A diferença entre HTML, CSS e JavaScript",
        dificuldade: "Básico",
        titulo: "HTML vs. CSS vs. JavaScript",
        enunciado: "Explique por que HTML é linguagem de marcação, CSS é linguagem de estilo e JavaScript é linguagem de programação, dando um exemplo do papel de cada um na mesma página.",
        dica: "Pense em uma página interativa: marcação define elementos, estilo define visual e JS define comportamento.",
        concluido: false
    },
    {
        id: "ex-web-07",
        idMateria: "web",
        aulaReferencia: "Seu primeiro código HTML",
        dificuldade: "Básico",
        titulo: "Documento HTML5 Completo do Zero",
        enunciado: "Escreva a estrutura mínima de um documento HTML5 válido com <!DOCTYPE html>, <html lang=\"pt-BR\">, <head> (com charset UTF-8 e viewport) e <body> contendo um título e um parágrafo.",
        dica: "Não esqueça a meta tag de codificação para evitar problemas com acentuação.",
        concluido: false
    },
    {
        id: "ex-web-08",
        idMateria: "web",
        aulaReferencia: "Parágrafos e Quebras",
        dificuldade: "Básico",
        titulo: "Parágrafos, Quebras de Linha e Entidades",
        enunciado: "Crie um parágrafo em HTML utilizando <p> e insira uma quebra de linha intencional com <br>, além de usar entidades HTML para exibir símbolos como < e > literalmente.",
        dica: "Evite usar múltiplos <br> para criar espaçamento entre parágrafos separados.",
        concluido: false
    },
    {
        id: "ex-web-09",
        idMateria: "web",
        aulaReferencia: "Símbolos e Emoji no seu site",
        dificuldade: "Básico",
        titulo: "Símbolos Especiais e Emojis no HTML",
        enunciado: "Monte uma lista de itens em HTML combinando símbolos especiais (como ©, ® ou setas) e emojis via código/entidade ou caractere UTF-8.",
        dica: "Verifique se o arquivo está salvo em UTF-8 para que os caracteres sejam exibidos corretamente.",
        concluido: false
    },
    {
        id: "ex-web-10",
        idMateria: "web",
        aulaReferencia: "Você tem o direito de usar qualquer imagem no seu site?",
        dificuldade: "Básico",
        titulo: "Verificação de Licença e Direitos de Imagem",
        enunciado: "Antes de adicionar uma imagem a um projeto web, avalie sua origem e licença de uso (domínio público, Creative Commons, banco gratuito ou autoria própria) e justifique sua escolha.",
        dica: "Copiar imagens de buscas sem verificar licença pode gerar restrições de uso e direitos autorais.",
        concluido: false
    },
    {
        id: "ex-web-11",
        idMateria: "web",
        aulaReferencia: "Quais são os formatos para imagens na Web?",
        dificuldade: "Intermediário",
        titulo: "Escolha do Formato de Imagem (JPEG, PNG, WebP, SVG)",
        enunciado: "Indique qual formato de imagem é mais adequado para: (a) fotografia colorida, (b) ilustração com transparência e (c) ícone vetorial escalável, justificando cada escolha.",
        dica: "Considere compressão, transparência e perda de qualidade em cada cenário.",
        concluido: false
    },
    {
        id: "ex-web-12",
        idMateria: "web",
        aulaReferencia: "Formatações adicionais em HTML",
        dificuldade: "Básico",
        titulo: "Formatações de Texto em HTML5",
        enunciado: "Escreva um trecho HTML aplicando marca-texto (<mark>), texto inserido (<ins>) ou excluído (<del>) e notação sobrescrita/subscrita (<sup> e <sub>, como em H2O ou x2).",
        dica: "Prefira tags com significado semântico quando representarem alteração ou destaque específico do texto.",
        concluido: false
    },
    {
        id: "ex-web-13",
        idMateria: "web",
        aulaReferencia: "Listas OL e UL",
        dificuldade: "Básico",
        titulo: "Lista Ordenada (<ol>) e Lista Não Ordenada (<ul>)",
        enunciado: "Crie uma lista ordenada com o passo a passo de preparação de um ambiente de estudo e uma lista não ordenada com ferramentas necessárias, alterando o tipo de marcador em pelo menos uma delas.",
        dica: "Use <ol> quando a ordem dos passos importa e <ul> quando os itens formam um conjunto sem ordem rígida.",
        concluido: false
    },
    {
        id: "ex-web-14",
        idMateria: "web",
        aulaReferencia: "Links e Âncoras em HTML5",
        dificuldade: "Intermediário",
        titulo: "Links Internos, Externos e Atributos Seguros",
        enunciado: "Escreva links HTML para: (a) abrir um site externo em nova aba com segurança, (b) navegar para outra página local do projeto e (c) oferecer um arquivo para download.",
        dica: "Ao usar target=\"_blank\", inclua rel=\"noopener noreferrer\" no link externo.",
        concluido: false
    },
    {
        id: "ex-web-15",
        idMateria: "web",
        aulaReferencia: "Estilos CSS inline",
        dificuldade: "Básico",
        titulo: "CSS Inline e Suas Limitações",
        enunciado: "Aplique estilo inline (atributo style) em um elemento HTML e explique por que repetir esse padrão em vários elementos dificulta a manutenção do código.",
        dica: "Style inline mistura apresentação com marcação e tem alta especificidade difícil de sobrescrever.",
        concluido: false
    },
    {
        id: "ex-web-16",
        idMateria: "web",
        aulaReferencia: "Estilos CSS internos",
        dificuldade: "Intermediário",
        titulo: "CSS Interno com Seletores no <head>",
        enunciado: "Mova estilos repetidos de elementos para uma tag <style> dentro do <head>, utilizando seletores para definir cores de fundo, tipografia e espaçamento de forma centralizada.",
        dica: "Agrupar regras em seletores evita repetição de estilo em cada tag individual.",
        concluido: false
    },

    // =========================================
    // PROGRAMAÇÃO MOBILE (React-Native)
    // =========================================
    {
        id: "ex-mob-01",
        idMateria: "mobile",
        aulaReferencia: "Primeiros passos no React Native - Aula 1 | Curso React Native (aprendiz) | Onebitcode",
        dificuldade: "Básico",
        titulo: "Fundamentos do React Native",
        enunciado: "Explique como o React Native permite construir interfaces mobile usando JavaScript/React e qual a diferença entre componentes de interface mobile e elementos HTML tradicionais.",
        dica: "Em vez de tags HTML como div e p, o React Native usa componentes nativos como View e Text.",
        concluido: false
    },
    {
        id: "ex-mob-02",
        idMateria: "mobile",
        aulaReferencia: "Principais Components do React Native - Aula 2 - Parte 1 | Curso React Native (aprendiz)",
        dificuldade: "Básico",
        titulo: "Estrutura com View e Text (Parte 1)",
        enunciado: "Monte um componente simples em React Native usando View como contêiner e Text para exibir um título e uma descrição estilizados com StyleSheet.",
        dica: "Todo texto renderizado na tela do app precisa estar dentro de um componente Text.",
        concluido: false
    },
    {
        id: "ex-mob-03",
        idMateria: "mobile",
        aulaReferencia: "Principais Components do React Native - Aula 2 - Parte 2 | Curso React Native (aprendiz)",
        dificuldade: "Básico",
        titulo: "Layout e Interação com Componentes (Parte 2)",
        enunciado: "Estenda um componente React Native adicionando espaçamentos, alinhamento e um elemento interativo de toque para responder a ações do usuário.",
        dica: "Organize os estilos com StyleSheet.create para manter o código limpo e legível.",
        concluido: false
    },
    {
        id: "ex-mob-04",
        idMateria: "mobile",
        aulaReferencia: "Principais Components do React Native - Aula 2 - Parte 3 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Composição de Tela com Múltiplos Componentes (Parte 3)",
        enunciado: "Combine componentes básicos de layout, texto e entrada/ação em uma tela organizada, separando claramente os estilos de cada bloco visual.",
        dica: "Divida a tela em blocos menores (cabeçalho, corpo e rodapé) para facilitar ajustes visuais.",
        concluido: false
    },
    {
        id: "ex-mob-05",
        idMateria: "mobile",
        aulaReferencia: "Design do App OneBitHealth – Aula 3 - Parte 1 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Layout da Tela do App OneBitHealth",
        enunciado: "Estruture a interface de um aplicativo de saúde/IMC em React Native com campos de entrada numérica, botão de calcular e área de exibição do resultado.",
        dica: "Separe o formulário de entrada da área que mostra o resultado calculado.",
        concluido: false
    },
    {
        id: "ex-mob-06",
        idMateria: "mobile",
        aulaReferencia: "Conhecendo sobre APIs React Native - Aula 4 - Parte 1 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Consumo de API em React Native (Parte 1)",
        enunciado: "Escreva a lógica assíncrona para buscar dados de uma API externa em React Native, tratando estados de carregamento e possível falha na requisição.",
        dica: "Use async/await com try/catch para lidar com respostas de rede de forma previsível.",
        concluido: false
    },
    {
        id: "ex-mob-07",
        idMateria: "mobile",
        aulaReferencia: "Conhecendo sobre APIs React Native - Aula 4 - Parte 2 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Exibindo Dados da API na Tela (Parte 2)",
        enunciado: "Após receber os dados de uma API no React Native, armazene-os no estado do componente e renderize os campos relevantes na interface.",
        dica: "Garanta valores padrão ou verificações antes de acessar propriedades de objetos retornados pela API.",
        concluido: false
    },
    {
        id: "ex-mob-08",
        idMateria: "mobile",
        aulaReferencia: "Trabalhando com Câmera no React Native - Aula 6 - Parte 1 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Permissões e Fluxo de Câmera",
        enunciado: "Descreva o fluxo de solicitação de permissão de câmera no dispositivo em React Native e o que exibir caso o usuário negue ou ainda não tenha concedido acesso.",
        dica: "Sempre trate o caso de permissão negada exibindo um aviso claro ao usuário.",
        concluido: false
    },
    {
        id: "ex-mob-09",
        idMateria: "mobile",
        aulaReferencia: "Navegação (StackNavigator, TabNavigator e Drawer) - Aula 7 - Parte 2 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Configuração de Rotas e Navegação (Parte 2)",
        enunciado: "Defina uma estrutura com múltiplas telas em React Native e explique quando usar navegação em pilha (Stack) em comparação com abas (Tab) ou menu lateral (Drawer).",
        dica: "Use Stack para fluxos lineares (ex.: lista -> detalhe) e Tabs/Drawer para seções principais do app.",
        concluido: false
    },
    {
        id: "ex-mob-10",
        idMateria: "mobile",
        aulaReferencia: "Navegação (StackNavigator, TabNavigator e Drawer) - Aula 7 - Parte 3 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Transição entre Telas e Parâmetros (Parte 3)",
        enunciado: "Implemente a navegação entre duas telas passando dados (como um item selecionado ou título) da tela de origem para a tela de destino.",
        dica: "Verifique se o nome da rota configurada no navegador corresponde exatamente ao usado na navegação.",
        concluido: false
    },
    {
        id: "ex-mob-11",
        idMateria: "mobile",
        aulaReferencia: "Projeto Final: OneBitCoin - Aula 8 - Parte 4 | Curso React Native (aprendiz)",
        dificuldade: "Intermediário",
        titulo: "Integração Final no Projeto OneBitCoin",
        enunciado: "Organize a estrutura final de um app de cotação (como o OneBitCoin), reunindo consulta de dados, formatação de valores e atualização da tela pelo usuário.",
        dica: "Mantenha a formatação de valores e a chamada de dados organizadas para facilitar ajustes futuros.",
        concluido: false
    },

    // =========================================
    // PROGRAMAÇÃO E ALGORITMOS (algoritmos)
    // =========================================
    {
        id: "ex-alg-01",
        idMateria: "algoritmos",
        aulaReferencia: "Playlist - Programação e Algoritmos",
        dificuldade: "Básico",
        titulo: "Algoritmo Sequencial de Entrada, Processamento e Saída",
        enunciado: "Escreva o passo a passo de um algoritmo que leia o preço de um produto e a quantidade comprada, calcule o valor total e exiba o resultado final.",
        dica: "Divida a solução em três etapas claras: ler dados, calcular o total e mostrar na tela.",
        concluido: false
    }
];

// Ponto único para trocar futuramente pela chamada real à API de exercícios
export async function listarExercicios() {
    return EXERCICIOS_POR_AULA.map(item => ({ ...item }));
}

const filtroMateriasEl = document.getElementById("filtroMaterias");
const listaSecoesEl = document.getElementById("listaSecoesExercicios");
const pesquisaEl = document.getElementById("pesquisaExercicios");
const btnPesquisarEl = document.getElementById("btnPesquisarExercicio");
const mensagemEl = document.getElementById("mensagemExercicios");

let todosExercicios = [];
let materiaSelecionada = "todas";

function obterIdsConcluidos() {
    const ids = new Set();

    ProgressoStorage.listarPorTipo(TIPO_PROGRESSO).forEach(registro => {
        if (registro && registro.id && registro.concluido !== false) {
            ids.add(registro.id);
        }
    });

    todosExercicios.forEach(exercicio => {
        if (exercicio.concluido) {
            ids.add(exercicio.id);
        }
    });

    return ids;
}

function concluirExercicio(exercicio) {
    ProgressoStorage.salvar({
        tipo: TIPO_PROGRESSO,
        id: exercicio.id,
        idMateria: exercicio.idMateria,
        materia: MATERIAS_EXERCICIOS[exercicio.idMateria] || exercicio.idMateria,
        titulo: exercicio.titulo,
        aulaReferencia: exercicio.aulaReferencia || "",
        dificuldade: exercicio.dificuldade || "Prática",
        concluido: true
    });

    filtrarERenderizar();
}

function exibirMensagem(texto) {
    mensagemEl.textContent = texto;
    mensagemEl.hidden = false;
}

function ocultarMensagem() {
    mensagemEl.textContent = "";
    mensagemEl.hidden = true;
}

function normalizar(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
}

function renderizarBotoesMateria() {
    Object.entries(MATERIAS_EXERCICIOS).forEach(([idMateria, nomeMateria]) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btnMateria";
        botao.dataset.materia = idMateria;
        botao.textContent = nomeMateria;

        botao.addEventListener("click", () => {
            materiaSelecionada = idMateria;
            atualizarEstadoBotoes();
            filtrarERenderizar();
        });

        filtroMateriasEl.appendChild(botao);
    });

    const btnTodas = filtroMateriasEl.querySelector('[data-materia="todas"]');
    btnTodas.addEventListener("click", () => {
        materiaSelecionada = "todas";
        atualizarEstadoBotoes();
        filtrarERenderizar();
    });
}

function atualizarEstadoBotoes() {
    filtroMateriasEl.querySelectorAll(".btnMateria").forEach(btn => {
        btn.classList.toggle("ativo", btn.dataset.materia === materiaSelecionada);
    });
}

function criarCardExercicio(exercicio) {
    const card = document.createElement("article");
    card.className = "cardExercicio";

    const topo = document.createElement("div");
    topo.className = "topoCardExercicio";

    const badge = document.createElement("span");
    badge.className = "badgeDificuldade";
    badge.textContent = exercicio.dificuldade || "Prática";

    const status = document.createElement("span");
    status.className = "statusExercicio";
    status.textContent = "Pendente";

    topo.appendChild(badge);
    topo.appendChild(status);

    const titulo = document.createElement("h3");
    titulo.textContent = exercicio.titulo;

    const enunciado = document.createElement("p");
    enunciado.className = "enunciadoExercicio";
    enunciado.textContent = exercicio.enunciado;

    const acoes = document.createElement("div");
    acoes.className = "acoesExercicio";

    const btnDica = document.createElement("button");
    btnDica.type = "button";
    btnDica.className = "btnSecundario";
    btnDica.textContent = "Ver dica";

    const textoDica = document.createElement("p");
    textoDica.className = "dicaExercicio";
    textoDica.textContent = exercicio.dica || "Sem dica disponível.";
    textoDica.hidden = true;

    btnDica.addEventListener("click", () => {
        textoDica.hidden = !textoDica.hidden;
        btnDica.textContent = textoDica.hidden ? "Ver dica" : "Ocultar dica";
    });

    const btnConcluir = document.createElement("button");
    btnConcluir.type = "button";
    btnConcluir.className = "btnConcluir";
    btnConcluir.textContent = "Concluir";

    btnConcluir.addEventListener("click", () => {
        concluirExercicio(exercicio);
    });

    acoes.appendChild(btnDica);
    acoes.appendChild(btnConcluir);

    card.appendChild(topo);
    card.appendChild(titulo);
    card.appendChild(enunciado);
    card.appendChild(acoes);
    card.appendChild(textoDica);

    return card;
}

function criarSecaoMateria(idMateria, nomeMateria, itens) {
    const secao = document.createElement("section");
    secao.className = "secaoMateriaExercicios";
    secao.dataset.idMateria = idMateria;

    const cabecalho = document.createElement("div");
    cabecalho.className = "tituloSecaoExercicios";

    const h2 = document.createElement("h2");
    h2.textContent = nomeMateria.toUpperCase();

    const contador = document.createElement("span");
    contador.className = "contadorExercicios";
    contador.textContent = `${itens.length} ${itens.length === 1 ? "exercício" : "exercícios"}`;

    cabecalho.appendChild(h2);
    cabecalho.appendChild(contador);

    const grade = document.createElement("div");
    grade.className = "gradeExercicios";

    itens.forEach(exercicio => {
        grade.appendChild(criarCardExercicio(exercicio));
    });

    secao.appendChild(cabecalho);
    secao.appendChild(grade);

    return secao;
}

function filtrarERenderizar() {
    const termo = normalizar(pesquisaEl.value.trim());
    const idsConcluidos = obterIdsConcluidos();

    const pendentes = todosExercicios.filter(exercicio => !idsConcluidos.has(exercicio.id));

    const filtrados = pendentes.filter(exercicio => {
        const bateMateria =
            materiaSelecionada === "todas" || exercicio.idMateria === materiaSelecionada;

        if (!bateMateria) return false;
        if (!termo) return true;

        const nomeMateria = MATERIAS_EXERCICIOS[exercicio.idMateria] || "";

        return (
            normalizar(exercicio.titulo).includes(termo) ||
            normalizar(exercicio.enunciado).includes(termo) ||
            normalizar(exercicio.aulaReferencia).includes(termo) ||
            normalizar(exercicio.dificuldade).includes(termo) ||
            normalizar(nomeMateria).includes(termo)
        );
    });

    listaSecoesEl.innerHTML = "";

    const materiasParaExibir =
        materiaSelecionada === "todas"
            ? Object.entries(MATERIAS_EXERCICIOS)
            : Object.entries(MATERIAS_EXERCICIOS).filter(([id]) => id === materiaSelecionada);

    let totalSecoesRenderizadas = 0;

    materiasParaExibir.forEach(([idMateria, nomeMateria]) => {
        const itensDaMateria = filtrados.filter(item => item.idMateria === idMateria);
        if (itensDaMateria.length > 0) {
            listaSecoesEl.appendChild(criarSecaoMateria(idMateria, nomeMateria, itensDaMateria));
            totalSecoesRenderizadas += 1;
        }
    });

    if (totalSecoesRenderizadas === 0) {
        exibirMensagem("Nenhum exercício pendente encontrado.");
    } else {
        ocultarMensagem();
    }
}

async function inicializarExercicios() {
    try {
        exibirMensagem("Carregando exercícios...");
        renderizarBotoesMateria();
        todosExercicios = await listarExercicios();
        filtrarERenderizar();
    } catch (erro) {
        console.error("Erro ao carregar exercícios:", erro);
        listaSecoesEl.innerHTML = "";
        exibirMensagem("Não foi possível carregar os exercícios.");
    }
}

btnPesquisarEl.addEventListener("click", filtrarERenderizar);
pesquisaEl.addEventListener("input", filtrarERenderizar);

inicializarExercicios();