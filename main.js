// Função para preencher os selects de hora e minuto
function preencherSelects() {
    const selectHora = document.getElementById('hora');
    const selectMinuto = document.getElementById('Minutes');
  
    // Preenche as opções de hora (0-23)
    selectHora.innerHTML = [...Array(24).keys()]
      .map(i => `<option value="${i}">${i.toString().padStart(2, '0')}</option>`)
      .join('');
  
    // Preenche as opções de minuto (0-59)
    selectMinuto.innerHTML = [...Array(60).keys()]
      .map(i => `<option value="${i}">${i.toString().padStart(2, '0')}</option>`)
      .join('');
  }
  
  let alarme;
  let relogio;
  let alarmeLigado = false;
  let alarmeTocando = 0; // Contador de vezes que o alarme tocou
  const audio = document.getElementById('alarmeAudio');
  
  // Função para atualizar a hora atual
  function horaAtual() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const horaCompleta = `${hours}:${minutes}:${seconds}`;
  
    relogio = document.querySelector('.relogio');
    relogio.textContent = horaCompleta;
  
    if (alarmeLigado && horaCompleta === alarme) {
      despertar();
    }
  }
  
  // Função para mostrar mensagem temporária
  function mostrarMensagem(mensagem) {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.classList.add('mensagem');
    mensagemDiv.textContent = mensagem;
  
    // Adiciona a mensagem ao body ou a um contêiner específico
    document.body.appendChild(mensagemDiv);
  
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
      mensagemDiv.remove();
    }, 3000);
  }
  
  // Função chamada quando o alarme deve tocar
  function despertar() {
    if (alarmeTocando < 3) {
      audio.play(); // Toca o som
      alarmeTocando++; // Incrementa o contador
    } else {
      alarmeLigado = false; // Desliga o alarme após 3 toques
      document.getElementById('bSet').innerHTML = 'Ligar alarme';
      mostrarMensagem('⏰ Alarme tocado 3 vezes! O alarme foi desligado.');
    }
  }
  
  // Função chamada ao clicar no botão para ligar/desligar o alarme
  function alarmeClick() {
    const alarmeHoras = document.getElementById('hora');
    const alarmeMinutos = document.getElementById('Minutes');
    const bSet = document.getElementById('bSet');
  
    if (bSet.innerHTML === 'Desligar alarme') {
      bSet.innerHTML = 'Ligar alarme';
      audio.pause();
      alarmeLigado = false;
      alarmeTocando = 0; // Reseta o contador quando desligar o alarme
      mostrarMensagem('🔕 Alarme desligado');
    } else {
      if (alarmeHoras.value === '' || alarmeMinutos.value === '') {
        mostrarMensagem('⛔ Selecione hora e minutos para ativar o alarme!');
        return;
      }
      alarme = `${alarmeHoras.value.toString().padStart(2, '0')}:${alarmeMinutos.value.toString().padStart(2, '0')}:00`;
      alarmeLigado = true;
      alarmeTocando = 0; // Reseta o contador ao configurar um novo alarme
      bSet.innerHTML = 'Desligar alarme';
      mostrarMensagem(`✅ Alarme programado para ${alarme}`);
    }
  }
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    preencherSelects(); // Preenche as opções de hora e minuto
    horaAtual(); // Exibe a hora atual
    setInterval(horaAtual, 1000); // Atualiza a hora a cada segundo
    document.getElementById('bSet').addEventListener('click', alarmeClick); // Configura o botão de alarme
  });
  