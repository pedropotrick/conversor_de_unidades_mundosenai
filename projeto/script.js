function converterComprimento() {
  const fatoresComprimento = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
  };

  const origem = document.getElementById("comprimento-origem").value;
  const destino = document.getElementById("comprimento-destino").value;

  const valor = lerNumero(document.getElementById("comprimentoBase"));
  if (!Number.isFinite(valor)) {
    document.getElementById("comprimentoConvertido").value = "";
    modalErro.showModal();
    return;
  }

  const resultado =
    (valor * fatoresComprimento[origem]) / fatoresComprimento[destino];

  document.getElementById("comprimentoConvertido").value = formatarNumero(resultado);




}

function converterMassa() {
  const fatoresMassa = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    t: 1000000,
    lb: 453.59237,
    oz: 28.349523125,
  };

  const origem = document.getElementById("massa-origem").value;
  const destino = document.getElementById("massa-destino").value;

  const valor = lerNumero(document.getElementById("massaBase"));
  if (!Number.isFinite(valor)) {
    document.getElementById("massaConvertido").value = "";
    modalErro.showModal();
    return;
  }

  const resultado = (valor * fatoresMassa[origem]) / fatoresMassa[destino];

  document.getElementById("massaConvertido").value = formatarNumero(resultado);

 


}


function converterVelocidade() {
  const fatoresVelocidade = {
    m_s: 1,
    km_h: 1 / 3.6,
    mph: 0.44704,
    kn: 1852 / 3600,
  };

  const origem = document.getElementById("velocidade-origem").value;
  const destino = document.getElementById("velocidade-destino").value;

  const valor = lerNumero(document.getElementById("velocidadeBase"));
  if (!Number.isFinite(valor)) {
    document.getElementById("velocidadeConvertido").value = "";
    modalErro.showModal();
    return;
  }

  const resultado =
    (valor * fatoresVelocidade[origem]) / fatoresVelocidade[destino];

  document.getElementById("velocidadeConvertido").value = formatarNumero(resultado);





}

function converterVolume() {
  const fatoresVolume = {
    ml: 0.001,
    l: 1,
    cm3: 0.001,
    m3: 1000,
  };

  const origem = document.getElementById("volume-origem").value;
  const destino = document.getElementById("volume-destino").value;

  const valor = lerNumero(document.getElementById("volumeBase"));
  if (!Number.isFinite(valor)) {
    document.getElementById("volumeConvertido").value = "";
    modalErro.showModal();
    return;
  }

  const resultado = (valor * fatoresVolume[origem]) / fatoresVolume[destino];

  document.getElementById("volumeConvertido").value = formatarNumero(resultado);





}

function converterArea() {
  const fatoresArea = {
    mm2: 0.000001,
    cm2: 0.0001,
    m2: 1,
    km2: 1000000,
    ha: 10000,
    acre: 4046.8564224,
  };

  const origem = document.getElementById("area-origem").value;
  const destino = document.getElementById("area-destino").value;

  const valor = lerNumero(document.getElementById("baseArea"));
  if (!Number.isFinite(valor)) {
    document.getElementById("areaConvertido").value = "";
    modalErro.showModal();
    return;
  }

  const resultado = (valor * fatoresArea[origem]) / fatoresArea[destino];

  document.getElementById("areaConvertido").value = formatarNumero(resultado);





}

const modalErro = document.getElementById("modal-erro");


