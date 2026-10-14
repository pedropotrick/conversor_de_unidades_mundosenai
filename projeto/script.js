function converterComprimento(){
    const fatoresComprimento = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000
    };

    const origem = document.getElementById("comprimento-origem").value;
    const destino = document.getElementById("comprimento-destino").value;

    const valor = Number(document.getElementById("comprimentoBase").value);

    const resultado = valor * fatoresComprimento[origem] / fatoresComprimento[destino];

    document.getElementById("comprimentoConvertido").value = resultado.toFixed(3);
}

function converterMassa(){
    const fatoresMassa = {
       mg: 0.001,
       g: 1,
       kg: 1000,
       t: 1000000,
       lb: 453.59237,
       oz: 28.349523125
    };

    const origem = document.getElementById("massa-origem").value;
    const destino = document.getElementById("massa-destino").value;

    const valor = Number(document.getElementById("massaBase").value);

    const resultado = valor * fatoresMassa[origem] / fatoresMassa[destino];

    document.getElementById("massaConvertido").value = resultado.toFixed(3);

}

function converterVelocidade(){
    const fatoresVelocidade = {
       m_s: 1,
       km_h: 1/3.6,
       mph: 0.44704,
       kn: 1852/3600
    };

    const origem = document.getElementById("velocidade-origem").value;
    const destino = document.getElementById("velocidade-destino").value;

    const valor = Number(document.getElementById("velocidadeBase").value);

    const resultado = valor * fatoresVelocidade[origem] / fatoresVelocidade[destino];

    document.getElementById("velocidadeConvertido").value = resultado.toFixed(3);
}

function converterVolume(){
    const fatoresVolume = {
       ml: 0.001,
       l: 1,
       cm3: 0.001,
       m3: 1000
    };

    const origem = document.getElementById("volume-origem").value;
    const destino = document.getElementById("volume-destino").value;

    const valor = Number(document.getElementById("volumeBase").value);

    const resultado = valor * fatoresVolume[origem] / fatoresVolume[destino];

    document.getElementById("volumeConvertido").value = resultado.toFixed(3);
}

function converterArea(){
    const fatoresArea = {
       mm2: 0.000001,
       cm2: 0.0001,
       m2: 1,
       km2: 1000000,
       ha: 10000,
       acre: 4046.8564224
    };

    const origem = document.getElementById("area-origem").value;
    const destino = document.getElementById("area-destino").value;

    const valor = Number(document.getElementById("baseArea").value);

    const resultado = valor * fatoresArea[origem] / fatoresArea[destino];

    document.getElementById("areaConvertido").value = resultado.toFixed(3);

}
