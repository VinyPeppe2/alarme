// alarm.js
let alarmeHora = null;
let alarmeLigado = false;
let contadorToques = 0;
let intervaloToque = null;

const audio = document.getElementById('alarmeAudio');
const botao = document.getElementById('bSet');

export function configurarAlarme() {
  const horaSelecionada = document.getElementById('hora').value;
  const minutoSelecionado = document.getElementById('Minutes').value;

  if (!horaSelecionada || !minutoSelecionado) {
    alert('⛔ Selecione hora e minutos para ativar o alarme!');
    return;
  }

  alarmeHora = `${horaSelecionada.padStart(2, '0')}:${minutoSelecionado.padStart(2, '0')}:00`;
  alarmeLigado = true;
  contadorToques = 0;
  botao.textContent = 'Desligar alarme';
  alert(`✅ Alarme programado para ${alarmeHora}`);
}

export function alternarAlarme() {
  if (alarmeLigado) {
    pararAlarme();
  } else {
    configurarAlarme();
  }
}

function tocarAlarme() {
  if (contadorToques < 3) {
    audio.play();
    contadorToques++;
  } else {
    pararAlarme();
    alert('⏰ Alarme tocou 3 vezes e foi desligado.');
  }
}

export function verificarAlarme(horaAtual) {
  if (alarmeLigado && horaAtual === alarmeHora && contadorToques === 0) {
    intervaloToque = setInterval(tocarAlarme, 1500); // toca 3x com intervalo
  }
}

function pararAlarme() {
  alarmeLigado = false;
  contadorToques = 0;
  clearInterval(intervaloToque);
  audio.pause();
  audio.currentTime = 0;
  botao.textContent = 'Ligar alarme';
  alert('🔕 Alarme desligado');
}
