// === CONFIGURAÇÃO RÁPIDA (MUDE APENAS AQUI PARA CADA GRAVAÇÃO) ===
const CONFIG_BUSCA = {
  // Link do seu site para onde o clique vai redirecionar
  urlDestino: "https://estetica-automotiva.conectaweb.workers.dev/",

  // Frase que será digitada sozinha na barra inicial
  termoPadrao: "estética automotiva perto de mim",

  // Configurações da digitação automática para sua gravação
  digitarSozinho: true,
  atrasoAntesDeDigitarMs: 1200, // Espera 1.2s após abrir a página (tempo de ligar o gravador)
  velocidadeLetraMs: 65,        // Velocidade de cada letra (65ms parece digitação real no celular)
  irSozinhoParaPagina2: true,   // Se true, abre a 2ª página sozinho assim que termina de digitar

  localizacao: "Jardim Anália Franco, São Paulo - SP • Com base no seu local",

  // Sugestões que aparecem embaixo da barra na 1ª tela
  sugestoes: [
    "estética automotiva perto de mim",
    "polimento e vitrificação jardim anália franco",
    "higienização automotiva são paulo"
  ],

  // 3 Empresas que aparecem no bloco do Google Maps (Locais)
  locaisMaps: [
    {
      nome: "Prime Detail • Estética Automotiva",
      nota: "5,0",
      avaliacoes: "(142)",
      categoria: "Serviço de polimento automotivo",
      endereco: "Jardim Anália Franco • Atendimento rápido no WhatsApp",
      status: "Aberto ⋅ Fecha às 19:00",
      temSite: true // Mostra o botão "Site" destacado
    },
    {
      nome: "Auto Brilho Lava Rápido",
      nota: "4,1",
      avaliacoes: "(19)",
      categoria: "Lava-rápido",
      endereco: "A 1,8 km de distância",
      status: "Aberto ⋅ Fecha às 18:00",
      temSite: false
    },
    {
      nome: "Garagem Detail Studio",
      nota: "4,6",
      avaliacoes: "(34)",
      categoria: "Estética automotiva",
      endereco: "A 2,4 km de distância",
      status: "Aberto ⋅ Fecha às 18:30",
      temSite: false
    }
  ],

  // Resultados orgânicos que aparecem logo abaixo do Mapa
  resultadosOrganicos: [
    {
      inicial: "P",
      nomeSite: "Prime Detail Estética Automotiva",
      urlExibida: "https://estetica-automotiva.conectaweb.workers.dev",
      titulo: "Prime Detail | Polimento Técnico, Vitrificação e Higienização em SP",
      descricao: "Seu carro com aparência de novo. Confira o Antes e Depois interativo, tabela de serviços e solicite seu orçamento direto pelo WhatsApp em 1 clique."
    },
    {
      inicial: "G",
      nomeSite: "Guia Automotivo SP",
      urlExibida: "https://guiaautomotivosp.com.br › zona-leste › estetica",
      titulo: "As 10 Melhores Estéticas Automotivas no Jardim Anália Franco",
      descricao: "Compare avaliações, fotos dos serviços de vitrificação cerâmica, higienização interna e polimento técnico perto de você."
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
          // Quando termina de digitar todas as letras, espera 450ms e abre a 2ª página
          if (CONFIG_BUSCA.irSozinhoParaPagina2) {
            setTimeout(() => {
              irParaResultados(textoAlvo);
            }, 450);
          }
        }
      }, CONFIG_BUSCA.velocidadeLetraMs);
    }, CONFIG_BUSCA.atrasoAntesDeDigitarMs);
  }

  // 4. Função que transiciona para a 2ª página
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

  // Eventos manuais (caso queira clicar antes ou repetir a gravação)
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

  // Se clicar na logo pequena do Google na 2ª página, volta para a 1ª e digita tudo de novo!
  btnVoltar.addEventListener("click", () => {
    telaResultados.classList.add("oculto");
    telaInicial.classList.remove("oculto");
    if (CONFIG_BUSCA.digitarSozinho) {
      iniciarDigitacaoAutomatica();
    }
  });

  // Dispara a digitação automática ao abrir a página
  if (CONFIG_BUSCA.digitarSozinho) {
    iniciarDigitacaoAutomatica();
  }
});