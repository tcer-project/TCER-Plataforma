let ordenes = [];

function abrirFormulario(combo) {
  document.getElementById('comboSeleccionado').value = combo;
  document.getElementById('formulario-orden').style.display = 'block';
  document.getElementById('menu-pedidos').style.display = 'none';
}

function enviarOrden(event) {
  event.preventDefault();

  const orden = {
      nombre: event.target.nombre.value,
      direccion: event.target.direccion.value,
      telefono: event.target.telefono.value,
      cantidad: event.target.cantidad.value,
      combo: event.target.combo.value,
      id: generarIDUnico()
  };

  fetch("https://script.google.com/macros/s/AKfycbzWSbnzuT4RWgfCAgHhFZUOFWPwX1WXOVFn23GJ4Q3XNuUmvIbXdc70XS28NI6ycSgI/exec", { 
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(orden)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Orden enviada exitosamente.");
          agregarOrden(orden);
          mostrarOrdenAdmin(orden);
          document.getElementById('formulario-orden').style.display = 'none';
          document.getElementById('menu-pedidos').style.display = 'block';
      } else {
          alert("Hubo un error al enviar la orden.");
      }
  })
  .catch((error) => {
      console.error("Error al enviar la orden:", error);
      alert("Hubo un error al enviar la orden.");
  });
}

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

if (window.location.pathname.includes('admin.html')) {
  cargarOrdenesAdmin();
}

function cargarOrdenesAdmin() {
  const listaOrdenes = document.getElementById('lista-ordenes');
  listaOrdenes.innerHTML = '';  // Limpiar lista
  ordenes.forEach((orden) => {
    mostrarOrdenAdmin(orden);  // Mostrar todas las órdenes en el panel de administración
  });
}