// Busca apenas as moedas necessárias, usando o real como unidade base.
async function converterMoeda() {
  const entrada = document.getElementById("moedaBase").value.trim();
  const campoResultado = document.getElementById("moedaConvertido");
  const aviso = document.getElementById("moeda-status");
  const botao = document.getElementById("converter-moeda");
  campoResultado.value = "";
  aviso.textContent = "";

  if (entrada === "") {
    modalErro.showModal();
    return;
  }

  const valor = lerNumero(document.getElementById("moedaBase"));
  if (!Number.isFinite(valor) || valor < 0) {
    aviso.textContent = "Insira um número válido, maior ou igual a zero.";
    return;
  }

  const origem = document.getElementById("moeda-origem").value;
  const destino = document.getElementById("moeda-destino").value;
  if (origem === destino) {
    campoResultado.value = formatarNumero(valor, true);
    return;
  }

  botao.disabled = true;
  botao.textContent = "Consultando...";
  aviso.textContent = "Buscando cotações...";

  try {
    const moedas = [...new Set([origem, destino])].filter(moeda => moeda !== "BRL");
    const pares = moedas.map(moeda => moeda + "-BRL").join(",");
    const resposta = await fetch(
      "https://economia.awesomeapi.com.br/json/last/" + pares,
      { signal: AbortSignal.timeout(15000) }
    );
    if (!resposta.ok) throw new Error("Falha ao consultar cotações");
    const dados = await resposta.json();
    const fatores = { BRL: 1 };
    const datas = [];

    for (const moeda of moedas) {
      const cotacao = dados[moeda + "BRL"];
      const taxa = Number(cotacao?.bid);
      if (!Number.isFinite(taxa) || taxa <= 0) {
        throw new Error("Cotação indisponível");
      }
      fatores[moeda] = taxa;
      const data = Number(cotacao.timestamp);
      if (Number.isFinite(data) && data > 0) datas.push(data);
    }

    // Converte primeiro para reais e depois para a moeda de destino.
    const resultado = valor * fatores[origem] / fatores[destino];
    if (!Number.isFinite(resultado)) throw new Error("Resultado inválido");
    campoResultado.value = formatarNumero(resultado, true);
    aviso.textContent = "Referência: cotação de compra (bid), via BRL. Sem taxas ou impostos.";
    if (datas.length) {
      aviso.textContent += " Cotação mais antiga utilizada: " +
        new Date(Math.min(...datas) * 1000).toLocaleString("pt-BR") + ".";
    }
  } catch (erro) {
    campoResultado.value = "";
    aviso.textContent = "Não foi possível consultar a cotação. Confira sua conexão e tente novamente.";
  } finally {
    botao.disabled = false;
    botao.textContent = "Converter";
  }
}

// O número fica no input; a sigla fica ao lado, sem entrar na conta.
function lerNumero(campo) {
  if (campo.dataset.numero !== undefined) return Number(campo.dataset.numero);
  const texto = campo.value.trim();
  if (texto === "") return NaN;
  const normalizado = texto.includes(",")
    ? texto.replace(/\./g, "").replace(",", ".") : texto;
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalizado)) return NaN;
  return Number(normalizado);
}

function formatarNumero(valor, moeda = false) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: moeda ? 2 : 0,
    maximumFractionDigits: moeda ? 2 : 12
  });
}

const siglas = {
  mm2: "mm²", cm2: "cm²", m2: "m²", km2: "km²",
  cm3: "cm³", m3: "m³", ml: "mL", l: "L",
  m_s: "m/s", km_h: "km/h"
};

for (const [categoria, entradaId, resultadoId] of [
  ["comprimento", "comprimentoBase", "comprimentoConvertido"],
  ["massa", "massaBase", "massaConvertido"],
  ["volume", "volumeBase", "volumeConvertido"],
  ["area", "baseArea", "areaConvertido"],
  ["velocidade", "velocidadeBase", "velocidadeConvertido"],
  ["moeda", "moedaBase", "moedaConvertido"]
]) {
  for (const [id, lado] of [[entradaId, "origem"], [resultadoId, "destino"]]) {
    const campo = document.getElementById(id);
    const seletor = document.getElementById(categoria + "-" + lado);
    const grupo = document.createElement("div");
    grupo.className = "campo-com-unidade";
    campo.before(grupo);
    grupo.append(campo);
    const unidade = document.createElement("span");
    unidade.className = "sigla-unidade";
    unidade.setAttribute("aria-hidden", "true");
    grupo.append(unidade);
    const atualizarSigla = () => {
      unidade.textContent = siglas[seletor.value] || seletor.value;
    };
    atualizarSigla();
    seletor.addEventListener("change", () => {
      atualizarSigla();
      // Apaga o resultado anterior para não atribuir a ele uma unidade diferente.
      document.getElementById(resultadoId).value = "";
    });
    if (!campo.readOnly) {
      campo.inputMode = "decimal";
      campo.addEventListener("input", () => {
        delete campo.dataset.numero;
        document.getElementById(resultadoId).value = "";
      });
      campo.addEventListener("focus", () => {
        if (campo.dataset.numero !== undefined) {
          campo.value = campo.dataset.numero.replace(".", ",");
        }
      });
      campo.addEventListener("blur", () => {
        const valor = lerNumero(campo);
        if (Number.isFinite(valor)) {
          campo.dataset.numero = String(valor);
          campo.value = formatarNumero(valor, categoria === "moeda");
        }
      });
    }
  }
}
