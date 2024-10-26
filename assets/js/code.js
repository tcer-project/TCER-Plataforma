let ordenes = [];

function abrirFormulario(combo) {
  document.getElementById('comboSeleccionado').value = combo;
  document.getElementById('formulario-orden').style.display = 'block';
  document.getElementById('menu-pedidos').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tuFormularioId');
  if (form) {
      form.onsubmit = enviarOrden;
  } else {
      console.error('El formulario no se encontró.');
  }
});


async function enviarOrden(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const orden = {
    id: formData.get('id'),
    nombre: formData.get('nombre'),
    direccion: formData.get('direccion'),
    telefono: formData.get('telefono'),
    cantidad: formData.get('cantidad'),
    combo: formData.get('combo')
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzQuSa7isR9RBh8hSkJCglioxtkO1DIRe6-A5md7dV91QmcnLUDCFg3QAMwqGFV7NMa/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orden)
    });

    const data = await response.json();
    if (data.success) {
      console.log('Orden enviada exitosamente:', data.message);
      alert('Orden enviada exitosamente');
    } else {
      console.error('Error al enviar la orden:', data.message);
      alert('Error al enviar la orden: ' + data.message);
    }
  } catch (error) {
    console.error('Error al enviar la orden:', error);
    alert('Error al enviar la orden. Intenta nuevamente.');
  }
}

document.getElementById('tuFormularioId').onsubmit = enviarOrden; 

function generarIDUnico() {
  return 'orden-' + Math.random().toString(36).substr(2, 9);
}

function agregarOrden(orden) {
  ordenes.push(orden);
  mostrarOrdenAdmin(orden);
}

function mostrarOrdenAdmin(orden) {
  const listaOrdenes = document.getElementById('lista-ordenes');
  const li = document.createElement('li');
  li.textContent = `ID: ${orden.id}, Combo: ${orden.combo}, Cliente: ${orden.nombre}, Cantidad: ${orden.cantidad}`;
  listaOrdenes.appendChild(li);
}
