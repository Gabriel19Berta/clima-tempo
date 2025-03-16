document.getElementById('pesquisa').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nomeCidade = document.getElementById('pesquisar_cidade').value;

    if (!nomeCidade) {
        alert('Cidade não informada. Por favor, informe o nome da cidade');
    } else {
        try {
            const apiKey = '7957643eb0b75030517805909b811517'
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apiKey}&units=metric&lang=pt_br`;
        
            const resultados = await fetch(apiUrl);
            const json = await resultados.json();
        
            if (json.cod == 200) {
                mostrarInfo({
                    cidade: json.name,
                    estado: json.sys.country,
                    temp: json.main.temp,
                    descricao: json.weather[0].description,
                    tempIcon: json.weather[0].icon,
                    tempMax: json.main.temp_max,
                    tempMin: json.main.temp_min
                })
            } else {
                alert('Não foi possível localizar')
            }
        } catch {
            alert('Erro de conexão. Tente novamente mais tarde.');
        }
    }
})

function mostrarInfo(json) {
    const classe = document.querySelector('.clima');
    if (classe && classe.classList.contains('clima')) {
        classe.classList.remove('clima');
    }
    
    document.getElementById('nome_cidade').innerHTML = `${json.cidade}, ${json.estado}`;
    document.getElementById('valor_graus').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.getElementById('descricao_temp').innerHTML = `${json.descricao}`;
    document.getElementById('img-temp').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.getElementById('temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.getElementById('temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
}