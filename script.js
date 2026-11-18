// === CONFIGURAÇÃO RÁPIDA: NICHO DE MASSOTERAPIA ===
const CONFIG_BUSCA = {
  // Coloque aqui o link online do seu site de massoterapia ou o caminho da pasta local:
  // Exemplo local: "../site estetica massoterapia/index.html"
  urlDestino: "https://estetica-angel.conectaweb.workers.dev/",

  // Frase que será escrita sozinha na barra inicial do Google
  termoPadrao: "massoterapia perto de mim",

  // Configurações da digitação automática para a gravação
  digitarSozinho: true,
  atrasoAntesDeDigitarMs: 1200, // Espera 1.2s após abrir a página para você iniciar a gravação
  velocidadeLetraMs: 65,        // Velocidade realista de digitação no celular
  irSozinhoParaPagina2: true,   // Abre a 2ª página automaticamente ao terminar de digitar

  localizacao: "Jardim Anália Franco, São Paulo - SP • Com base no seu local",

  // Sugestões abaixo da barra na 1ª tela
  sugestoes: [
    "massoterapia perto de mim",
    "massagem para dor nas costas e lombar",
    "drenagem linfática e massagem relaxante"
  ],

  // 3 Espaços no bloco do Google Maps (Locais)
  locaisMaps: [
    {
      nome: "Angel • Massoterapia & Estética",
      nota: "5,0",
      avaliacoes: "(128)",
      categoria: "Massoterapeuta",
      endereco: "Ambiente climatizado • Hora marcada • Agendamento no WhatsApp",
      status: "Aberto ⋅ Fecha às 19:00",
      temSite: true // Destaca o botão "Site" apenas no seu modelo
    },
    {
      nome: "Clínica Toque & Bem-Estar",
      nota: "4,3",
      avaliacoes: "(16)",
      categoria: "Massagem terapêutica",
      endereco: "A 1,6 km de distância",
      status: "Aberto ⋅ Fecha às 18:00",
      temSite: false // Sem site para gerar contraste visual no vídeo
    },
    {
      nome: "Studio Corpo & Equilíbrio",
      nota: "4,5",
      avaliacoes: "(29)",
      categoria: "Spa e massoterapia",
      endereco: "A 2,3 km de distância",
      status: "Aberto ⋅ Fecha às 18:30",
      temSite: false
    }
  ],

  // Resultados orgânicos logo abaixo do Mapa
  resultadosOrganicos: [
    {
      inicial: "A",
      nomeSite: "Espaço Aura Massoterapia & Estética Corporal",
      urlExibida: "https://estetica-angel.conectaweb.workers.dev/",
      titulo: "Massoterapia, Alívio de Dores na Lombar e Drenagem Linfática",
      descricao: "Atendimento individual com hora marcada e ambiente climatizado. Veja o antes e depois de redução de inchaço e alívio de tensão nas costas. Agende pelo WhatsApp."
    },
    {
      inicial: "G",
      nomeSite: "Guia Saúde & Bem-Estar SP",
      urlExibida: "https://guiasaudesp.com.br › massoterapia › zona-leste",
      titulo: "As 10 Melhores Clínicas de Massoterapia e Drenagem Perto de Você",
      descricao: "Encontre especialistas em massagem terapêutica, liberação miofascial, alívio de dores lombares e drenagem linfática com avaliações 5 estrelas."
    }
  ]
};

