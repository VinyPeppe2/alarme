// clock.js
export function atualizarRelogio(callback) {
    function mostrarHora() {
      const agora = new Date();
      const horas = agora.getHours().toString().padStart(2, '0');
      const minutos = agora.getMinutes().toString().padStart(2, '0');
      const segundos = agora.getSeconds().toString().padStart(2, '0');
  
      const horaFormatada = `${horas}:${minutos}:${segundos}`;
      const elementoRelogio = document.querySelector('.relogio');
      if (elementoRelogio) {
        elementoRelogio.textContent = horaFormatada;
      }
  
      if (callback) callback(horaFormatada);
    }
  
    mostrarHora(); // Mostra imediatamente
    setInterval(mostrarHora, 1000); // Atualiza a cada segundo
  }
  