// === LÓGICA DO SIMULADOR ===
document.addEventListener("DOMContentLoaded", () => {
  const telaInicial = document.getElementById("tela-inicial");
  const telaResultados = document.getElementById("tela-resultados");
  const barraProgresso = document.getElementById("barra-progresso");

  const formInicial = document.getElementById("form-busca-inicial");
  const inputInicial = document.getElementById("input-busca-inicial");
  const btnPesquisar = document.getElementById("btn-pesquisar");
  const btnSorte = document.getElementById("btn-sorte");
  const listaSugestoes = document.getElementById("lista-sugestoes");

  const formSerp = document.getElementById("form-busca-serp");
  const inputSerp = document.getElementById("input-busca-serp");
  const btnVoltar = document.getElementById("voltar-inicio");

  let timerDigitacao = null;

  // 1. Renderiza sugestões na tela inicial
  listaSugestoes.innerHTML = "";
  CONFIG_BUSCA.sugestoes.forEach(texto => {
    const div = document.createElement("div");
    div.className = "item-sugestao";
    div.innerHTML = `<span>🔍</span> <span>${texto}</span>`;
    div.addEventListener("click", () => irParaResultados(texto));
    listaSugestoes.appendChild(div);
  });

  // 2. Renderiza Locais do Google Maps e Resultados Orgânicos
  document.getElementById("texto-localizacao").textContent = CONFIG_BUSCA.localizacao;

  const containerMaps = document.getElementById("lista-locais-maps");
  containerMaps.innerHTML = "";
  CONFIG_BUSCA.locaisMaps.forEach(local => {
    const card = document.createElement("div");
    card.className = "card-local";
    card.innerHTML = `
      <a href="${CONFIG_BUSCA.urlDestino}" class="card-local-info" style="text-decoration:none; flex:1;">
        <h3><strong>${local.nome}</strong></h3>
        <div class="avaliacao-linha">
          <span>${local.nota}</span>
          <span class="estrelas">★★★★★</span>
          <span>${local.avaliacoes} · ${local.categoria}</span>
        </div>
        <div class="detalhe-local">${local.endereco}</div>
        <div class="detalhe-local"><span class="status-aberto">${local.status}</span></div>
      </a>
      <div class="acoes-local">
        ${local.temSite ? `
          <a href="${CONFIG_BUSCA.urlDestino}" class="btn-acao-maps destaque-site">
            <span class="circulo-icone">🌐</span>
            <span>Site</span>
          </a>
        ` : ""}
        <a href="${CONFIG_BUSCA.urlDestino}" class="btn-acao-maps">
          <span class="circulo-icone">📍</span>
          <span>Rotas</span>
        </a>
      </div>
    `;
    containerMaps.appendChild(card);
  });

  const containerOrganicos = document.getElementById("lista-resultados-organicos");
  containerOrganicos.innerHTML = "";
  CONFIG_BUSCA.resultadosOrganicos.forEach(item => {
    const artigo = document.createElement("article");
    artigo.className = "item-organico";
    artigo.innerHTML = `
      <a href="${CONFIG_BUSCA.urlDestino}" class="topo-site-organico">
        <div class="favicon-circulo">${item.inicial}</div>
        <div class="info-dominio">
          <span class="nome-site-organico">${item.nomeSite}</span>
          <span class="url-site-organico">${item.urlExibida}</span>
        </div>
      </a>
      <a href="${CONFIG_BUSCA.urlDestino}" class="titulo-organico">${item.titulo}</a>
      <p class="descricao-organica">${item.descricao}</p>
    `;
    containerOrganicos.appendChild(artigo);
  });

  // 3. Efeito de digitação automática na barra inicial
  function iniciarDigitacaoAutomatica() {
    clearInterval(timerDigitacao);
    inputInicial.value = "";
    const textoAlvo = CONFIG_BUSCA.termoPadrao;
    let indiceLetra = 0;

    setTimeout(() => {
      inputInicial.focus();

      timerDigitacao = setInterval(() => {
        if (indiceLetra < textoAlvo.length) {
          inputInicial.value += textoAlvo.charAt(indiceLetra);
          indiceLetra++;
        } else {
          clearInterval(timerDigitacao);
          if (CONFIG_BUSCA.irSozinhoParaPagina2) {
            setTimeout(() => {
              irParaResultados(textoAlvo);
            }, 450);
          }
        }
      }, CONFIG_BUSCA.velocidadeLetraMs);
    }, CONFIG_BUSCA.atrasoAntesDeDigitarMs);
  }

  // 4. Transição para a 2ª página
  function irParaResultados(termoDigitado) {
    clearInterval(timerDigitacao);
    const termoFinal = (termoDigitado && termoDigitado.trim() !== "")
      ? termoDigitado
      : CONFIG_BUSCA.termoPadrao;

    barraProgresso.style.width = "85%";

    setTimeout(() => {
      barraProgresso.style.width = "100%";
      inputSerp.value = termoFinal;
      telaInicial.classList.add("oculto");
      telaResultados.classList.remove("oculto");
      window.scrollTo(0, 0);

      setTimeout(() => {
        barraProgresso.style.width = "0%";
      }, 200);
    }, 320);
  }

  formInicial.addEventListener("submit", (e) => {
    e.preventDefault();
    irParaResultados(inputInicial.value);
  });

  btnPesquisar.addEventListener("click", () => irParaResultados(inputInicial.value));
  btnSorte.addEventListener("click", () => window.location.href = CONFIG_BUSCA.urlDestino);

  formSerp.addEventListener("submit", (e) => {
    e.preventDefault();
    irParaResultados(inputSerp.value);
  });

  btnVoltar.addEventListener("click", () => {
    telaResultados.classList.add("oculto");
    telaInicial.classList.remove("oculto");
    if (CONFIG_BUSCA.digitarSozinho) {
      iniciarDigitacaoAutomatica();
    }
  });

  if (CONFIG_BUSCA.digitarSozinho) {
    iniciarDigitacaoAutomatica();
  }
});